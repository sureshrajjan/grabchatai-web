import Link from "next/link";
import type { ReactNode } from "react";
import { StepNumber } from "@/components/ui";

/** Numbered feature block with text on one side and a visual on the other. */
export function FeatureRow({
  n,
  title,
  body,
  link,
  visual,
  reverse,
}: {
  n: number;
  title: string;
  body: string;
  link?: { href: string; label: string };
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16">
      <div className={reverse ? "md:order-2" : ""}>
        <StepNumber n={n} />
        <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-7 text-slate-600">{body}</p>
        {link && (
          <Link href={link.href} className="mt-5 inline-block text-sm font-semibold text-brand-600 hover:underline">
            {link.label} →
          </Link>
        )}
      </div>
      <div className={reverse ? "md:order-1" : ""}>{visual}</div>
    </div>
  );
}
