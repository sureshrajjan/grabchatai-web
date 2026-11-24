import { Webhook } from "standardwebhooks";
import { getProductId } from "@/lib/dodo";
import { emails, isEmailConfigured, sendEmail, type Email } from "@/lib/email";
import { resolveClerkUserId, revokeForPayment, syncSubscription } from "@/lib/entitlement";
import { plans } from "@/lib/site";

/**
 * Dodo Payments webhook endpoint.
 * Configure in Dodo dashboard → Developer → Webhooks:
 *   https://grabchatai.com/api/webhooks/dodo
 * and copy the signing secret into DODO_PAYMENTS_WEBHOOK_KEY.
 *
 * Grants/removes Pro and sends customer emails here (never on the success-page redirect).
 */

type DodoEvent = {
  type: string;
  data: {
    customer?: { email?: string; name?: string | null; customer_id?: string };
    subscription_id?: string;
    payment_id?: string;
    is_partial?: boolean;
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

  // Update the user's Pro entitlement (stored on their Clerk account).
  try {
    if (event.type.startsWith("subscription.") && event.data.subscription_id) {
      const userId = await resolveClerkUserId(event.data.metadata, email);
      if (userId && (await syncSubscription(userId, event.data.subscription_id))) {
        console.info("[dodo-webhook] entitlement updated", { type: event.type, userId, subscription: event.data.subscription_id });
      } else {
        // Nothing to retry: no matching account. getEntitlement() picks it up by email after sign-up.
        console.warn("[dodo-webhook] no Clerk user for subscription", { type: event.type, userId, email });
      }
    } else if (event.type === "refund.succeeded" && event.data.payment_id && !event.data.is_partial) {
      const userId = await revokeForPayment(event.data.payment_id);
      console.info("[dodo-webhook] refund — Pro revoked", { payment: event.data.payment_id, userId });
    }
  } catch (err) {
    console.error("[dodo-webhook] entitlement update failed", { type: event.type, err });
    // Non-2xx makes Dodo retry this event later.
    return new Response("Entitlement update failed", { status: 500 });
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
