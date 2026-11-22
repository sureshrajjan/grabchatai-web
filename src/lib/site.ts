/**
 * Central site configuration. Edit values marked TODO before going live —
 * they are used across marketing pages, pricing and all legal pages.
 */
export const site = {
  name: "GrabChatAI",
  domain: "grabchatai.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://grabchatai.com",
  description:
    "Export, organize and reuse your AI chats. Save ChatGPT, Gemini, Claude and Grok conversations as PDF, Word, Markdown, TXT or JSON, sync to Notion, and keep them in folders with full-text search.",

  // TODO: replace with your Chrome Web Store listing URL once published.
  chromeStoreUrl: "https://chromewebstore.google.com/",

  supportEmail: "support@grabchatai.com",
  privacyEmail: "privacy@grabchatai.com",

  // TODO: legal entity details (Terms / Privacy / Contact).
  legal: {
    entityName: "GrabChatAI",
    address: "Chennai, Tamil Nadu, India",
    governingLaw: "India",
    jurisdictionCity: "Chennai",
  },

  legalLastUpdated: "November 21, 2026",
  copyrightYear: 2026,
  refundWindowDays: 7,
} as const;

export const platforms = [
  { slug: "chatgpt-exporter", name: "ChatGPT", host: "chatgpt.com" },
  { slug: "gemini-exporter", name: "Gemini", host: "gemini.google.com" },
  { slug: "claude-exporter", name: "Claude", host: "claude.ai" },
  { slug: "grok-exporter", name: "Grok", host: "grok.com" },
] as const;

export type Platform = (typeof platforms)[number];

export const exportFormats = ["PDF", "Word", "Markdown", "TXT", "JSON", "Image"] as const;

export type PlanId = "free" | "pro_monthly" | "pro_yearly";

// TODO: keep prices identical to the products created in the Dodo dashboard.
export const plans = {
  free: {
    name: "Free",
    price: "$0",
    period: "/month",
    note: "Included by default",
    features: [
      "Unlimited Markdown, TXT and JSON export",
      "PDF export — 3 per day",
      "Word export — 5 per day",
      "Notion sync — 5 per day",
      "Up to 5 folders and 20 saved prompts",
      "Title search",
    ],
  },
  pro_yearly: {
    name: "Pro Yearly",
    price: "$3.33",
    period: "/month",
    note: "Billed $39.99 per year",
    badge: "Save 33%",
    features: [
      "Unlimited PDF, Word and image export",
      "Unlimited Notion sync",
      "Bulk export whole folders",
      "Unlimited folders, tags and prompts",
      "Full-text search across every message",
      "All PDF themes, no branding",
      "Priority email support",
    ],
  },
  pro_monthly: {
    name: "Pro Monthly",
    price: "$4.99",
    period: "/month",
    note: "Billed monthly",
    features: [
      "Everything in Pro Yearly",
      "Cancel anytime",
    ],
  },
} as const;

export const mainNav = [
  { href: "/#features", label: "Features" },
  { href: "/tools", label: "Tools" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/faq", label: "FAQ" },
];

export const legalNav = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/privacy/extension", label: "Extension Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
];
