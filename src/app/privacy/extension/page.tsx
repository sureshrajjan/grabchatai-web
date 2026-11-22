import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc } from "@/components/layout/LegalDoc";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Extension Privacy Policy",
  description: `What data the ${site.name} Chrome extension accesses, where it is stored and how it is used.`,
};

export default function ExtensionPrivacyPage() {
  const mail = <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>;
  return (
    <LegalDoc
      path="/privacy/extension"
      title="Extension Privacy Policy"
      intro={`This policy describes how the ${site.name} Chrome extension handles data. Our single purpose is to let you export, organize and reuse your own AI conversations.`}
    >
      <h2>1. Data the extension accesses</h2>
      <p>
        When you use the extension on a supported AI website (chatgpt.com, gemini.google.com, claude.ai, grok.com and
        their related domains), it reads the conversation shown on the page <strong>only to perform the action you
        request</strong> — for example generating an export, saving a chat to a folder or building your local search
        index.
      </p>

      <h2>2. Where your data is processed and stored</h2>
      <ul>
        <li><strong>Exports</strong> (PDF, Word, Markdown, TXT, JSON, image) are generated locally in your browser and saved to your computer.</li>
        <li><strong>Folders, tags, bookmarks, prompts, settings and the search index</strong> are stored locally using browser storage (<code>chrome.storage</code> and IndexedDB).</li>
        <li><strong>We do not transmit, collect or store the content of your conversations on our servers.</strong></li>
      </ul>

      <h2>3. Notion sync (optional)</h2>
      <p>
        If you connect Notion, you authorize {site.name} through Notion&apos;s official OAuth flow. The access token is
        stored locally in your browser. Chats you choose to sync are sent directly from your browser to the Notion API
        and to the pages you selected. You can disconnect at any time in the extension or in Notion → Settings →
        Connections.
      </p>

      <h2>4. License verification (Pro)</h2>
      <p>
        To check whether you have Pro, the extension sends your account email or license key and a random device
        identifier to our license API. No conversation content is included.
      </p>

      <h2>5. Permissions and why we need them</h2>
      <ul>
        <li><strong>Host access to supported AI websites</strong> — to add the Export button and sidebar and read the conversation you choose to export or save.</li>
        <li><strong>storage / unlimitedStorage</strong> — to keep your folders, prompts, settings and local search index.</li>
        <li><strong>downloads</strong> — to save exported files to your computer.</li>
        <li><strong>identity</strong> (only if you connect Notion) — to complete Notion&apos;s OAuth sign-in.</li>
      </ul>
      <p>The extension does not run on unrelated websites, does not track browsing history and contains no ads.</p>

      <h2>6. Chrome Web Store User Data Policy</h2>
      <p>
        {site.name}&apos;s use of information received from browser APIs adheres to the{" "}
        <a href="https://developer.chrome.com/docs/webstore/program-policies/limited-use" target="_blank" rel="noopener noreferrer">
          Chrome Web Store User Data Policy
        </a>
        , including the Limited Use requirements. We:
      </p>
      <ul>
        <li>do not sell or transfer user data to third parties, except as needed to provide the features you use (such as Notion sync you enable);</li>
        <li>do not use or transfer user data for purposes unrelated to the extension&apos;s single purpose;</li>
        <li>do not use or transfer user data to determine creditworthiness or for lending purposes;</li>
        <li>do not allow humans to read user data, except with your explicit consent (for example when you send us an error report), for security, or to comply with law.</li>
      </ul>

      <h2>7. Deleting your data</h2>
      <p>
        Use <strong>Settings → Data → Delete all local data</strong> in the extension, or uninstall the extension to
        remove everything stored locally. To delete license and purchase records we hold, email {mail}.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions? Email {mail}. See also our main <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalDoc>
  );
}
