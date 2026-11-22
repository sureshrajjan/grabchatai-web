import { NextResponse, type NextRequest } from "next/server";
import { OAUTH_COOKIE, googleAuthUrl, isGoogleConfigured, newOAuthState, safeNext, sessionCookieOptions } from "@/lib/auth";

/** GET /api/auth/google?next=/pricing — starts Google sign-in / sign-up. */
export async function GET(request: NextRequest) {
  const next = safeNext(request.nextUrl.searchParams.get("next"));

  if (!isGoogleConfigured()) {
    console.error("[auth] GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / AUTH_SECRET are not set");
    return NextResponse.redirect(new URL(`/signin?error=config&next=${encodeURIComponent(next)}`, request.url));
  }

  const { state, verifier, challenge } = newOAuthState();
  const redirectUri = new URL("/api/auth/google/callback", request.nextUrl.origin).toString();

  const res = NextResponse.redirect(googleAuthUrl({ redirectUri, state, challenge }));
  res.cookies.set(OAUTH_COOKIE, JSON.stringify({ state, verifier, next }), {
    ...sessionCookieOptions,
    maxAge: 60 * 10,
  });
  return res;
}
