import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Pill } from "@/components/ui";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Why we built ${site.name}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero badge={<Pill>About</Pill>} title={`About ${site.name}`} intro="We help people keep the AI answers that matter." />
      <Container className="py-16">
        <article className="rich mx-auto max-w-3xl">
          <p>
            AI assistants are where we research, write, plan and code. But the best answers end up buried in endless chat
            histories, locked inside one app, and hard to share as a proper document.
          </p>
          <p>
            {site.name} fixes that. One lightweight Chrome extension exports conversations from ChatGPT, Gemini, Claude
            and Grok into clean PDF, Word, Markdown and other formats, syncs them to Notion, and keeps them organized with
            folders, tags, search and a reusable prompt library.
          </p>
          <h2>What we believe</h2>
          <ul>
            <li><strong>Your conversations are yours.</strong> Exports happen in your browser and your data stays on your device.</li>
            <li><strong>Formatting matters.</strong> Code, tables and formulas should look as good in a document as on screen.</li>
            <li><strong>Fair pricing.</strong> A useful free plan, simple Pro pricing and a {site.refundWindowDays}-day refund window.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            Questions or ideas? Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> or visit our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </article>
      </Container>
      <CtaBanner />
    </>
  );
}
