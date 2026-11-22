import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/layout/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `How to cancel ${site.name} Pro and request a refund.`,
};

export default function RefundPolicyPage() {
  const days = site.refundWindowDays;
  const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;
  return (
    <LegalDoc
      path="/refund-policy"
      title="Refund & Cancellation Policy"
      intro={`We want you to be happy with ${site.name} Pro. This policy explains how refunds and cancellations work.`}
    >
      <h2>1. Try it free first</h2>
      <p>
        The free plan includes unlimited Markdown, TXT and JSON export plus daily PDF, Word and Notion quotas, so you can
        test {site.name} on your own chats before upgrading.
      </p>

      <h2>2. {days}-day money-back guarantee</h2>
      <p>
        If Pro isn&apos;t right for you, request a <strong>full refund within {days} days</strong> of your first payment
        for Pro Monthly or Pro Yearly — no questions asked.
      </p>
      <ul>
        <li>Renewal charges can be refunded if requested within {days} days of the renewal and Pro has not been used since.</li>
        <li>After {days} days, payments are non-refundable except where required by law, or where a serious defect can&apos;t be fixed within a reasonable time.</li>
        <li>No refunds for accounts terminated for fraud, abuse or breach of our <Link href="/terms">Terms</Link>.</li>
      </ul>

      <h2>3. How to request a refund</h2>
      <p>
        Email {mail} from the address used at checkout and include your order number from the Dodo Payments receipt. We
        reply within 2 business days. Approved refunds are issued by our Merchant of Record, <strong>Dodo Payments</strong>,
        to your original payment method and usually appear within 5–10 business days. Your account then returns to the
        free plan; locally stored data is not affected.
      </p>

      <h2>4. How to cancel</h2>
      <ul>
        <li>Click “Manage subscription” in your Dodo Payments receipt email, or</li>
        <li>email {mail} and we will cancel it for you.</li>
      </ul>
      <p>
        After cancelling there are no further charges, and Pro stays active until the end of the period you paid for.
        Cancelling does not by itself refund the current period — see section 2.
      </p>

      <h2>5. Chargebacks</h2>
      <p>Please contact us before disputing a charge — we resolve billing issues quickly.</p>

      <h2>6. Your statutory rights</h2>
      <p>This policy doesn&apos;t limit any rights you have under consumer law in your country.</p>
    </LegalDoc>
  );
}
