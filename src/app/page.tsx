import { Accordion, Container, IconTile, Section, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { InstallButton } from "@/components/marketing/InstallButton";
import { PlatformStrip } from "@/components/marketing/PlatformStrip";
import { FeatureRow } from "@/components/marketing/FeatureRow";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import {
  ExportPopupMock,
  FoldersMock,
  HubMock,
  NotionSyncMock,
  PromptsMock,
  QuickNavMock,
  SelectMock,
} from "@/components/mocks";
import { faqHome } from "@/content/faq";

const features = [
  {
    title: "Export to PDF, Word, Markdown & more",
    body: "Save full conversations or single answers as PDF, Word, Markdown, TXT, JSON or images in one click. Code highlighting, tables, formulas and images are preserved.",
    visual: <ExportPopupMock />,
    link: { href: "/docs/export-formats", label: "See all formats" },
  },
  {
    title: "One-click sync to Notion",
    body: "Send any chat to a Notion page or database with headings, code and tables intact. Build a knowledge base from your best AI conversations.",
    visual: <NotionSyncMock />,
    link: { href: "/docs/notion-sync", label: "How Notion sync works" },
  },
  {
    title: "Select exactly what to export",
    body: "Tick the messages you want and leave out the rest. Export clean, focused documents instead of long, messy threads.",
    visual: <SelectMock />,
  },
  {
    title: "Folders, tags and full-text search",
    body: "Keep chats from ChatGPT, Gemini, Claude and Grok in one sidebar. Organize them into folders and find any message in seconds.",
    visual: <FoldersMock />,
    link: { href: "/docs/folders-and-tags", label: "Organizing chats" },
  },
  {
    title: "Prompt library and bookmarks",
    body: "Save prompts with {variables} and insert them anywhere with a shortcut. Bookmark great answers and jump straight back to them.",
    visual: <PromptsMock />,
  },
  {
    title: "AI quick navigation",
    body: "Open any AI from any website with one shortcut. Pin your favorites and switch between models without hunting for tabs.",
    visual: <QuickNavMock />,
  },
];

const benefits = [
  { icon: Icon.Layers, title: "One extension for every AI", body: "Same export and organize tools on ChatGPT, Gemini, Claude and Grok." },
  { icon: Icon.FileText, title: "Formatting you can trust", body: "Code, tables, formulas and images come out exactly as they appear." },
  { icon: Icon.Lock, title: "Private by design", body: "Exports are created in your browser. Your chats never touch our servers." },
  { icon: Icon.Palette, title: "Beautiful PDF themes", body: "Light, dark, sepia and minimal styles, with your choice of fonts." },
  { icon: Icon.Infinity, title: "No chat too long", body: "Even conversations with hundreds of turns export completely." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-grid relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/80 to-surface" />
        <Container className="relative pt-20 pb-16 text-center sm:pt-28">
          <h1 className="mx-auto max-w-4xl text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl">
            <span className="text-gradient">AI Chat Exporter</span>{" "}
            <span className="text-slate-900">for ChatGPT, Gemini, Claude &amp; Grok</span>
          </h1>
          <p className="mx-auto mt-5 text-xl font-medium text-slate-700">
            Save, organize and reuse every important AI conversation
          </p>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
            Download chats as beautifully formatted PDFs, or as Word, Markdown, TXT, JSON or images. Sync to Notion in
            one click, and keep everything in folders with full-text search.
          </p>
          <div className="mt-10 flex justify-center">
            <InstallButton />
          </div>
          <div className="mt-14">
            <PlatformStrip />
          </div>
        </Container>
        <Container className="relative pb-20">
          <div className="mx-auto max-w-4xl">
            <ExportPopupMock />
          </div>
        </Container>
      </section>

      {/* Core features */}
      <Section id="features" tone="muted">
        <SectionHeading
          eyebrow="Features"
          title="6 core features to manage your AI chats"
          intro="Everything you need to get conversations out of your AI tools and into a place you can use them."
        />
        <div className="mt-6 divide-y divide-slate-200">
          {features.map((f, i) => (
            <FeatureRow key={f.title} n={i + 1} title={f.title} body={f.body} visual={f.visual} link={f.link} reverse={i % 2 === 1} />
          ))}
        </div>
      </Section>

      {/* Benefits (dark) */}
      <Section tone="dark">
        <SectionHeading dark title="The cleanest way to save AI chats" intro="Perfect formatting, every time — without giving up your privacy." />
        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <HubMock />
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <IconTile dark>
                  <b.icon className="h-5 w-5" />
                </IconTile>
                <div>
                  <p className="font-semibold text-white">{b.title}</p>
                  <p className="mt-1 text-sm leading-6 text-neutral-400">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <SectionHeading eyebrow="Pricing" title="Free to start. Pro when you need more." />
        <div className="mt-12">
          <PricingPlans />
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="muted">
        <SectionHeading title="Frequently asked questions" />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion items={faqHome} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
