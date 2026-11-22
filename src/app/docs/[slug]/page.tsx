import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/layout/DocsShell";
import { docs, getDoc } from "@/content/docs";

// All slugs are prerendered via generateStaticParams; allow the params read to block.
export const instant = false;

export function generateStaticParams() {
  return docs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  return doc ? { title: `${doc.title} — Docs`, description: doc.summary } : {};
}

export default async function DocPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const i = docs.findIndex((d) => d.slug === slug);
  const prev = docs[i - 1];
  const next = docs[i + 1];

  return (
    <DocsShell active={slug}>
      <p className="text-sm font-semibold text-brand-600">{doc.group}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{doc.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{doc.summary}</p>
      <article className="rich mt-8 max-w-3xl">{doc.body}</article>

      <div className="mt-14 grid max-w-3xl gap-4 border-t border-slate-200 pt-8 sm:grid-cols-2">
        {prev ? (
          <Link href={`/docs/${prev.slug}`} className="rounded-xl border border-slate-200 p-4 hover:border-brand-200">
            <span className="text-xs text-slate-500">← Previous</span>
            <span className="mt-1 block font-semibold text-slate-900">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/docs/${next.slug}`} className="rounded-xl border border-slate-200 p-4 text-right hover:border-brand-200">
            <span className="text-xs text-slate-500">Next →</span>
            <span className="mt-1 block font-semibold text-slate-900">{next.title}</span>
          </Link>
        )}
      </div>
    </DocsShell>
  );
}
