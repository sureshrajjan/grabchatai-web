import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { MarkdownConverter } from "@/components/tools/MarkdownConverter";

export const metadata: Metadata = {
  title: "Markdown to PDF Converter — Free Online",
  description: "Convert Markdown (.md) to a clean PDF online for free. Tables, code blocks and lists stay readable. Runs in your browser.",
};

export default function MarkdownToPdfPage() {
  return (
    <ToolPage
      slug="markdown-to-pdf"
      title="Markdown to PDF Converter"
      intro="Paste Markdown or upload a .md file and get a clean, readable PDF. Free, private and nothing to install."
      tool={<MarkdownConverter mode="pdf" />}
      steps={[
        { title: "Add your Markdown", body: "Paste text into the editor or upload / drag-and-drop a .md file." },
        { title: "Check the preview", body: "See exactly how headings, tables and code blocks will look." },
        { title: "Download the PDF", body: "Click Download PDF and choose “Save as PDF” in the print dialog." },
      ]}
      highlights={[
        { title: "GitHub-flavored Markdown", body: "Headings, lists, links, tables, task lists and blockquotes." },
        { title: "Code blocks", body: "Monospaced, dark-themed code blocks that stay readable in print." },
        { title: "Readable layout", body: "Comfortable margins and typography designed for A4 and Letter." },
        { title: "Private", body: "Conversion happens entirely in your browser. Nothing is uploaded." },
      ]}
      faq={[
        { q: "How do I convert Markdown to PDF online?", a: "Paste your Markdown or upload a .md file, then click Download PDF and choose “Save as PDF” in your browser’s print dialog." },
        { q: "Is this converter free?", a: "Yes, it’s completely free with no sign-up and no watermark." },
        { q: "Does it support tables and code blocks?", a: "Yes. GitHub-flavored Markdown tables and fenced code blocks are supported." },
        { q: "Can I convert README files?", a: "Yes. Upload README.md and download it as a PDF in seconds." },
        { q: "Can I convert AI chat exports?", a: "Yes — any Markdown exported from ChatGPT, Gemini, Claude or Grok works. GrabChatAI can also export chats to PDF directly." },
        { q: "Are my files uploaded?", a: "No. Everything runs locally in your browser." },
      ]}
    />
  );
}
