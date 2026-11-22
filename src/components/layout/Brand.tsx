import Link from "next/link";

/**
 * GrabChat AI mark — orange speech bubble with a download arrow (matches the Chrome extension).
 * Keep in sync with src/app/icon.svg and public/logo.svg.
 */
export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <path
        d="M9 3h14a7 7 0 0 1 7 7v7a7 7 0 0 1-7 7H13.5l-6.2 5.3c-.6.5-1.5 0-1.4-.8L6.6 23.4A7 7 0 0 1 2 17v-7a7 7 0 0 1 7-7z"
        fill="#ff6b3f"
      />
      <path
        d="M16 8.5v9.5M11.6 13.6 16 18l4.4-4.4"
        fill="none"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="GrabChat AI home">
      <BrandMark />
      <span className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-slate-900"}`}>
        GrabChat <span className={`font-normal ${dark ? "text-neutral-500" : "text-slate-400"}`}>AI</span>
      </span>
    </Link>
  );
}
