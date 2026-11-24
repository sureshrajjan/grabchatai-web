import { auth } from "@clerk/nextjs/server";
import { getEntitlement } from "@/lib/entitlement";

/**
 * GET /api/entitlement — does the signed-in user have Pro?
 *
 * Called by the website and by the Chrome extension. The extension sends its
 * Clerk session token as `Authorization: Bearer <token>`; Clerk's middleware
 * (src/proxy.ts) verifies it. `?refresh=1` re-reads Dodo now (e.g. right after
 * checkout); otherwise Dodo is re-read at most once a day.
 *
 * 200 → { pro, plan, until, cancelled, checkedAt }
 * 401 → not signed in
 */
export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Not signed in.", code: "unauthenticated" }, { status: 401, headers: noStore });
  }

  const refresh = new URL(request.url).searchParams.get("refresh") === "1";
  try {
    const entitlement = await getEntitlement(userId, { forceSync: refresh });
    return Response.json(entitlement, { headers: noStore });
  } catch (err) {
    console.error("[entitlement] failed", { userId, err });
    return Response.json({ error: "Couldn't check your plan. Try again shortly." }, { status: 503, headers: noStore });
  }
}

const noStore = { "Cache-Control": "private, no-store" };
