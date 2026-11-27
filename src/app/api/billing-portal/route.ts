import { auth } from "@clerk/nextjs/server";
import { getPortalLink } from "@/lib/entitlement";
import { site } from "@/lib/site";

/**
 * POST /api/billing-portal — a one-time Dodo Payments customer-portal link for the
 * signed-in user (invoices, payment method, billing details).
 *
 * 200 → { url } · 401 → not signed in · 404 → no purchases on this account
 */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Please sign in.", code: "unauthenticated" }, { status: 401, headers: noStore });
  }
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected JSON." }, { status: 415, headers: noStore });
  }

  try {
    const url = await getPortalLink(userId, `${site.url}/account`);
    if (!url) {
      return Response.json(
        { error: "No purchases found on this account.", code: "no_customer" },
        { status: 404, headers: noStore },
      );
    }
    return Response.json({ url }, { headers: noStore });
  } catch (err) {
    console.error("[billing-portal] failed", { userId, err });
    return Response.json(
      { error: "We couldn't open billing right now. Please try again or contact support." },
      { status: 502, headers: noStore },
    );
  }
}

const noStore = { "Cache-Control": "private, no-store" };
