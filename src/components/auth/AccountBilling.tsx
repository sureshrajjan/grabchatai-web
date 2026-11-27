"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass, Card, Pill } from "@/components/ui";
import type { Entitlement } from "@/lib/entitlement";
import { plans, site } from "@/lib/site";

function formatDate(iso: string | null) {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? null
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

async function post<T>(url: string, body: unknown = {}): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & { error?: string; entitlement?: Entitlement };
  if (!res.ok) {
    const err = new Error(data.error ?? "Something went wrong. Please try again.") as Error & { entitlement?: Entitlement };
    err.entitlement = data.entitlement;
    throw err;
  }
  return data;
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type Busy = null | "portal" | "cancel" | "resume";

/** Plan status with cancel / resume / billing-portal actions. */
export function AccountBilling({ initial }: { initial: Entitlement | null }) {
  const [ent, setEnt] = useState(initial);
  const [busy, setBusy] = useState<Busy>(null);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function run(kind: Exclude<Busy, null>, fn: () => Promise<void>) {
    setBusy(kind);
    setError(null);
    setNotice(null);
    try {
      await fn();
    } catch (e) {
      const err = e as Error & { entitlement?: Entitlement };
      if (err.entitlement) setEnt(err.entitlement);
      setError(err.message);
    } finally {
      setBusy(null);
    }
  }

  const openPortal = () =>
    run("portal", async () => {
      const { url } = await post<{ url: string }>("/api/billing-portal");
      window.location.href = url;
    });

  const changeRenewal = (action: "cancel" | "resume") =>
    run(action, async () => {
      const next = await post<Entitlement>("/api/subscription", { action });
      setEnt(next);
      setConfirming(false);
      const until = formatDate(next.until);
      setNotice(
        action === "cancel"
          ? `Your subscription is cancelled. You won't be charged again${until ? `, and Pro stays active until ${until}` : ""}.`
          : "Your subscription is active again and will renew as normal.",
      );
    });

  if (!ent) {
    return (
      <Card className="mt-8">
        <p className="text-sm text-slate-600">
          We couldn&apos;t load your plan right now. Refresh the page, or email{" "}
          <a href={`mailto:${site.supportEmail}`} className="font-medium text-brand-600 hover:underline">{site.supportEmail}</a>{" "}
          and we&apos;ll help.
        </p>
      </Card>
    );
  }

  const until = formatDate(ent.until);
  const planName = ent.plan === "free" ? plans.free.name : plans[ent.plan].name;

  return (
    <div className="mt-8 space-y-6">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Current plan</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{planName}</p>
            <p className="mt-1 text-sm text-slate-600">
              {!ent.pro
                ? "Unlimited Markdown export with daily PDF, Word and Notion limits."
                : ent.cancelled
                  ? until
                    ? `Cancelled. Pro stays active until ${until}, then your account moves to Free.`
                    : "Cancelled. Pro ends at the end of the current billing period."
                  : until
                    ? `Renews automatically on ${until}.`
                    : "Renews automatically."}
            </p>
          </div>
          {ent.pro ? (
            <Pill tone={ent.cancelled ? "slate" : "green"}>{ent.cancelled ? "Ends soon" : "Active"}</Pill>
          ) : (
            <Pill tone="slate">Free</Pill>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {!ent.pro && (
            <Link href="/pricing" className={buttonClass("primary", "md")}>
              Upgrade to Pro
            </Link>
          )}
          {ent.pro && ent.cancelled && (
            <button type="button" onClick={() => changeRenewal("resume")} disabled={busy !== null} className={buttonClass("primary", "md")}>
              {busy === "resume" && <Spinner />}
              Resume subscription
            </button>
          )}
          <button type="button" onClick={openPortal} disabled={busy !== null} className={buttonClass("outline", "md")}>
            {busy === "portal" && <Spinner />}
            Invoices & payment method
          </button>
        </div>

        {notice && (
          <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
            {notice}
          </p>
        )}
        {error && (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
      </Card>

      {ent.pro && !ent.cancelled && (
        <Card>
          <h2 className="font-semibold text-slate-900">Cancel subscription</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            You won&apos;t be charged again. Pro stays active until {until ?? "the end of the period you paid for"}, then
            your account moves to the Free plan. Your folders, prompts and exports stay on your device.
          </p>
          {!confirming ? (
            <button type="button" onClick={() => setConfirming(true)} disabled={busy !== null} className={buttonClass("outline", "md", "mt-4")}>
              Cancel subscription
            </button>
          ) : (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">Cancel your {planName} subscription?</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => changeRenewal("cancel")}
                  disabled={busy !== null}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:pointer-events-none disabled:opacity-60"
                >
                  {busy === "cancel" && <Spinner />}
                  Yes, cancel
                </button>
                <button type="button" onClick={() => setConfirming(false)} disabled={busy !== null} className={buttonClass("ghost", "md")}>
                  Keep Pro
                </button>
              </div>
            </div>
          )}
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Cancelling doesn&apos;t refund the current period. Within {site.refundWindowDays} days of a payment you can ask
            for a refund — see our <Link href="/refund-policy" className="underline hover:text-slate-700">Refund Policy</Link>.
          </p>
        </Card>
      )}
    </div>
  );
}
