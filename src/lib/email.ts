import "server-only";
import { site } from "./site";

/**
 * Transactional email via Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).
 *
 * Env:
 *   RESEND_API_KEY  — Resend dashboard → API Keys
 *   EMAIL_FROM      — e.g. "GrabChatAI <billing@grabchatai.com>"; the domain must be verified in Resend.
 */

export type Email = { to: string; subject: string; html: string; text: string };

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

/**
 * Sends one email. `idempotencyKey` makes Resend drop duplicates for 24h, so a
 * retried webhook never emails the customer twice. Throws on failure.
 */
export async function sendEmail(email: Email, idempotencyKey: string): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) throw new Error("RESEND_API_KEY or EMAIL_FROM is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [email.to],
      reply_to: site.supportEmail,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string; name?: string };
  if (!res.ok) throw new Error(`Resend ${res.status}: ${body.name ?? ""} ${body.message ?? ""}`.trim());
  return body.id ?? "";
}

// ---------- templates ----------

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function layout(paragraphs: string[], cta?: { label: string; href: string }) {
  const body = paragraphs.map((p) => `<p style="margin:0 0 16px;line-height:1.6">${p}</p>`).join("");
  const button = cta
    ? `<p style="margin:24px 0"><a href="${cta.href}" style="background:#f45a2d;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;display:inline-block;font-weight:600">${escapeHtml(cta.label)}</a></p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
<div style="max-width:560px;margin:0 auto;padding:32px 24px">
<p style="margin:0 0 24px;font-size:20px;font-weight:700">${escapeHtml(site.name)}</p>
${body}${button}
<p style="margin:32px 0 0;font-size:13px;color:#64748b;line-height:1.6">Questions? Reply to this email or write to <a href="mailto:${site.supportEmail}" style="color:#f45a2d">${site.supportEmail}</a>.<br>Payments are processed by Dodo Payments, our Merchant of Record.</p>
</div></body></html>`;
}

/** Strip tags for the plain-text part. */
function toText(paragraphs: string[], cta?: { label: string; href: string }) {
  const text = paragraphs.map((p) => p.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&")).join("\n\n");
  return `${text}${cta ? `\n\n${cta.label}: ${cta.href}` : ""}\n\nQuestions? Write to ${site.supportEmail}.`;
}

function build(to: string, subject: string, paragraphs: string[], cta?: { label: string; href: string }): Email {
  return { to, subject, html: layout(paragraphs, cta), text: toText(paragraphs, cta) };
}

type Customer = { email: string; name?: string | null };

function greeting(c: Customer) {
  const first = c.name?.trim().split(/\s+/)[0];
  return first ? `Hi ${escapeHtml(first)},` : "Hi,";
}

export const emails = {
  proWelcome(c: Customer, planName: string, nextBillingDate?: string | null) {
    const next = formatDate(nextBillingDate);
    return build(
      c.email,
      `Welcome to ${site.name} Pro`,
      [
        greeting(c),
        `Thanks for upgrading — your <strong>${escapeHtml(planName)}</strong> subscription is now active.`,
        `To unlock Pro, open the ${escapeHtml(site.name)} extension → <strong>Settings → Account</strong> and sign in with <strong>${escapeHtml(c.email)}</strong>.`,
        ...(next ? [`Your next billing date is ${next}. Dodo Payments sends your receipt separately.`] : []),
      ],
      { label: "Read the getting-started guide", href: `${site.url}/docs/getting-started` },
    );
  },

  proCancelled(c: Customer) {
    return build(c.email, `Your ${site.name} Pro subscription was cancelled`, [
      greeting(c),
      `Your ${escapeHtml(site.name)} Pro subscription has been cancelled and won't renew.`,
      `Changed your mind? You can upgrade again any time from our pricing page.`,
    ], { label: "View plans", href: `${site.url}/pricing` });
  },

  paymentProblem(c: Customer) {
    return build(c.email, `Action needed: payment for ${site.name} Pro failed`, [
      greeting(c),
      `We couldn't process the latest payment for your ${escapeHtml(site.name)} Pro subscription, so it's on hold.`,
      `Please update your payment method using the link in your Dodo Payments receipt email, or reply to this email and we'll help.`,
    ]);
  },
};
