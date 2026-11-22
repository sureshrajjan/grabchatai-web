import { Icon } from "@/components/ui/icons";
import { ChromeLogo } from "@/components/ui/brand-logos";
import { site } from "@/lib/site";

/** Large store-style install card (Chrome Web Store). */
export function InstallButton({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={site.chromeStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex w-full max-w-sm items-center gap-4 rounded-2xl border p-4 text-left transition sm:w-auto sm:min-w-[22rem] ${
        dark
          ? "border-white/15 bg-white/5 hover:bg-white/10"
          : "border-slate-200 bg-surface shadow-sm hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
      }`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[2rem] ring-1 ring-slate-200">
        <ChromeLogo />
      </span>
      <span className="flex-1">
        <span className={`block font-semibold ${dark ? "text-white" : "text-slate-900"}`}>Chrome Extension</span>
        <span className={`mt-0.5 flex items-center gap-2 text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}>
          Works in Chrome, Edge, Brave &amp; Arc
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">Free</span>
        </span>
      </span>
      <Icon.ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-0.5" />
    </a>
  );
}
