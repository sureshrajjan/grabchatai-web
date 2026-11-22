"use client";

import { useState } from "react";
import { buttonClass } from "@/components/ui";
import type { PlanId } from "@/lib/site";
import { signInUrl, useAccount } from "@/lib/useAccount";

/**
 * Pro plan button. Signed out → Clerk sign-in (returns to /pricing).
 * Signed in → creates a Dodo subscription checkout and redirects to the payment page.
 */
export function CheckoutButton({
  plan,
  label,
  variant = "primary",
}: {
  plan: Exclude<PlanId, "free">;
  label: string;
  variant?: "primary" | "dark";
}) {
  const { status } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    if (status !== "authenticated") {
      window.location.href = signInUrl("/pricing");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string; code?: string };
      if (res.status === 401) {
        window.location.href = signInUrl("/pricing");
        return;
      }
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error ?? "Unable to start checkout.");
      window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to start checkout.");
      setLoading(false);
    }
  }

  const text = loading
    ? "Redirecting to checkout…"
    : status === "unauthenticated"
      ? "Sign in to upgrade"
      : label;

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={loading || status === "loading"}
        className={buttonClass(variant, "md", "w-full")}
      >
        {loading && (
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
            <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )}
        {text}
      </button>
      {error && (
        <p className="mt-2 text-center text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
