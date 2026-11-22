import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, IconTile, PageHero, Pill } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} for support, billing, refunds and privacy requests.`,
};

const channels = [
  { icon: Icon.Book, title: "Product support", body: "Bugs, questions and feature requests.", email: site.supportEmail },
  { icon: Icon.FileText, title: "Billing & refunds", body: "Cancellations, refunds and invoices.", email: site.supportEmail },
  { icon: Icon.Lock, title: "Privacy", body: "Data access and deletion requests.", email: site.privacyEmail },
];

export default function ContactPage() {
  return (
    <>
      <PageHero badge={<Pill>Contact</Pill>} title="Get in touch" intro="We read every message and reply within 1–2 business days." />
      <Container className="py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {channels.map((c) => (
            <Card key={c.title}>
              <IconTile>
                <c.icon className="h-5 w-5" />
              </IconTile>
              <h2 className="mt-4 font-semibold text-slate-900">{c.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{c.body}</p>
              <a href={`mailto:${c.email}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">
                <Icon.Mail className="h-4 w-4" /> {c.email}
              </a>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
          <p className="font-semibold text-slate-900">Business details</p>
          <p className="mt-2">
            {site.legal.entityName}
            <br />
            {site.legal.address}
          </p>
          <p className="mt-4">
            Payments are processed by Dodo Payments, our Merchant of Record. For billing questions please include your order
            number. See the <Link href="/refund-policy" className="text-brand-600 hover:underline">Refund Policy</Link> and{" "}
            <Link href="/docs/account-and-billing" className="text-brand-600 hover:underline">billing guide</Link>.
          </p>
        </div>
      </Container>
    </>
  );
}
