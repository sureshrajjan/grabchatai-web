import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ---------- utilities ---------- */

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- layout ---------- */

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: "white" | "muted" | "dark";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    white: "bg-surface",
    muted: "bg-slate-50",
    dark: "bg-neutral-950 text-white dark:border-y dark:border-white/10",
  };
  return (
    <section id={id} className={cx("scroll-mt-20 py-20 sm:py-24", tones[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div className={cx("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cx("text-xs font-semibold tracking-[0.18em] uppercase", dark ? "text-brand-300" : "text-brand-600")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cx("mt-3 text-3xl font-bold tracking-tight sm:text-4xl", dark ? "text-white" : "text-slate-900")}>
        {title}
      </h2>
      {intro && <p className={cx("mt-4 text-base leading-7", dark ? "text-neutral-400" : "text-slate-600")}>{intro}</p>}
    </div>
  );
}

/* ---------- buttons ---------- */

type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-60";
const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white shadow-sm shadow-brand-600/20 hover:bg-brand-700",
  dark: "bg-slate-900 text-slate-50 hover:bg-slate-800",
  outline: "border border-slate-300 bg-surface text-slate-900 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};
const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cx(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button type="button" className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  external,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
  children: ReactNode;
}) {
  const cls = buttonClass(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ---------- small pieces ---------- */

export function Pill({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "green" | "slate" }) {
  const tones = {
    brand: "bg-brand-50 text-brand-700 ring-brand-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  return (
    <span className={cx("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1", tones[tone])}>
      {children}
    </span>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("rounded-2xl border border-slate-200 bg-surface p-6", className)}>{children}</div>;
}

export function IconTile({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
        dark ? "bg-brand-500/15 text-brand-300" : "bg-brand-50 text-brand-600",
      )}
    >
      {children}
    </span>
  );
}

export function StepNumber({ n }: { n: number }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
      {String(n).padStart(2, "0")}
    </span>
  );
}

/* ---------- accordion (native, no JS) ---------- */

export type QA = { q: string; a: ReactNode };

export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-xl border border-slate-200 bg-surface px-5 open:shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 shrink-0 text-slate-400 transition group-open:rotate-180"
              aria-hidden="true"
            >
              <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <div className="pb-5 text-sm leading-6 text-slate-600">{item.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ---------- page hero for inner pages ---------- */

export function PageHero({
  badge,
  title,
  intro,
  children,
}: {
  badge?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="bg-grid relative border-b border-slate-100">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-surface" />
      <Container className="relative py-16 text-center sm:py-20">
        {badge && <div className="mb-5 flex justify-center">{badge}</div>}
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        {intro && <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{intro}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </div>
  );
}
