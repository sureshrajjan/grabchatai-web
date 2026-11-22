import { NextResponse, type NextRequest } from "next/server";
import { getDodoClient, getProductId, isPaidPlan } from "@/lib/dodo";
import { currentUser } from "@clerk/nextjs/server";
import { site } from "@/lib/site";

/**
 * Creates a Dodo Payments subscription checkout session for the selected plan
 * and returns the hosted checkout URL. Requires a signed-in Clerk user, whose
 * email and name are attached as the Dodo customer.
 */
export async function POST(request: NextRequest) {
  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  if (!clerkUser || !email) {
    return NextResponse.json({ error: "Please sign in to upgrade.", code: "unauthenticated" }, { status: 401 });
  }

  let body: { plan?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isPaidPlan(body.plan)) {
    return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
  }

  const productId = getProductId(body.plan);
  if (!productId || !process.env.DODO_PAYMENTS_API_KEY) {
    console.error(`[checkout] Missing Dodo configuration for plan "${body.plan}"`);
    return NextResponse.json(
      { error: "Checkout is not available yet. Please try again later." },
      { status: 503 },
    );
  }

  const name = clerkUser.fullName || clerkUser.firstName || email.split("@")[0];
  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL ?? `${site.url}/checkout/success`;

  try {
    const session = await getDodoClient().checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      customer: { email, name },
      return_url: returnUrl,
      metadata: { plan: body.plan, clerk_user_id: clerkUser.id, email },
    });

    if (!session.checkout_url) throw new Error("No checkout_url returned");
    return NextResponse.json({ checkoutUrl: session.checkout_url });
  } catch (err) {
    console.error("[checkout] Failed to create Dodo checkout session", err);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again or contact support." },
      { status: 502 },
    );
  }
}
