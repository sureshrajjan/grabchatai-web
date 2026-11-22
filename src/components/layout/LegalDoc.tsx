import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { legalNav, site } from "@/lib/site";

export function LegalDoc({ path, title, intro, children }: { path: string; title: string; intro: string; children: ReactNode }) {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Legal" className="order-2 lg:order-1">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Legal</p>
          <ul className="mt-3 space-y-1 text-sm">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block rounded-lg px-3 py-2 ${l.href === path ? "bg-brand-50 font-medium text-brand-700" : "text-slate-600 hover:bg-slate-50"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="order-1 max-w-3xl lg:order-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-3 text-sm text-slate-500">Last updated: {site.legalLastUpdated}</p>
          <p className="mt-6 text-lg leading-8 text-slate-600">{intro}</p>
          <article className="rich mt-6">{children}</article>
        </div>
      </div>
    </Container>
  );
}
