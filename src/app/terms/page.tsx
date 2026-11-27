import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/layout/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of ${site.name} and any purchase of ${site.name} Pro.`,
};

export default function TermsPage() {
  const { legal } = site;
  const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;
  return (
    <LegalDoc
      path="/terms"
      title="Terms of Service"
      intro={`These Terms of Service ("Terms") govern your use of the ${site.domain} website, the free online tools on it and the ${site.name} browser extension (together, the "Service"). By installing the extension, using the Service or purchasing a plan, you agree to these Terms.`}
    >
      <h2>1. Who we are</h2>
      <p>
        The Service is provided by <strong>{legal.entityName}</strong>, {legal.address} (&quot;we&quot;, &quot;us&quot;).
        Contact: {mail}.
      </p>

      <h2>2. The Service</h2>
      <p>
        {site.name} is a Chrome extension that lets you export conversations from third-party AI chat websites —
        including ChatGPT, Gemini, Claude and Grok (&quot;Supported Platforms&quot;) — as PDF, Word, Markdown, TXT, JSON
        or image files, sync them to Notion, and organize them with folders, tags, search, a prompt library and
        bookmarks. The Service is delivered digitally via the Chrome Web Store; nothing is shipped.
      </p>
      <p>
        {site.name} is independent and not affiliated with, endorsed or sponsored by OpenAI, Google, Anthropic, xAI or
        Notion Labs. Your use of each Supported Platform remains subject to its own terms. Supported Platforms may change
        their websites at any time, which can temporarily affect features; we work to restore them promptly.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        You must be at least 16 years old (or the age of digital consent where you live) and able to enter a binding
        contract. If you use the Service for an organization, you confirm you may accept these Terms for it.
      </p>

      <h2>4. Plans, payment and Merchant of Record</h2>
      <p>
        The Service is offered on a free plan with daily limits, and a paid Pro plan billed monthly or yearly. Prices
        and limits are shown on our <Link href="/pricing">pricing page</Link>.
      </p>
      <p>
        <strong>
          Our order process is conducted by our online reseller Dodo Payments. Dodo Payments is the Merchant of Record
          for all our orders.
        </strong>{" "}
        Dodo Payments processes payments, issues invoices, collects and remits applicable taxes and handles
        payment-related customer service. By purchasing you also accept Dodo Payments&apos; buyer terms presented at
        checkout.
      </p>
      <ul>
        <li>Prices are in USD; applicable taxes (VAT, GST, sales tax) are calculated at checkout.</li>
        <li><strong>Subscriptions renew automatically</strong> at the end of each monthly or yearly period, at the then-current price, until cancelled.</li>
        <li>You may cancel anytime from <Link href="/account">Account &amp; billing</Link>. Cancellation stops future renewals; Pro remains active until the end of the paid period.</li>
        <li>We will give at least 30 days&apos; email notice before a price increase applies to an existing subscription.</li>
        <li>If a payment fails, Pro features may be paused until payment succeeds.</li>
      </ul>

      <h2>5. Refunds</h2>
      <p>
        Refunds and cancellations are governed by our <Link href="/refund-policy">Refund Policy</Link>, which is part of
        these Terms.
      </p>

      <h2>6. License</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable, revocable license to use the extension for personal or
        internal business purposes. A Pro license is for one person and may be used on that person&apos;s own devices.
        You may not share, resell or sublicense it.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>reverse engineer, decompile or modify the extension except as permitted by law;</li>
        <li>circumvent license checks, usage limits or security features;</li>
        <li>use the Service to export or process content you have no right to, or to violate a Supported Platform&apos;s terms or any law;</li>
        <li>use the Service to collect other people&apos;s personal data without a lawful basis;</li>
        <li>interfere with the Service or the infrastructure that runs it.</li>
      </ul>

      <h2>8. Your content</h2>
      <p>
        You keep all rights to your conversations, exports, prompts, folders and tags (&quot;Your Content&quot;). Exports
        are generated in your browser and Your Content is stored on your device; we don&apos;t claim ownership of it or use
        it to train AI models. You are responsible for your own backups. See our{" "}
        <Link href="/privacy">Privacy Policy</Link> and <Link href="/privacy/extension">Extension Privacy Policy</Link>.
      </p>

      <h2>9. Free online tools</h2>
      <p>
        The free tools on our website (such as Markdown to PDF and Markdown to Word) run in your browser and are provided
        as-is, without usage guarantees.
      </p>

      <h2>10. Intellectual property</h2>
      <p>
        The Service, its software, design and the {site.name} name and logo belong to us. Third-party names are used only
        to describe compatibility.
      </p>

      <h2>11. Changes and availability</h2>
      <p>
        We may update the extension and change features. We aim for high availability but do not guarantee uninterrupted
        operation. If we materially remove Pro features you have paid for, you may request a pro-rated refund for the
        remaining period.
      </p>

      <h2>12. Disclaimer</h2>
      <p>
        To the extent permitted by law, the Service is provided &quot;as is&quot; and &quot;as available&quot; without
        warranties of any kind. This does not limit rights you have under consumer law that cannot be excluded.
      </p>

      <h2>13. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect, incidental, special or consequential
        damages, or loss of data, profits or revenue. Our total liability is limited to the amount you paid us in the 12
        months before the claim, or USD 50 if you have paid nothing.
      </p>

      <h2>14. Termination</h2>
      <p>
        You can stop using the Service at any time by uninstalling the extension. We may suspend or terminate access for
        material breach of these Terms, including fraud or chargeback abuse.
      </p>

      <h2>15. Governing law</h2>
      <p>
        These Terms are governed by the laws of {legal.governingLaw}. The courts of {legal.jurisdictionCity} have
        jurisdiction, without prejudice to consumers&apos; right to sue in their country of residence where the law
        allows. Please contact us first at {mail} so we can try to resolve any issue informally.
      </p>

      <h2>16. Changes to these Terms</h2>
      <p>
        We may update these Terms and will post the new version here with an updated date. Paying customers will be
        notified of material changes by email.
      </p>
    </LegalDoc>
  );
}
