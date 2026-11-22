import { Webhook } from "standardwebhooks";

/**
 * Dodo Payments webhook endpoint.
 * Configure in Dodo dashboard → Developer → Webhooks:
 *   https://grabchatai.com/api/webhooks/dodo
 * and copy the signing secret into DODO_PAYMENTS_WEBHOOK_KEY.
 *
 * Fulfil orders here (not on the success-page redirect).
 */
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

  const event = JSON.parse(rawBody) as {
    type: string;
    data: {
      customer?: { email?: string; customer_id?: string };
      subscription_id?: string;
      payment_id?: string;
      product_id?: string;
      metadata?: Record<string, string>;
    };
  };

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

  // Respond quickly with 2xx so Dodo doesn't retry.
  return Response.json({ received: true });
}
