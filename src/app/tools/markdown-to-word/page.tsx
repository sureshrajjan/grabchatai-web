import type { Metadata } from "next";
import { ToolPage } from "@/components/tools/ToolPage";
import { MarkdownConverter } from "@/components/tools/MarkdownConverter";

export const metadata: Metadata = {
  title: "Markdown to Word Converter — Free Online",
  description: "Convert Markdown (.md) to an editable Word document online for free. Keeps headings, lists, tables and code. Runs in your browser.",
};

export default function MarkdownToWordPage() {
  return (
    <ToolPage
      slug="markdown-to-word"
      title="Markdown to Word Converter"
      intro="Turn Markdown into an editable Word document with headings, lists, tables and code preserved. Free and private."
      tool={<MarkdownConverter mode="word" />}
      steps={[
        { title: "Add your Markdown", body: "Paste text into the editor or upload / drag-and-drop a .md file." },
        { title: "Review the preview", body: "Check the formatting before you download." },
        { title: "Download for Word", body: "Click Download Word to save a .doc file you can edit in Word or Google Docs." },
      ]}
      highlights={[
        { title: "Real headings", body: "Markdown headings become Word heading styles you can navigate." },
        { title: "Tables and lists", body: "Tables, numbered and bulleted lists are kept intact." },
        { title: "Opens everywhere", body: "Microsoft Word, Google Docs, Pages and LibreOffice." },
        { title: "Private", body: "Conversion happens entirely in your browser. Nothing is uploaded." },
      ]}
      faq={[
        { q: "How do I convert Markdown to Word?", a: "Paste your Markdown or upload a .md file, then click Download Word." },
        { q: "Is it free?", a: "Yes, it’s free with no sign-up." },
        { q: "Can I edit the result?", a: "Yes. The downloaded document is fully editable in Word, Google Docs and LibreOffice." },
        { q: "Why is the file .doc and not .docx?", a: "The tool produces a Word-compatible .doc in your browser without uploading your file. You can save it as .docx from Word in one step. The GrabChatAI extension exports chats as native .docx." },
        { q: "Are my files uploaded?", a: "No. Everything runs locally in your browser." },
      ]}
    />
  );
}
