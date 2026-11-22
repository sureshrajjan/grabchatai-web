import { NextResponse, type NextRequest } from "next/server";
import {
  OAUTH_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  exchangeGoogleCode,
  safeNext,
  sessionCookieOptions,
} from "@/lib/auth";

/** GET /api/auth/google/callback — Google redirects here; we create the session and go to `next` (default /pricing). */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const fail = (reason: string) => {
    const res = NextResponse.redirect(new URL(`/signin?error=${reason}`, request.url));
    res.cookies.delete(OAUTH_COOKIE);
    return res;
  };

  let saved: { state?: string; verifier?: string; next?: string } = {};
  try {
    saved = JSON.parse(request.cookies.get(OAUTH_COOKIE)?.value ?? "{}");
  } catch {}

  if (params.get("error")) return fail("cancelled");
  const code = params.get("code");
  if (!code || !saved.state || !saved.verifier || params.get("state") !== saved.state) return fail("state");

  try {
    const user = await exchangeGoogleCode({
      code,
      verifier: saved.verifier,
      redirectUri: new URL("/api/auth/google/callback", request.nextUrl.origin).toString(),
    });

    const res = NextResponse.redirect(new URL(safeNext(saved.next), request.url));
    res.cookies.delete(OAUTH_COOKIE);
    res.cookies.set(SESSION_COOKIE, createSessionToken(user), { ...sessionCookieOptions, maxAge: SESSION_MAX_AGE });
    return res;
  } catch (err) {
    console.error("[auth] Google sign-in failed", err);
    return fail("google");
  }
}
