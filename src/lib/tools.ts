export const tools = [
  {
    slug: "markdown-to-pdf",
    name: "Markdown to PDF",
    short: "Convert .md files to clean, printable PDFs.",
    badge: ".md → PDF",
  },
  {
    slug: "markdown-to-word",
    name: "Markdown to Word",
    short: "Turn Markdown into an editable Word document.",
    badge: ".md → .doc",
  },
] as const;

export type ToolSlug = (typeof tools)[number]["slug"];
