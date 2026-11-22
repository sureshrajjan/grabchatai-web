import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

/** POST /api/auth/signout — clears the session and returns home. */
export async function POST(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/", request.url), 303);
  res.cookies.delete(SESSION_COOKIE);
  return res;
}
