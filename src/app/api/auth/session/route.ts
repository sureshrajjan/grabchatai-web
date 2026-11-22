import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, readSessionToken } from "@/lib/auth";

/** GET /api/auth/session — the signed-in user, or { user: null }. */
export async function GET(request: NextRequest) {
  const user = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  return NextResponse.json({ user }, { headers: { "Cache-Control": "no-store" } });
}
