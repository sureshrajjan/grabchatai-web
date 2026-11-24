import "server-only";
import { clerkClient } from "@clerk/nextjs/server";
import type DodoPayments from "dodopayments";
import { getDodoClient, getProductId } from "./dodo";
import type { PlanId } from "./site";

/**
 * Pro entitlement, stored on the Clerk user's privateMetadata.dodo (server-only,
 * users can't edit it). Dodo Payments is the source of truth: the webhook and a
 * daily re-sync copy each subscription's latest state here.
 */

type PaidPlan = Exclude<PlanId, "free">;
/** The fields we read; both subscriptions.retrieve and subscriptions.list return them. */
type Subscription = Pick<
  DodoPayments.Subscriptions.Subscription,
  "subscription_id" | "status" | "product_id" | "next_billing_date" | "metadata"
>;
type SubscriptionStatus = Subscription["status"];

export type SubscriptionRecord = {
  status: SubscriptionStatus;
  plan: PaidPlan | "unknown";
  /** End of the paid period (Dodo next_billing_date). */
  periodEnd: string | null;
  /** Set when the payment was fully refunded — access is removed regardless of status. */
  revoked?: boolean;
  updatedAt: string;
};

export type DodoMetadata = {
  subscriptions?: Record<string, SubscriptionRecord>;
  /** When we last re-read every subscription from Dodo. */
  syncedAt?: string;
};

export type Entitlement = {
  pro: boolean;
  plan: PaidPlan | "free";
  /** Pro is paid up to this date (renews automatically unless cancelled). */
  until: string | null;
  /** True when Pro will end at `until` instead of renewing. */
  cancelled: boolean;
  checkedAt: string;
};

/** How often /api/entitlement re-reads subscriptions from Dodo, in case a webhook was missed. */
export const SYNC_INTERVAL_MS = 24 * 60 * 60 * 1000;
const MIN_FORCED_SYNC_MS = 60 * 1000;

function planFor(productId: string): PaidPlan | "unknown" {
  if (productId === getProductId("pro_yearly")) return "pro_yearly";
  if (productId === getProductId("pro_monthly")) return "pro_monthly";
  return "unknown";
}

function toRecord(sub: Subscription, revoked?: boolean): SubscriptionRecord {
  return {
    status: sub.status,
    plan: planFor(sub.product_id),
    periodEnd: sub.next_billing_date ?? null,
    ...(revoked ? { revoked: true } : {}),
    updatedAt: new Date().toISOString(),
  };
}

/** Does this subscription give Pro right now? */
function grantsPro(rec: SubscriptionRecord, now: number) {
  if (rec.revoked) return false;
  if (rec.status === "active") return true;
  // Cancelled: they keep what they already paid for.
  if (rec.status === "cancelled" && rec.periodEnd) return Date.parse(rec.periodEnd) > now;
  return false;
}

export function computeEntitlement(meta: DodoMetadata | undefined, now = Date.now()): Entitlement {
  const granting = Object.values(meta?.subscriptions ?? {}).filter((r) => grantsPro(r, now));
  const checkedAt = new Date(now).toISOString();
  if (granting.length === 0) return { pro: false, plan: "free", until: null, cancelled: false, checkedAt };

  // With several subscriptions, report the one that lasts longest.
  const best = granting.reduce((a, b) => (Date.parse(b.periodEnd ?? "") > Date.parse(a.periodEnd ?? "") ? b : a));
  return {
    pro: true,
    plan: best.plan === "unknown" ? "pro_monthly" : best.plan,
    until: best.periodEnd,
    cancelled: !granting.some((r) => r.status === "active"),
    checkedAt,
  };
}

// ---------- Clerk storage ----------

export async function readDodoMetadata(userId: string): Promise<{ meta: DodoMetadata; email: string | null }> {
  const user = await (await clerkClient()).users.getUser(userId);
  return {
    meta: (user.privateMetadata?.dodo as DodoMetadata | undefined) ?? {},
    email: user.primaryEmailAddress?.emailAddress ?? null,
  };
}

/** Deep-merges into privateMetadata.dodo, so concurrent updates to different subscriptions don't clobber each other. */
async function writeDodoMetadata(userId: string, patch: DodoMetadata) {
  await (await clerkClient()).users.updateUserMetadata(userId, { privateMetadata: { dodo: patch } });
}

