"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { ChromeLogo } from "@/components/ui/brand-logos";
import { mainNav, site } from "@/lib/site";
import { tools } from "@/lib/tools";
import { ThemeToggle } from "./ThemeToggle";
import { useClerk } from "@clerk/nextjs";
import { signInUrl, useAccount } from "@/lib/useAccount";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const { user } = useAccount();
  const { signOut } = useClerk();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <Icon.Close className="h-6 w-6" /> : <Icon.Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-slate-200 bg-surface px-4 pt-2 pb-6 shadow-lg">
          <nav aria-label="Mobile" className="flex flex-col">
            {mainNav
              .filter((i) => i.label !== "Tools")
              .map((item) => (
                <Link key={item.href} href={item.href} onClick={close} className="border-b border-slate-100 py-3.5 text-base font-medium text-slate-800">
                  {item.label}
                </Link>
              ))}
            <p className="mt-5 text-xs font-semibold tracking-wider text-slate-400 uppercase">Free tools</p>
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} onClick={close} className="py-2.5 text-sm font-medium text-slate-700">
                {t.name}
              </Link>
            ))}
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              {user ? (
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                  <button type="button" onClick={() => signOut({ redirectUrl: "/" })} className="text-xs font-medium text-slate-500 hover:text-slate-900">
                    Sign out
                  </button>
                </div>
              ) : (
                <Link href={signInUrl()} onClick={close} className="text-sm font-semibold text-brand-600">
                  Sign in / Sign up
                </Link>
              )}
              <ThemeToggle />
            </div>
            <a href={site.chromeStoreUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md", "mt-5")}>
              <ChromeLogo className="h-4 w-4" />
              Add to Chrome — Free
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
