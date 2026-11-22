import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Accordion, Card, Container, IconTile, PageHero, Section, SectionHeading, StepNumber } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { InstallButton } from "@/components/marketing/InstallButton";
import { PlatformBadge } from "@/components/marketing/PlatformStrip";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { ExportPopupMock } from "@/components/mocks";
import { platformCopy } from "@/content/platforms";
import { platforms } from "@/lib/site";

// All slugs are prerendered via generateStaticParams; allow the params read to block.
export const instant = false;

export function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const copy = platformCopy[slug];
  return copy ? { title: copy.metaTitle, description: copy.intro } : {};
}

const whyIcons = [Icon.FileText, Icon.Check, Icon.Infinity, Icon.Sparkles];

export default async function PlatformPage({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const platform = platforms.find((p) => p.slug === slug);
  const copy = platformCopy[slug];
  if (!platform || !copy) notFound();

  return (
    <>
      <PageHero badge={<PlatformBadge platform={platform} size="lg" />} title={copy.title} intro={copy.intro}>
        <div className="flex justify-center">
          <InstallButton />
        </div>
      </PageHero>

      <Container className="-mt-2 pb-8">
        <div className="mx-auto max-w-4xl pt-12">
          <ExportPopupMock />
        </div>
      </Container>

      <Section tone="muted">
        <SectionHeading title={`Why use GrabChatAI for ${platform.name}?`} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {copy.why.map((w, i) => {
            const I = whyIcons[i % whyIcons.length];
            return (
              <Card key={w.title}>
                <IconTile>
                  <I className="h-5 w-5" />
                </IconTile>
                <h3 className="mt-4 font-semibold text-slate-900">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{w.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeading title={`How to export ${platform.name} chats`} />
        <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {copy.steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-slate-200 p-6">
              <StepNumber n={i + 1} />
              <h3 className="mt-4 font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <SectionHeading title="Questions about the extension" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={copy.faq} />
        </div>
      </Section>

      <CtaBanner title={`Start saving your ${platform.name} conversations`} />
    </>
  );
}
