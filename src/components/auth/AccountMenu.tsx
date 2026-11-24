"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonClass } from "@/components/ui";
import { useClerk } from "@clerk/nextjs";
import posthog from "posthog-js";
import { signInUrl, useAccount, type ClientUser } from "@/lib/useAccount";

function usePostHogIdentity(status: "loading" | "authenticated" | "unauthenticated", user: ClientUser | null) {
  const identifiedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!user) {
      if (identifiedUserId.current) {
        posthog.reset();
        identifiedUserId.current = null;
      }
      return;
    }

    if (identifiedUserId.current === user.id) return;

    if (identifiedUserId.current) posthog.reset();

    posthog.identify(user.id, {
      name: user.name,
      ...(user.email ? { email: user.email } : {}),
    });
    identifiedUserId.current = user.id;
  }, [status, user]);
}

export function Avatar({ user, size = 32 }: { user: ClientUser; size?: number }) {
  const [broken, setBroken] = useState(false);
  if (user.picture && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.picture}
        alt=""
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="flex items-center justify-center rounded-full bg-brand-500 font-semibold text-white"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}

export function AccountMenu() {
  const { status, user } = useAccount();
  usePostHogIdentity(status, user);
  const { signOut } = useClerk();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (status === "loading") return <span className="h-8 w-8 animate-pulse rounded-full bg-slate-100" aria-hidden="true" />;

  if (!user) {
    return (
      <Link href={signInUrl()} className={buttonClass("ghost", "sm")}>
        Sign in
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="flex rounded-full ring-2 ring-transparent transition hover:ring-brand-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <Avatar user={user} />
      </button>

      {open && (
        <div role="menu" className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-surface p-2 shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-3 rounded-xl p-3">
            <Avatar user={user} size={40} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>
          <Link
            href="/pricing"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-3 py-2.5 text-sm font-semibold text-brand-700 hover:border-brand-300"
          >
            Upgrade to Pro
            <span aria-hidden="true">↗</span>
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              posthog.capture("user_signed_out");
              signOut({ redirectUrl: "/" });
            }}
            className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
