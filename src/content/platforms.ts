import { platforms } from "@/lib/site";

type PlatformCopy = {
  title: string;
  metaTitle: string;
  intro: string;
  why: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faq: { q: string; a: string }[];
};

function make(name: string, host: string): PlatformCopy {
  return {
    title: `${name} Exporter`,
    metaTitle: `${name} to PDF, Word & Markdown Exporter`,
    intro: `Save ${name} conversations as PDF, Word, Markdown, TXT, JSON or images in one click — or send them to Notion. Then keep them organized in folders with full-text search.`,
    why: [
      {
        title: "Formatting fully preserved",
        body: `Code blocks, tables, images and math formulas from ${name} come out looking like the original.`,
      },
      {
        title: "Export only what matters",
        body: "Select specific messages, or save a single answer, instead of the whole thread.",
      },
      {
        title: "Handles very long chats",
        body: "GrabChatAI loads the complete conversation first, so nothing gets cut off.",
      },
      {
        title: "Faster than print-to-PDF",
        body: "Clean page breaks, readable themes and no browser UI clutter in your documents.",
      },
    ],
    steps: [
      { title: `Open a ${name} conversation`, body: `Go to ${host} and open the chat you want to save.` },
      { title: "Click Export", body: "Use the Export button that GrabChatAI adds to the page, or open the extension popup." },
      { title: "Choose a format and download", body: "Pick PDF, Word, Markdown, TXT, JSON or Image, then download or send to Notion." },
    ],
    faq: [
      {
        q: `Can I save an entire ${name} conversation?`,
        a: "Yes. Full export includes every message in order, with formatting preserved.",
      },
      {
        q: "Can I choose specific messages?",
        a: "Yes. Use Export → Select messages to tick only the messages you want.",
      },
      {
        q: `Is the ${name} exporter free?`,
        a: "Markdown, TXT and JSON exports are free and unlimited. PDF, Word and Notion have a daily free quota; Pro removes all limits.",
      },
      {
        q: `Are my ${name} conversations stored on your servers?`,
        a: "No. Exports are created locally in your browser and we don’t upload or store your conversations.",
      },
    ],
  };
}

export const platformCopy: Record<string, PlatformCopy> = Object.fromEntries(
  platforms.map((p) => [p.slug, make(p.name, p.host)]),
);
