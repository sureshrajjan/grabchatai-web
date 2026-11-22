"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BrandMark } from "@/components/layout/Brand";
import { GoogleLogo } from "@/components/ui/GoogleLogo";
import { Icon } from "@/components/ui/icons";
import { useSession } from "@/lib/useSession";

const errors: Record<string, string> = {
  config: "Google sign-in isn't configured yet. Add GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and AUTH_SECRET.",
  cancelled: "Sign-in was cancelled. Please try again.",
  state: "Your sign-in session expired. Please try again.",
  google: "We couldn't sign you in with Google. Please try again.",
};

const perks = [
  "Upgrade to Pro and manage your subscription",
  "Use the same Google email in the extension to unlock Pro",
  "Your chats stay on your device — we only store your email",
];

export function AuthCard({ mode }: { mode: "signin" | "signup" }) {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/pricing";
  const error = params.get("error");
  const { status } = useSession();

  // Already signed in → go straight on.
  useEffect(() => {
    if (status === "authenticated") router.replace(next.startsWith("/") && !next.startsWith("//") ? next : "/pricing");
  }, [status, next, router]);

  const isSignup = mode === "signup";
  const other = isSignup ? "/signin" : "/signup";
  const otherQuery = params.get("next") ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-surface p-8 shadow-xl shadow-slate-900/5 sm:p-10">
      <div className="flex justify-center">
        <BrandMark size={44} />
      </div>
      <h1 className="mt-6 text-center text-2xl font-semibold tracking-tight text-slate-900">
        {isSignup ? "Create your GrabChat AI account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-center text-sm text-slate-500">
        {isSignup ? "Sign up with Google to upgrade to Pro." : "Sign in with Google to continue to your plan."}
      </p>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {errors[error] ?? errors.google}
        </p>
      )}

      <a
        href={`/api/auth/google?next=${encodeURIComponent(next)}`}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-surface px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
      >
        <GoogleLogo />
        {isSignup ? "Sign up with Google" : "Continue with Google"}
      </a>

      <ul className="mt-8 space-y-2.5 border-t border-slate-200 pt-6 text-sm text-slate-600">
        {perks.map((p) => (
          <li key={p} className="flex gap-2.5">
            <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            {p}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm text-slate-500">
        {isSignup ? "Already have an account? " : "New to GrabChat AI? "}
        <Link href={`${other}${otherQuery}`} className="font-semibold text-brand-600 hover:underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        By continuing you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-600">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-slate-600">Privacy Policy</Link>.
      </p>
    </div>
  );
}
