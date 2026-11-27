import { auth } from "@clerk/nextjs/server";
import { getEntitlement, setRenewal } from "@/lib/entitlement";

/**
 * POST /api/subscription — cancel or resume the signed-in user's Pro subscription.
 *
 * Body: { "action": "cancel" | "resume" }
 *   cancel → stops renewal; Pro stays on until the end of the paid period.
 *   resume → undoes a cancel that hasn't taken effect yet.
 *
 * 200 → the updated entitlement { pro, plan, until, cancelled, checkedAt }
 * 401 → not signed in · 404 → nothing to cancel/resume
 */
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Please sign in.", code: "unauthenticated" }, { status: 401, headers: noStore });
  }

  // JSON-only, so a plain cross-site form post can't trigger it.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Expected JSON." }, { status: 415, headers: noStore });
  }
  let action: unknown;
  try {
    ({ action } = (await request.json()) as { action?: unknown });
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400, headers: noStore });
  }
  if (action !== "cancel" && action !== "resume") {
    return Response.json({ error: "Unknown action." }, { status: 400, headers: noStore });
  }

  try {
    const changed = await setRenewal(userId, action === "resume");
    const entitlement = await getEntitlement(userId);
    if (changed === 0) {
      const error =
        action === "cancel" ? "There's no active subscription to cancel." : "There's no cancelled subscription to resume.";
      return Response.json({ error, code: "nothing_to_change", entitlement }, { status: 404, headers: noStore });
    }
    console.info("[subscription] renewal changed", { userId, action, changed });
    return Response.json(entitlement, { headers: noStore });
  } catch (err) {
    console.error("[subscription] update failed", { userId, action, err });
    return Response.json(
      { error: "We couldn't update your subscription. Please try again or contact support." },
      { status: 502, headers: noStore },
    );
  }
}

const noStore = { "Cache-Control": "private, no-store" };
