"use client";

import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo, useRef, useState } from "react";
import { Button, cx } from "@/components/ui";
import { Icon } from "@/components/ui/icons";

const SAMPLE = `# Weekly AI research notes

Exported from an AI chat with **GrabChatAI**.

## Key takeaways

1. Keep prompts short and specific
2. Ask for structured output
3. Review and verify every answer

| Model   | Best for          |
| ------- | ----------------- |
| Model A | Long documents    |
| Model B | Coding questions  |

\`\`\`js
const summary = notes.filter(n => n.important);
\`\`\`

> Tip: paste your own Markdown here, or upload a .md file.
`;

type Mode = "pdf" | "word";

/** Basic escaping for the document title we inject into generated HTML. */
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Sanitize rendered Markdown (DOMPurify needs the DOM, so skip on the server for the built-in sample). */
function sanitize(html: string) {
  return typeof window === "undefined" ? html : DOMPurify.sanitize(html);
}

const DOC_CSS = `
body{font-family:Georgia,'Times New Roman',serif;color:#1e293b;line-height:1.65;max-width:760px;margin:40px auto;padding:0 24px;font-size:12pt}
h1,h2,h3{font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.25}
h1{font-size:24pt;margin:0 0 12pt}h2{font-size:17pt;margin:20pt 0 8pt}h3{font-size:13pt;margin:16pt 0 6pt}
code{font-family:Consolas,Menlo,monospace;background:#f1f5f9;padding:1px 4px;border-radius:3px;font-size:10pt}
pre{background:#0f172a;color:#e2e8f0;padding:12pt;border-radius:6px;overflow:auto}pre code{background:none;color:inherit;padding:0}
table{border-collapse:collapse;width:100%;margin:10pt 0}th,td{border:1px solid #cbd5e1;padding:5pt 8pt;text-align:left}th{background:#f8fafc}
blockquote{border-left:4px solid #cbd5e1;margin:10pt 0;padding-left:12pt;color:#475569}
a{color:#f45a2d}img{max-width:100%}
@page{margin:18mm}
`;

export function MarkdownConverter({ mode }: { mode: Mode }) {
  const [source, setSource] = useState(SAMPLE);
  const [fileName, setFileName] = useState("document");
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const html = useMemo(() => sanitize(marked.parse(source, { async: false, gfm: true }) as string), [source]);

  function loadFile(file: File) {
    if (!/\.(md|markdown|txt)$/i.test(file.name)) return;
    setFileName(file.name.replace(/\.(md|markdown|txt)$/i, "") || "document");
    file.text().then(setSource);
  }

  function fullDocument() {
    return `<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(fileName)}</title><style>${DOC_CSS}</style></head><body>${html}</body></html>`;
  }

  function downloadPdf() {
    // Render into a hidden iframe and open the browser's print dialog ("Save as PDF").
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(iframe);
    const doc = iframe.contentDocument!;
    doc.open();
    doc.write(fullDocument());
    doc.close();
    iframe.onload = () => {
      iframe.contentWindow!.focus();
      iframe.contentWindow!.print();
      setTimeout(() => iframe.remove(), 1000);
    };
  }

  function downloadWord() {
    // Word opens HTML saved with a .doc extension and the msword MIME type.
    const wordHtml = fullDocument().replace(
      "<html>",
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">',
    );
    const blob = new Blob(["﻿", wordHtml], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-xl shadow-slate-900/5">
      {/* toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={fileInput}
            type="file"
            accept=".md,.markdown,.txt,text/markdown,text/plain"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
          />
          <Button variant="outline" size="sm" onClick={() => fileInput.current?.click()}>
            <Icon.Upload className="h-4 w-4" /> Upload .md
          </Button>
          <Button variant="ghost" size="sm" onClick={() => { setSource(""); setFileName("document"); }}>
            Clear
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="fname">File name</label>
          <input
            id="fname"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-36 rounded-lg border border-slate-300 bg-surface px-3 py-1.5 text-sm text-slate-800 sm:w-44"
          />
          <Button size="sm" onClick={mode === "pdf" ? downloadPdf : downloadWord} disabled={!source.trim()}>
            <Icon.Download className="h-4 w-4" /> {mode === "pdf" ? "Download PDF" : "Download Word"}
          </Button>
        </div>
      </div>

      {/* editor + preview */}
      <div className="grid md:grid-cols-2">
        <div
          className={cx("relative border-b border-slate-200 md:border-r md:border-b-0", dragging && "bg-brand-50")}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files?.[0];
            if (f) loadFile(f);
          }}
        >
          <p className="border-b border-slate-100 px-4 py-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Markdown</p>
          <label htmlFor="md-input" className="sr-only">Markdown input</label>
          <textarea
            id="md-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            placeholder="Paste Markdown here or drop a .md file…"
            className="h-[460px] w-full resize-none bg-transparent p-4 font-mono text-sm leading-6 text-slate-800 outline-none"
          />
          {dragging && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-brand-700">
              Drop your .md file
            </div>
          )}
        </div>
        <div>
          <p className="border-b border-slate-100 px-4 py-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Preview</p>
          <div className="md-preview h-[460px] overflow-y-auto p-5" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>

      <p className="border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">
        {mode === "pdf"
          ? "Your browser’s print dialog opens — choose “Save as PDF” as the destination."
          : "Downloads a .doc file that opens in Microsoft Word, Google Docs and LibreOffice."}{" "}
        Everything runs in your browser; nothing is uploaded.
      </p>
    </div>
  );
}
