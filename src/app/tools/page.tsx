import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Pill } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Online Tools",
  description: "Free browser-based tools from GrabChatAI: convert Markdown to PDF and Markdown to Word.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero badge={<Pill>Free tools</Pill>} title="Free tools for AI content" intro="Convert Markdown from AI chats, READMEs and notes into shareable documents. No sign-up, nothing uploaded." />
      <Container className="py-16">
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {tools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon.FileText className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-slate-900 group-hover:text-brand-600">{t.name}</h2>
              <p className="mt-1.5 text-sm text-slate-600">{t.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                Open tool <Icon.ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
      <CtaBanner />
    </>
  );
}
