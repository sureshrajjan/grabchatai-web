import Link from "next/link";
import { Brand } from "./Brand";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";
import { AccountMenu } from "@/components/auth/AccountMenu";
import { buttonClass } from "@/components/ui";
import { ChromeLogo } from "@/components/ui/brand-logos";
import { mainNav, site } from "@/lib/site";
import { tools } from "@/lib/tools";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-page/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Brand />
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {mainNav.map((item) =>
              item.label === "Tools" ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600"
                  >
                    Tools
                    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                      <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </Link>
                  <div className="invisible absolute top-full left-0 w-72 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className="rounded-2xl border border-slate-200 bg-surface p-2 shadow-xl shadow-slate-900/10">
                      {tools.map((t) => (
                        <Link key={t.slug} href={`/tools/${t.slug}`} className="block rounded-xl p-3 hover:bg-slate-50">
                          <span className="block text-sm font-semibold text-slate-900">{t.name}</span>
                          <span className="mt-0.5 block text-xs text-slate-500">{t.short}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <div className="hidden lg:block">
            <AccountMenu />
          </div>
          <a
            href={site.chromeStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass("dark", "sm", "hidden sm:inline-flex")}
          >
            <ChromeLogo className="h-4 w-4" />
            Add to Chrome
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
