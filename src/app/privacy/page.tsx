import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/layout/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information on ${site.domain} and when you buy Pro.`,
};

export default function PrivacyPage() {
  const { legal } = site;
  const mail = <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>;
  return (
    <LegalDoc
      path="/privacy"
      title="Privacy Policy"
      intro={`This policy explains how ${site.name} handles personal information when you visit ${site.domain}, use our free online tools, contact us or purchase Pro. How the browser extension handles data is described in our Extension Privacy Policy.`}
    >
      <h2>1. Controller</h2>
      <p>
        <strong>{legal.entityName}</strong>, {legal.address}. Privacy contact: {mail}.
      </p>

      <h2>2. Summary</h2>
      <ul>
        <li>We never read, upload or store the content of your AI conversations.</li>
        <li>We never sell personal data.</li>
        <li>Payments are handled by Dodo Payments, our Merchant of Record; we never see your full card details.</li>
      </ul>

      <h2>3. Information we collect</h2>
      <h3>Website visits</h3>
      <p>
        Our hosting provider records standard server logs (IP address, browser, pages requested, time). We may use
        privacy-friendly, cookie-less analytics to count visits. We do not use advertising cookies or cross-site tracking.
      </p>
      <h3>Free online tools</h3>
      <p>
        The Markdown to PDF and Markdown to Word tools run entirely in your browser. The text and files you convert are
        not sent to our servers.
      </p>
      <h3>Purchases</h3>
      <p>
        Dodo Payments collects your name, email, billing address and payment details under its own privacy policy. It
        shares with us your email, name, country, plan, transaction/subscription IDs and payment status so we can
        activate and manage your license.
      </p>
      <h3>Support</h3>
      <p>When you email us we receive your address and message.</p>

      <h2>4. How we use information</h2>
      <ul>
        <li>to provide and activate your Pro license;</li>
        <li>to process payments, refunds and cancellations through Dodo Payments;</li>
        <li>to answer support requests and send transactional emails (receipts, renewal notices, service notices);</li>
        <li>to secure the Service, prevent fraud and meet legal, tax and accounting obligations;</li>
        <li>to understand aggregate website usage and improve the Service.</li>
      </ul>
      <p>We only send marketing emails if you opt in, and you can unsubscribe anytime.</p>

      <h2>5. Legal bases (EEA/UK)</h2>
      <p>
        Contract (providing your license), legitimate interests (security, support, improvement), legal obligation (tax
        and accounting) and consent where required.
      </p>

      <h2>6. Sharing</h2>
      <ul>
        <li><strong>Dodo Payments</strong> — Merchant of Record for payments, invoicing and tax;</li>
        <li><strong>Hosting</strong> — Vercel, which hosts this website and our license API;</li>
        <li><strong>Email providers</strong> — for transactional and support email.</li>
      </ul>
      <p>We may disclose information if required by law or as part of a business transfer, under this policy.</p>

      <h2>7. International transfers</h2>
      <p>
        Providers may process data outside your country, including in the United States and India, with appropriate
        safeguards such as standard contractual clauses where required.
      </p>

      <h2>8. Retention</h2>
      <p>
        License and purchase records are kept while your license is active and afterwards as required for tax and
        accounting (typically up to 8 years). Support emails are kept for up to 2 years. Server logs are kept for up to
        30 days.
      </p>

      <h2>9. Your rights</h2>
      <p>
        Depending on where you live you may access, correct, delete or export your data, object to or restrict
        processing, and withdraw consent. California residents: we do not sell or share personal information as defined
        by the CCPA/CPRA. Email {mail} to exercise your rights, or contact your local data-protection authority.
      </p>

      <h2>10. Children</h2>
      <p>The Service is not directed to children under 16, and we do not knowingly collect their data.</p>

      <h2>11. Changes</h2>
      <p>
        We will post updates here with a new date and email paying customers about material changes. See also our{" "}
        <Link href="/privacy/extension">Extension Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalDoc>
  );
}
