import Link from "next/link";
import { PlatformLogo } from "@/components/ui/brand-logos";
import { platforms, type Platform } from "@/lib/site";

export function PlatformBadge({ platform, size = "md" }: { platform: Platform; size?: "md" | "lg" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-surface text-slate-900 ring-1 ring-slate-200 ${
        size === "lg" ? "h-16 w-16 text-[2.25rem] shadow-sm" : "h-8 w-8 text-lg"
      }`}
    >
      <PlatformLogo name={platform.name} />
    </span>
  );
}

/** "Supports" strip with each platform's official logo. */
export function PlatformStrip() {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">Supports your favorite AI</p>
      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {platforms.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/features/${p.slug}`}
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-surface py-1.5 pr-4 pl-1.5 shadow-sm transition hover:border-brand-200"
            >
              <PlatformBadge platform={p} />
              <span className="text-sm font-medium text-slate-700">{p.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