/** Find the Clerk user for a Dodo event: checkout metadata first, then the customer's email. */
export async function resolveClerkUserId(
  metadata: Record<string, string | number | boolean> | null | undefined,
  email: string | null | undefined,
) {
  const tagged = metadata?.clerk_user_id;
  if (typeof tagged === "string" && tagged) return tagged;
  if (!email) return null;
  const { data } = await (await clerkClient()).users.getUserList({ emailAddress: [email], limit: 2 });
  return data.length === 1 ? data[0].id : null;
}

// ---------- updates from Dodo ----------

function isNotFound(err: unknown) {
  return typeof err === "object" && err !== null && (err as { status?: number }).status === 404;
}

/**
 * Re-read one subscription from Dodo (never trust event order) and store it on the user.
 * Returns false when the Clerk user doesn't exist (e.g. deleted) — nothing to retry.
 */
export async function syncSubscription(userId: string, subscriptionId: string): Promise<boolean> {
  const sub = await getDodoClient().subscriptions.retrieve(subscriptionId);
  let meta: DodoMetadata;
  try {
    ({ meta } = await readDodoMetadata(userId));
  } catch (err) {
    if (isNotFound(err)) return false;
    throw err;
  }
  const revoked = meta.subscriptions?.[subscriptionId]?.revoked;
  await writeDodoMetadata(userId, { subscriptions: { [subscriptionId]: toRecord(sub, revoked) } });
  return true;
}

/** A full refund removes Pro for the subscriptions that payment paid for. */
export async function revokeForPayment(paymentId: string) {
  const payment = await getDodoClient().payments.retrieve(paymentId);
  const ids = payment.subscription_ids ?? [];
  if (ids.length === 0) return null;
  const userId = await resolveClerkUserId(payment.metadata, payment.customer?.email);
  if (!userId) return null;

  let meta: DodoMetadata;
  try {
    ({ meta } = await readDodoMetadata(userId));
  } catch (err) {
    if (isNotFound(err)) return null;
    throw err;
  }
  const patch: Record<string, SubscriptionRecord> = {};
  for (const id of ids) {
    const existing = meta.subscriptions?.[id];
    patch[id] = existing
      ? { ...existing, revoked: true, updatedAt: new Date().toISOString() }
      : { ...toRecord(await getDodoClient().subscriptions.retrieve(id)), revoked: true };
  }
  await writeDodoMetadata(userId, { subscriptions: patch });
  return userId;
}

/**
 * Re-read every subscription this user has in Dodo: ones tagged with their Clerk ID,
 * plus untagged ones under their (Clerk-verified) email. Catches missed webhooks.
 */
export async function syncAllFromDodo(userId: string, email: string | null, meta: DodoMetadata) {
  const client = getDodoClient();
  const found = new Map<string, Subscription>();

  // Already-known subscriptions (covers an email change since purchase).
  for (const id of Object.keys(meta.subscriptions ?? {})) {
    found.set(id, await client.subscriptions.retrieve(id));
  }
  if (email) {
    for await (const customer of client.customers.list({ email })) {
      if (customer.email.toLowerCase() !== email.toLowerCase()) continue;
      for await (const sub of client.subscriptions.list({ customer_id: customer.customer_id })) {
        const owner = sub.metadata?.clerk_user_id;
        if (!owner || owner === userId) found.set(sub.subscription_id, sub);
      }
    }
  }

  const subscriptions: Record<string, SubscriptionRecord> = {};
  for (const [id, sub] of found) subscriptions[id] = toRecord(sub, meta.subscriptions?.[id]?.revoked);
  const next: DodoMetadata = { subscriptions, syncedAt: new Date().toISOString() };
  await writeDodoMetadata(userId, next);
  return { ...meta, ...next, subscriptions: { ...meta.subscriptions, ...subscriptions } };
}

/**
 * The user's current entitlement. Re-syncs from Dodo when the stored copy is
 * older than a day (or was never synced); if Dodo is unreachable, the stored copy is used.
 */
export async function getEntitlement(userId: string, opts: { forceSync?: boolean } = {}): Promise<Entitlement> {
  const { meta, email } = await readDodoMetadata(userId);
  const age = meta.syncedAt ? Date.now() - Date.parse(meta.syncedAt) : Infinity;
  const stale = age > SYNC_INTERVAL_MS;
  // A forced refresh (right after checkout) is allowed at most once a minute.
  const forced = opts.forceSync && age > MIN_FORCED_SYNC_MS;
  if (!stale && !forced) return computeEntitlement(meta);
  try {
    return computeEntitlement(await syncAllFromDodo(userId, email, meta));
  } catch (err) {
    console.error("[entitlement] Dodo sync failed, using stored state", err);
    return computeEntitlement(meta);
  }
}
