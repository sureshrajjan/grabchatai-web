"use client";

import Link from "next/link";
import { Avatar } from "@/components/auth/AccountMenu";
import { signInUrl, useAccount } from "@/lib/useAccount";

/** Shows who is signed in above the plans, or a sign-in prompt. */
export function PricingAccountBar() {
  const { status, user } = useAccount();
  if (status === "loading") return <div className="mb-10 h-[58px]" aria-hidden="true" />;

  return (
    <div className="mx-auto mb-10 flex max-w-xl items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-surface px-4 py-3 text-sm">
      {user ? (
        <>
          <span className="flex min-w-0 items-center gap-3">
            <Avatar user={user} size={32} />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-slate-900">{user.name}</span>
              <span className="block truncate text-xs text-slate-500">{user.email}</span>
            </span>
          </span>
          <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
            Signed in · choose a plan
          </span>
        </>
      ) : (
        <>
          <span className="text-slate-600">Sign in or create an account to upgrade to Pro.</span>
          <Link
            href={signInUrl("/pricing")}
            className="flex shrink-0 items-center gap-2 rounded-xl border border-slate-300 px-3.5 py-2 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Sign in
          </Link>
        </>
      )}
    </div>
  );
}
