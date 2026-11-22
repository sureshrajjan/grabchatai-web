import type { Metadata } from "next";
import { Accordion, Container, PageHero, Pill } from "@/components/ui";
import { PricingPlans } from "@/components/marketing/PricingPlans";
import { faqBilling } from "@/content/faq";

export const metadata: Metadata = {
  title: "Pricing — Free and Pro Plans",
  description: "GrabChatAI pricing: a free plan with unlimited Markdown export, and Pro for unlimited PDF, Word, Notion sync and bulk export.",
};

const rows: [string, string, string][] = [
  ["Markdown, TXT, JSON export", "Unlimited", "Unlimited"],
  ["PDF export", "3 per day", "Unlimited"],
  ["Word export", "5 per day", "Unlimited"],
  ["Image export", "—", "Unlimited"],
  ["Notion sync", "5 per day", "Unlimited"],
  ["Bulk export (folders)", "—", "✓"],
  ["Folders", "Up to 5", "Unlimited + sub-folders"],
  ["Saved prompts", "Up to 20", "Unlimited"],
  ["Search", "Titles", "Full-text"],
  ["PDF themes", "Light", "All themes, no branding"],
  ["Support", "Email", "Priority email"],
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        badge={<Pill>Pricing</Pill>}
        title="Upgrade to Pro, save hours every week"
        intro="Start free with unlimited Markdown export. Go Pro for unlimited PDF, Word, Notion sync and bulk export."
      />
      <Container className="py-16">
        <PricingPlans />

        <div className="mt-20 overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Free vs Pro comparison</caption>
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 font-semibold text-slate-900">Feature</th>
                <th className="px-5 py-4 font-semibold text-slate-900">Free</th>
                <th className="px-5 py-4 font-semibold text-brand-700">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {rows.map(([f, free, pro]) => (
                <tr key={f}>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{f}</td>
                  <td className="px-5 py-3.5">{free}</td>
                  <td className="px-5 py-3.5">{pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900">Billing questions</h2>
          <div className="mt-8">
            <Accordion items={faqBilling} />
          </div>
        </div>
      </Container>
    </>
  );
}
