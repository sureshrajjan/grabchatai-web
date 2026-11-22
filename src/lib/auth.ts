import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Minimal Google sign-in (OAuth 2.0 authorization code + PKCE) with a signed,
 * httpOnly session cookie. No database: the cookie carries the Google profile.
 *
 * Env: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET (see .env.example).
 */

export const SESSION_COOKIE = "gca_session";
export const OAUTH_COOKIE = "gca_oauth";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type SessionUser = {
  sub: string; // Google account id
  email: string;
  name: string;
  picture?: string;
};

type SessionPayload = SessionUser & { exp: number };

const b64url = (buf: Buffer | string) => Buffer.from(buf).toString("base64url");

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) throw new Error("AUTH_SECRET must be set (32+ characters)");
  return secret;
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function createSessionToken(user: SessionUser): string {
  const payload: SessionPayload = { ...user, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function readSessionToken(token: string | undefined): SessionUser | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  try {
    const expected = Buffer.from(sign(body));
    const given = Buffer.from(sig);
    if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
    if (!payload.exp || payload.exp < Date.now() / 1000) return null;
    const { sub, email, name, picture } = payload;
    return { sub, email, name, picture };
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** Only allow same-site relative redirects ("/pricing"), never "//evil.com" or absolute URLs. */
export function safeNext(value: string | null | undefined, fallback = "/pricing"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) return fallback;
  return value;
}

export function isGoogleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.AUTH_SECRET);
}

/* ---------- OAuth helpers ---------- */

export function newOAuthState() {
  const state = b64url(randomBytes(24));
  const verifier = b64url(randomBytes(32));
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  return { state, verifier, challenge };
}

export function googleAuthUrl(opts: { redirectUri: string; state: string; challenge: string }) {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: opts.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state: opts.state,
    code_challenge: opts.challenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  }).toString();
  return url.toString();
}

export async function exchangeGoogleCode(opts: { code: string; verifier: string; redirectUri: string }): Promise<SessionUser> {
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: opts.code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: opts.redirectUri,
      grant_type: "authorization_code",
      code_verifier: opts.verifier,
    }),
    cache: "no-store",
  });
  if (!tokenRes.ok) throw new Error(`Token exchange failed (${tokenRes.status})`);
  const { access_token } = (await tokenRes.json()) as { access_token?: string };
  if (!access_token) throw new Error("No access_token from Google");

  const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });
  if (!infoRes.ok) throw new Error(`Userinfo failed (${infoRes.status})`);
  const info = (await infoRes.json()) as {
    sub: string;
    email?: string;
    email_verified?: boolean;
    name?: string;
    given_name?: string;
    picture?: string;
  };
  if (!info.email || !info.email_verified) throw new Error("Google account email is not verified");

  return {
    sub: info.sub,
    email: info.email,
    name: info.name || info.given_name || info.email.split("@")[0],
    picture: info.picture,
  };
}
