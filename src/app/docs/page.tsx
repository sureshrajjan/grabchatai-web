import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/layout/DocsShell";
import { docGroups, docs } from "@/content/docs";

export const metadata: Metadata = {
  title: "Documentation — User Guide",
  description: "Learn how to export, organize and reuse your AI chats with GrabChatAI.",
};

export default function DocsIndexPage() {
  return (
    <DocsShell>
      <p className="text-sm font-semibold text-brand-600">Documentation</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">GrabChatAI user guide</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Everything you need to export conversations from ChatGPT, Gemini, Claude and Grok, and keep them organized.
      </p>

      {docGroups.map((group) => (
        <section key={group} className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">{group}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {docs
              .filter((d) => d.group === group)
              .map((d) => (
                <Link
                  key={d.slug}
                  href={`/docs/${d.slug}`}
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-brand-200 hover:shadow-md hover:shadow-slate-900/5"
                >
                  <p className="font-semibold text-slate-900 group-hover:text-brand-600">{d.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{d.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </DocsShell>
  );
}
