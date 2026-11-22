import { Suspense, type ReactNode } from "react";
import { BrandMark } from "@/components/layout/Brand";
import { Icon } from "@/components/ui/icons";

const perks = [
  "Upgrade to Pro and manage your subscription",
  "Use the same email in the extension to unlock Pro",
  "Your chats stay on your device — we only store your email",
];

/** Brand copy beside Clerk's <SignIn> / <SignUp> card. */
export function AuthLayout({ mode, children }: { mode: "signin" | "signup"; children: ReactNode }) {
  const isSignup = mode === "signup";
  return (
    <div className="bg-grid relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-page" />
      <div className="relative grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <BrandMark size={44} />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {isSignup ? "Create your GrabChat AI account" : "Welcome back to GrabChat AI"}
          </h1>
          <p className="mt-3 text-base text-slate-500">
            {isSignup
              ? "Sign up in seconds with Google, then pick the Pro plan that suits you."
              : "Sign in to continue to your plan and subscription."}
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-600">
            {perks.map((p) => (
              <li key={p} className="flex gap-2.5">
                <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          {/* Clerk's card reads the URL, so it streams in behind a boundary. */}
          <Suspense fallback={<CardSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return <div className="h-[460px] w-full max-w-[400px] animate-pulse rounded-2xl border border-slate-200 bg-surface" aria-hidden="true" />;
}
