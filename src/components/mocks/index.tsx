/**
 * Illustrative product mock-ups built in HTML/CSS. Replace with real
 * screenshots of the extension once it is ready (Dodo reviewers compare the
 * site to the actual product).
 */
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icons";
import { PlatformLogo } from "@/components/ui/brand-logos";

export function BrowserFrame({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-xl shadow-slate-900/[0.07] ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 truncate rounded-md bg-surface px-2.5 py-0.5 text-[11px] text-slate-400 ring-1 ring-slate-200">{url}</span>
      </div>
      {children}
    </div>
  );
}

function ChatLines() {
  return (
    <div className="space-y-3 p-5">
      <div className="ml-auto w-2/3 rounded-2xl rounded-tr-sm bg-slate-100 px-4 py-2.5 text-xs text-slate-600">
        Explain how to structure a SaaS pricing page.
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-11/12 rounded bg-slate-100" />
        <div className="h-2.5 w-10/12 rounded bg-slate-100" />
        <div className="h-2.5 w-9/12 rounded bg-slate-100" />
        <div className="mt-3 rounded-lg bg-neutral-900 p-3 font-mono text-[10px] leading-4 text-neutral-300">
          <span className="text-orange-300">const</span> plans = [&apos;Free&apos;, &apos;Pro&apos;];
        </div>
        <div className="h-2.5 w-8/12 rounded bg-slate-100" />
      </div>
    </div>
  );
}

