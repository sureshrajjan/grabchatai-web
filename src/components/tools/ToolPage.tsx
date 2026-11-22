import Link from "next/link";
import type { ReactNode } from "react";
import { Accordion, Card, Container, PageHero, Pill, Section, SectionHeading, StepNumber, type QA } from "@/components/ui";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { tools } from "@/lib/tools";

/** Shared layout for the free online tools. */
export function ToolPage({
  slug,
  title,
  intro,
  tool,
  steps,
  highlights,
  faq,
}: {
  slug: string;
  title: string;
  intro: string;
  tool: ReactNode;
  steps: { title: string; body: string }[];
  highlights: { title: string; body: string }[];
  faq: QA[];
}) {
  const meta = tools.find((t) => t.slug === slug)!;
  const others = tools.filter((t) => t.slug !== slug);
  return (
    <>
      <PageHero badge={<Pill tone="slate">{meta.badge}</Pill>} title={title} intro={intro} />
      <Container className="py-12">{tool}</Container>

      <Section tone="muted">
        <SectionHeading title={`How to use ${meta.name}`} />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-slate-200 bg-surface p-6">
              <StepNumber n={i + 1} />
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading title="What this tool supports" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <Card key={h.title}>
              <h3 className="font-semibold text-slate-900">{h.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{h.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading title={`${meta.name} FAQ`} />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faq} />
        </div>
        {others.length > 0 && (
          <p className="mt-10 text-center text-sm text-slate-600">
            More free tools:{" "}
            {others.map((o, i) => (
              <span key={o.slug}>
                {i > 0 && " · "}
                <Link href={`/tools/${o.slug}`} className="font-medium text-brand-600 hover:underline">{o.name}</Link>
              </span>
            ))}
          </p>
        )}
      </Section>

      <CtaBanner
        title="Export AI chats directly — no copy-paste"
        body="GrabChatAI saves ChatGPT, Gemini, Claude and Grok conversations straight to PDF, Word or Markdown."
      />
    </>
  );
}
