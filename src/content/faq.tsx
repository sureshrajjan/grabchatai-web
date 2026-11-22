import Link from "next/link";
import type { QA } from "@/components/ui";
import { site } from "@/lib/site";

const a = "font-medium text-brand-600 hover:underline";

export const faqGeneral: QA[] = [
  {
    q: "Which AI platforms does GrabChatAI support?",
    a: "GrabChatAI works on ChatGPT, Google Gemini, Anthropic Claude and xAI Grok in Chrome and other Chromium browsers that support Chrome Web Store extensions, such as Edge, Brave and Arc.",
  },
  {
    q: "Is GrabChatAI free?",
    a: (
      <>
        Yes. Markdown, TXT and JSON exports are unlimited and free. PDF, Word and Notion sync have a daily free quota,
        and the free plan includes folders and a starter prompt library. Pro removes all limits — see{" "}
        <Link href="/pricing" className={a}>pricing</Link>.
      </>
    ),
  },
  {
    q: "Is my data secure? Do you store my conversations?",
    a: (
      <>
        Exports are generated locally in your browser, and your folders, tags, prompts and search index are stored on
        your device. We don’t upload, read or store your conversations. Notion sync sends the chats you choose directly
        to your own Notion workspace. Details are in our{" "}
        <Link href="/privacy/extension" className={a}>Extension Privacy Policy</Link>.
      </>
    ),
  },
  {
    q: "Do I need an account?",
    a: "No account is needed to use the free plan. When you upgrade, your purchase email is used to activate Pro on your devices.",
  },
  {
    q: "Is GrabChatAI affiliated with OpenAI, Google, Anthropic or xAI?",
    a: "No. GrabChatAI is an independent product and is not affiliated with, endorsed by or sponsored by any of these companies.",
  },
];

export const faqExport: QA[] = [
  {
    q: "Which export formats are available?",
    a: "PDF, Word (.docx), Markdown, plain text, JSON and image (PNG). You can export a whole conversation, selected messages or a single answer.",
  },
  {
    q: "Are code blocks, tables, images and math formulas preserved?",
    a: "Yes. Code keeps its syntax highlighting, tables stay as tables, images are embedded and LaTeX formulas are rendered in PDF and Word exports.",
  },
  {
    q: "Can I export very long conversations?",
    a: "Yes. GrabChatAI loads the full conversation before exporting, so even chats with hundreds of turns export completely.",
  },
  {
    q: "Can I export many chats at once?",
    a: "Pro users can select multiple chats, or an entire folder, and export them in one click as separate files bundled in a .zip.",
  },
  {
    q: "How does Notion sync work?",
    a: "Connect your Notion workspace once, pick a page or database, and send any chat with headings, lists, code and tables kept intact. You can disconnect at any time.",
  },
];

export const faqOrganize: QA[] = [
  {
    q: "How do folders and tags work?",
    a: "A sidebar appears next to your AI chat. Drag conversations into folders and sub-folders, and add tags to group chats across folders and across AI platforms.",
  },
  {
    q: "What does full-text search cover?",
    a: "Pro search looks inside every message of the chats you have saved to GrabChatAI, across all supported platforms. The free plan searches chat titles.",
  },
  {
    q: "What is the prompt library?",
    a: "Save prompts you reuse, with {variables} you fill in each time, and insert them into any supported AI chat from the sidebar or with a keyboard shortcut.",
  },
];

export const faqBilling: QA[] = [
  {
    q: "Who processes my payment?",
    a: "Our order process is conducted by our online reseller Dodo Payments, the Merchant of Record for all orders. Dodo Payments handles payment processing, invoicing, sales tax/VAT and payment-related questions.",
  },
  {
    q: "How do I cancel or manage my subscription?",
    a: (
      <>
        Use the “Manage subscription” link in your receipt email from Dodo Payments, or email{" "}
        <a href={`mailto:${site.supportEmail}`} className={a}>{site.supportEmail}</a>. You keep Pro until the end of
        the period you paid for.
      </>
    ),
  },
  {
    q: "What is your refund policy?",
    a: (
      <>
        You can request a full refund within {site.refundWindowDays} days of purchase. See our{" "}
        <Link href="/refund-policy" className={a}>Refund Policy</Link> for details.
      </>
    ),
  },
  {
    q: "How do I activate Pro after paying?",
    a: "Open the GrabChatAI extension, go to Settings → Account and sign in with the email you used at checkout. Pro activates instantly.",
  },
  {
    q: "Why is Pro paid?",
    a: "Pro funds ongoing development: keeping exports working as AI websites change, adding new formats and platforms, and providing support.",
  },
];

export const faqHome: QA[] = [faqGeneral[0], faqGeneral[1], faqGeneral[2], faqExport[1], faqExport[4], faqBilling[1]];
