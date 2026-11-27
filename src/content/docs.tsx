import Link from "next/link";
import type { ReactNode } from "react";

export type Doc = { slug: string; title: string; summary: string; group: string; body: ReactNode };

export const docs: Doc[] = [
  {
    slug: "getting-started",
    group: "Basics",
    title: "Getting started",
    summary: "Install the extension and export your first chat in under a minute.",
    body: (
      <>
        <h2>1. Install the extension</h2>
        <p>
          Open the GrabChatAI page on the Chrome Web Store and click <strong>Add to Chrome</strong>. GrabChatAI also
          works in Edge, Brave, Arc and other Chromium browsers.
        </p>
        <h2>2. Pin it to your toolbar</h2>
        <p>Click the puzzle icon in your browser toolbar and pin GrabChatAI so it’s always one click away.</p>
        <h2>3. Open an AI conversation</h2>
        <p>
          Go to ChatGPT, Gemini, Claude or Grok and open any conversation. An <strong>Export</strong> button and the
          GrabChatAI sidebar appear automatically.
        </p>
        <h2>4. Export</h2>
        <p>
          Click <strong>Export</strong>, choose a format (PDF, Word, Markdown, TXT, JSON or Image) and click{" "}
          <strong>Download</strong>. That’s it.
        </p>
      </>
    ),
  },
  {
    slug: "full-page-export",
    group: "Export",
    title: "Full conversation export",
    summary: "Save an entire chat, including code, tables, images and formulas.",
    body: (
      <>
        <p>Full export saves every message in the current conversation, in order, with formatting preserved.</p>
        <ol>
          <li>Open the conversation.</li>
          <li>Click <strong>Export</strong> in the top bar or the extension popup.</li>
          <li>Choose a format and click <strong>Download</strong>.</li>
        </ol>
        <h2>Long conversations</h2>
        <p>
          GrabChatAI scrolls through and loads the complete conversation before exporting, so chats with hundreds of
          turns are captured in full. Keep the tab open until the download starts.
        </p>
      </>
    ),
  },
  {
    slug: "selective-export",
    group: "Export",
    title: "Selective export",
    summary: "Pick exactly which messages to include.",
    body: (
      <>
        <p>Selective export lets you remove noise and keep only the parts of a conversation that matter.</p>
        <ol>
          <li>Click <strong>Export → Select messages</strong>.</li>
          <li>Tick the messages you want, or use <strong>Select all</strong> and untick the rest.</li>
          <li>Choose a format and download.</li>
        </ol>
        <p>
          To save a single answer, hover over it and click the small download icon that appears next to the message.
        </p>
      </>
    ),
  },
  {
    slug: "export-formats",
    group: "Export",
    title: "Export formats",
    summary: "What each format is best for.",
    body: (
      <>
        <ul>
          <li><strong>PDF</strong> — best for sharing, printing and archiving. Choose from several themes.</li>
          <li><strong>Word (.docx)</strong> — best when you want to keep editing the content.</li>
          <li><strong>Markdown</strong> — best for notes apps such as Obsidian, and for developers.</li>
          <li><strong>TXT</strong> — plain text with no formatting.</li>
          <li><strong>JSON</strong> — structured data with roles, timestamps and content, for scripts and backups.</li>
          <li><strong>Image (PNG)</strong> — a long screenshot that’s easy to share on social media.</li>
        </ul>
        <p>
          Need to convert Markdown you already have? Try the free{" "}
          <Link href="/tools/markdown-to-pdf">Markdown to PDF</Link> and{" "}
          <Link href="/tools/markdown-to-word">Markdown to Word</Link> tools.
        </p>
      </>
    ),
  },
  {
    slug: "pdf-styles",
    group: "Export",
    title: "Customize PDF style",
    summary: "Themes, fonts, page size and what to include.",
    body: (
      <>
        <p>Open <strong>Export → PDF → Style</strong> to customize your PDF:</p>
        <ul>
          <li>Theme: Light, Dark, Sepia or Minimal</li>
          <li>Font: Sans-serif, Serif or Monospace, and font size</li>
          <li>Page size: A4 or Letter</li>
          <li>Show or hide timestamps, the AI’s thinking process and the source URL</li>
        </ul>
        <p>Your choices are remembered for next time. Additional themes and branding removal are part of Pro.</p>
      </>
    ),
  },
  {
    slug: "notion-sync",
    group: "Export",
    title: "Sync to Notion",
    summary: "Send chats to a Notion page or database.",
    body: (
      <>
        <ol>
          <li>Click <strong>Export → Notion</strong> and then <strong>Connect Notion</strong>.</li>
          <li>Approve access in Notion and choose which pages GrabChatAI may write to.</li>
          <li>Pick a destination page or database and click <strong>Send</strong>.</li>
        </ol>
        <p>
          Headings, lists, code blocks and tables are converted to native Notion blocks. You can revoke access anytime
          from Notion → Settings → Connections.
        </p>
      </>
    ),
  },
  {
    slug: "folders-and-tags",
    group: "Organize",
    title: "Folders and tags",
    summary: "Keep chats from every AI in one organized sidebar.",
    body: (
      <>
        <p>The GrabChatAI sidebar sits next to your AI chat and works the same on every supported platform.</p>
        <ul>
          <li><strong>Create a folder:</strong> click <strong>+ New folder</strong>. Drag a folder onto another to nest it.</li>
          <li><strong>Add a chat:</strong> drag a conversation into a folder, or use <strong>Save to folder</strong> in the chat menu.</li>
          <li><strong>Tags:</strong> add one or more tags to any chat to group it across folders.</li>
        </ul>
        <p>Folders and tags are stored locally in your browser.</p>
      </>
    ),
  },
  {
    slug: "search",
    group: "Organize",
    title: "Full-text search",
    summary: "Find any message across all your saved chats.",
    body: (
      <>
        <p>
          Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> (<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd> on
          Mac) or click the search box in the sidebar.
        </p>
        <p>
          Free users search chat titles. Pro users search inside every message of saved chats, across ChatGPT, Gemini,
          Claude and Grok. Results highlight the matching text and open the chat at that message.
        </p>
      </>
    ),
  },
  {
    slug: "prompt-library",
    group: "Organize",
    title: "Prompt library and bookmarks",
    summary: "Save prompts with variables and bookmark great answers.",
    body: (
      <>
        <h2>Prompts</h2>
        <p>
          Save a prompt from the sidebar or by selecting text in the chat box and clicking <strong>Save prompt</strong>.
          Use curly braces for variables, for example <code>Summarize this for {"{audience}"}</code>. Type <kbd>/</kbd>{" "}
          in the chat box to search and insert a prompt.
        </p>
        <h2>Bookmarks</h2>
        <p>
          Hover over any answer and click the bookmark icon. Open <strong>Bookmarks</strong> in the sidebar to jump back
          to the exact message.
        </p>
      </>
    ),
  },
  {
    slug: "quick-navigation",
    group: "Organize",
    title: "AI quick navigation",
    summary: "Switch between AI platforms from anywhere.",
    body: (
      <>
        <p>
          Press <kbd>Alt</kbd> + <kbd>K</kbd> on any website, or click the extension icon, to open the AI launcher.
          Choose ChatGPT, Gemini, Claude or Grok to open it in a new tab. Drag to reorder your favorites.
        </p>
      </>
    ),
  },
  {
    slug: "account-and-billing",
    group: "Account",
    title: "Account and billing",
    summary: "Activate Pro, manage your subscription and get refunds.",
    body: (
      <>
        <h2>Activate Pro</h2>
        <p>
          Pro is linked to the account you bought it with. Stay signed in to grabchatai.com in Chrome and the extension
          turns on Pro automatically (look for the <strong>Pro</strong> badge in the popup). If it still shows Free,
          click your profile picture in the extension and choose <strong>Sign in</strong> or <strong>Check now</strong>.
        </p>
        <h2>Manage or cancel</h2>
        <p>
          Sign in on grabchatai.com and open <Link href="/account">Account &amp; billing</Link> (from your profile picture).
          There you can cancel your subscription, resume it before it ends, and open invoices or change your payment
          method. After cancelling you won&apos;t be charged again, and Pro stays active until the end of the period you
          paid for. You can also use the “Manage subscription” link in your Dodo Payments receipt, or contact support.
          See the <Link href="/refund-policy">Refund Policy</Link>.
        </p>
      </>
    ),
  },
];

export const docGroups = Array.from(new Set(docs.map((d) => d.group)));

export function getDoc(slug: string) {
  return docs.find((d) => d.slug === slug);
}
