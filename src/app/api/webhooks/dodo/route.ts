import { Webhook } from "standardwebhooks";
import { getProductId } from "@/lib/dodo";
import { emails, isEmailConfigured, sendEmail, type Email } from "@/lib/email";
import { plans } from "@/lib/site";

/**
 * Dodo Payments webhook endpoint.
 * Configure in Dodo dashboard → Developer → Webhooks:
 *   https://grabchatai.com/api/webhooks/dodo
 * and copy the signing secret into DODO_PAYMENTS_WEBHOOK_KEY.
 *
 * Fulfil orders and send customer emails here (not on the success-page redirect).
 */

type DodoEvent = {
  type: string;
  data: {
    customer?: { email?: string; name?: string | null; customer_id?: string };
    subscription_id?: string;
    payment_id?: string;
    product_id?: string;
    next_billing_date?: string | null;
    metadata?: Record<string, string>;
  };
};

function planName(productId: string | undefined) {
  if (productId && productId === getProductId("pro_yearly")) return plans.pro_yearly.name;
  if (productId && productId === getProductId("pro_monthly")) return plans.pro_monthly.name;
  return "Pro";
}

/** The customer email to send for this event, if any. Dodo already sends payment receipts. */
function emailFor(event: DodoEvent): Email | null {
  const { customer } = event.data;
  if (!customer?.email) return null;
  const c = { email: customer.email, name: customer.name };

  switch (event.type) {
    case "subscription.active":
      return emails.proWelcome(c, planName(event.data.product_id), event.data.next_billing_date);
    case "subscription.cancelled":
      return emails.proCancelled(c);
    case "subscription.on_hold":
    case "subscription.failed":
      return emails.paymentProblem(c);
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!secret) {
    console.error("[dodo-webhook] DODO_PAYMENTS_WEBHOOK_KEY is not set");
    return new Response("Webhook not configured", { status: 500 });
  }

  // Verify against the raw body — never re-serialized JSON.
  const rawBody = await request.text();
  const headers = {
    "webhook-id": request.headers.get("webhook-id") ?? "",
    "webhook-signature": request.headers.get("webhook-signature") ?? "",
    "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
  };

  try {
    await new Webhook(secret).verify(rawBody, headers);
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(rawBody) as DodoEvent;
  const email = event.data.customer?.email;

  // TODO: connect these to your license store (database / KV) so the
  // extension can check whether a user has Pro.
  switch (event.type) {
    case "payment.succeeded":
      // First subscription payment and every successful charge.
      console.info("[dodo-webhook] payment succeeded", { email, payment: event.data.payment_id });
      break;
    case "subscription.active":
    case "subscription.renewed":
      console.info("[dodo-webhook] grant/extend Pro", { email, subscription: event.data.subscription_id });
      break;
    case "subscription.cancelled":
    case "subscription.expired":
    case "subscription.failed":
    case "subscription.on_hold":
      console.info("[dodo-webhook] revoke Pro at period end", { email, type: event.type });
      break;
    case "refund.succeeded":
      console.info("[dodo-webhook] refund — revoke Pro", { email, payment: event.data.payment_id });
      break;
    default:
      break;
  }

  const message = emailFor(event);
  if (message) {
    if (!isEmailConfigured()) {
      console.warn("[dodo-webhook] RESEND_API_KEY / EMAIL_FROM not set — skipping email", { type: event.type });
    } else {
      try {
        // webhook-id is stable across Dodo's retries, so Resend sends at most one email per event.
        const id = await sendEmail(message, `dodo-${headers["webhook-id"]}`);
        console.info("[dodo-webhook] email sent", { type: event.type, resendId: id });
      } catch (err) {
        console.error("[dodo-webhook] email failed", { type: event.type, err });
        // Non-2xx makes Dodo retry this event later.
        return new Response("Email delivery failed", { status: 500 });
      }
    }
  }

  // Respond with 2xx so Dodo doesn't retry.
  return Response.json({ received: true });
}
