import type { Metadata } from "next";
import { Accordion, Container, PageHero, Pill } from "@/components/ui";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { faqBilling, faqExport, faqGeneral, faqOrganize } from "@/content/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about GrabChatAI: supported platforms, export formats, privacy, Notion sync and billing.",
};

const groups = [
  { id: "general", title: "General", items: faqGeneral },
  { id: "export", title: "Exporting", items: faqExport },
  { id: "organize", title: "Organizing", items: faqOrganize },
  { id: "billing", title: "Billing & account", items: faqBilling },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        badge={<Pill>FAQ</Pill>}
        title="Frequently asked questions"
        intro={
          <>
            Can’t find an answer? Email{" "}
            <a href={`mailto:${site.supportEmail}`} className="font-medium text-brand-600 hover:underline">
              {site.supportEmail}
            </a>
            .
          </>
        }
      />
      <Container className="py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[200px_1fr]">
          <nav className="hidden lg:block" aria-label="FAQ sections">
            <ul className="sticky top-24 space-y-1 text-sm">
              {groups.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`} className="block rounded-lg px-3 py-2 font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-14">
            {groups.map((g) => (
              <section key={g.id} id={g.id} className="scroll-mt-24">
                <h2 className="mb-5 text-xl font-bold text-slate-900">{g.title}</h2>
                <Accordion items={g.items} />
              </section>
            ))}
          </div>
        </div>
      </Container>
      <CtaBanner />
    </>
  );
}
