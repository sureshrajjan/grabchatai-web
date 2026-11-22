import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { docGroups, docs } from "@/content/docs";

/** Two-column docs layout: grouped sidebar + content. */
export function DocsShell({ active, children }: { active?: string; children: ReactNode }) {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[230px_1fr]">
        <aside>
          {/* Mobile: compact select-like list */}
          <details className="rounded-xl border border-slate-200 lg:hidden">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-900">Documentation menu</summary>
            <DocsNav active={active} />
          </details>
          <div className="sticky top-24 hidden lg:block">
            <DocsNav active={active} />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </Container>
  );
}

function DocsNav({ active }: { active?: string }) {
  return (
    <nav aria-label="Documentation" className="space-y-6 p-4 lg:p-0">
      <Link
        href="/docs"
        className={`block text-sm font-semibold ${active === undefined ? "text-brand-600" : "text-slate-900 hover:text-brand-600"}`}
      >
        Overview
      </Link>
      {docGroups.map((group) => (
        <div key={group}>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{group}</p>
          <ul className="mt-2 space-y-0.5 border-l border-slate-200">
            {docs
              .filter((d) => d.group === group)
              .map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/docs/${d.slug}`}
                    className={`-ml-px block border-l py-1.5 pl-4 text-sm ${
                      active === d.slug
                        ? "border-brand-600 font-medium text-brand-600"
                        : "border-transparent text-slate-600 hover:border-slate-400 hover:text-slate-900"
                    }`}
                  >
                    {d.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