/** Popup with export format grid — the hero / feature 01 visual. */
export function ExportPopupMock() {
  const formats = [
    { f: "PDF", active: true },
    { f: "Word" },
    { f: "Markdown" },
    { f: "TXT" },
    { f: "JSON" },
    { f: "Image" },
  ];
  return (
    <BrowserFrame url="chatgpt.com/c/pricing-page">
      <div className="relative grid min-h-[300px] grid-cols-1 sm:grid-cols-[1fr_250px]">
        <ChatLines />
        <div className="border-t border-slate-100 bg-surface p-4 sm:border-t-0 sm:border-l">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900">Export chat</p>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">42 messages</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {formats.map(({ f, active }) => (
              <div
                key={f}
                className={`flex flex-col items-center gap-1 rounded-lg border py-2.5 text-[11px] font-semibold ${
                  active ? "border-brand-500 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600"
                }`}
              >
                <Icon.FileText className="h-4 w-4" />
                {f}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-2 text-[11px] text-slate-600">
            <label className="flex items-center justify-between">Theme <span className="font-medium text-slate-900">Light · Serif</span></label>
            <label className="flex items-center justify-between">Include timestamps <span className="h-3.5 w-6 rounded-full bg-brand-600" /></label>
          </div>
          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 py-2 text-xs font-semibold text-white">
            <Icon.Download className="h-3.5 w-3.5" /> Download PDF
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function NotionSyncMock() {
  return (
    <BrowserFrame url="claude.ai/chat/research">
      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Icon.Notion className="h-4 w-4" /> Send to Notion
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500">
          <Icon.Search className="h-3.5 w-3.5" /> Search pages…
        </div>
        <ul className="mt-3 space-y-1.5 text-xs">
          {["📚 Research notes", "🧪 Experiments", "📝 Blog drafts"].map((p, i) => (
            <li key={p} className={`flex items-center justify-between rounded-lg px-3 py-2 ${i === 0 ? "bg-brand-50 font-medium text-brand-700" : "text-slate-600"}`}>
              {p}
              {i === 0 && <Icon.Check className="h-3.5 w-3.5" />}
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
          ✓ Synced with headings, code blocks and tables
        </div>
      </div>
    </BrowserFrame>
  );
}

export function SelectMock() {
  const msgs = [
    { t: "What are the best onboarding emails?", on: true, user: true },
    { t: "Here are 5 onboarding email templates…", on: true },
    { t: "Make them shorter.", on: false, user: true },
    { t: "Sure — shorter versions below…", on: true },
  ];
  return (
    <BrowserFrame url="gemini.google.com/app">
      <div className="p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-900">3 of 4 messages selected</span>
          <span className="text-brand-600">Select all</span>
        </div>
        <ul className="mt-3 space-y-2">
          {msgs.map((m) => (
            <li key={m.t} className={`flex items-start gap-3 rounded-xl border p-3 text-xs ${m.on ? "border-brand-200 bg-brand-50/50" : "border-slate-200 opacity-60"}`}>
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded ${m.on ? "bg-brand-600 text-white" : "border border-slate-300"}`}>
                {m.on && <Icon.Check className="h-3 w-3" />}
              </span>
              <span className={m.user ? "font-medium text-slate-900" : "text-slate-600"}>{m.t}</span>
            </li>
          ))}
        </ul>
      </div>
    </BrowserFrame>
  );
}

export function FoldersMock() {
  const folders = [
    { n: "Client work", c: 24, color: "text-brand-600", open: true },
    { n: "Research", c: 12, color: "text-emerald-600" },
    { n: "Code snippets", c: 31, color: "text-orange-500" },
  ];
  return (
    <BrowserFrame url="grok.com">
      <div className="p-5">
        <div className="flex items-center gap-2 rounded-lg border border-brand-300 px-3 py-2 text-xs ring-4 ring-brand-50">
          <Icon.Search className="h-3.5 w-3.5 text-brand-600" />
          <span className="text-slate-900">webhook retry</span>
          <span className="ml-auto text-slate-400">5 hits</span>
        </div>
        <ul className="mt-4 space-y-1.5 text-xs">
          {folders.map((f) => (
            <li key={f.n}>
              <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${f.open ? "bg-slate-100 font-medium text-slate-900" : "text-slate-600"}`}>
                <span className="flex items-center gap-2">
                  <Icon.Folder className={`h-4 w-4 ${f.color}`} /> {f.n}
                </span>
                <span className="text-slate-400">{f.c}</span>
              </div>
              {f.open && (
                <ul className="mt-1 ml-8 space-y-1 border-l border-slate-200 pl-3 text-slate-500">
                  <li className="flex justify-between py-1">Payment webhooks <span className="rounded-full bg-brand-50 px-1.5 text-[10px] text-brand-700">ChatGPT</span></li>
                  <li className="flex justify-between py-1">Queue design <span className="rounded-full bg-orange-100 px-1.5 text-[10px] text-orange-700">Claude</span></li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </BrowserFrame>
  );
}

export function PromptsMock() {
  return (
    <BrowserFrame url="chatgpt.com">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Icon.Sparkles className="h-4 w-4 text-brand-600" /> Prompt library
          </span>
          <span className="text-xs text-slate-400">/ to insert</span>
        </div>
        <ul className="mt-3 space-y-2 text-xs">
          {[
            ["Summarize for {audience}", "Writing"],
            ["Review this code for bugs", "Coding"],
            ["Turn notes into a blog post", "Content"],
          ].map(([t, c], i) => (
            <li key={t} className={`flex items-center justify-between rounded-xl border p-3 ${i === 0 ? "border-brand-300 bg-brand-50/60" : "border-slate-200"}`}>
              <span className="font-medium text-slate-800">{t}</span>
              <span className="text-slate-400">{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-xs text-white">
          <span className="flex items-center gap-2"><Icon.Bookmark className="h-3.5 w-3.5" /> 12 bookmarked answers</span>
          <span className="text-slate-400">Open →</span>
        </div>
      </div>
    </BrowserFrame>
  );
}

export function QuickNavMock() {
  const apps = ["ChatGPT", "Gemini", "Claude", "Grok"] as const;
  return (
    <BrowserFrame url="any website">
      <div className="p-5">
        <p className="text-xs font-semibold text-slate-900">Jump to an AI</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {apps.map((a, i) => (
            <div key={a} className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-medium ${i === 2 ? "border-brand-300 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-700"}`}>
              <PlatformLogo name={a} className="h-5 w-5 text-slate-900" />
              {a}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400">
          Shortcut <kbd className="rounded border border-slate-300 px-1">Alt</kbd> + <kbd className="rounded border border-slate-300 px-1">K</kbd>
        </p>
      </div>
    </BrowserFrame>
  );
}

/** Hub diagram for the dark benefits panel. */
export function HubMock() {
  const nodes = ["ChatGPT", "Gemini", "Claude", "Grok"] as const;
  const outputs = ["PDF", "Word", "Markdown", "Notion"];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <ul className="space-y-2">
          {nodes.map((n) => (
            <li key={n} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-200">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm text-neutral-900">
                <PlatformLogo name={n} className="h-3.5 w-3.5" />
              </span>
              {n}
            </li>
          ))}
        </ul>
        <div className="flex flex-col items-center gap-2">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-brand-400" />
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-amber-400 text-white shadow-lg shadow-brand-600/30">
            <Icon.Download className="h-6 w-6" />
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-brand-300 uppercase">GrabChatAI</span>
        </div>
        <ul className="space-y-2">
          {outputs.map((n) => (
            <li key={n} className="rounded-lg border border-orange-400/30 bg-orange-500/10 px-3 py-2 text-center text-xs font-medium text-orange-200">{n}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
