import "server-only";
import DodoPayments from "dodopayments";
import type { PlanId } from "./site";

type PaidPlan = Exclude<PlanId, "free">;

export function getDodoClient() {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;
  if (!apiKey) throw new Error("DODO_PAYMENTS_API_KEY is not set");
  return new DodoPayments({
    bearerToken: apiKey,
    environment: process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "live_mode" : "test_mode",
  });
}

/** Map each paid plan to the product ID created in the Dodo Payments dashboard. */
export function getProductId(plan: PaidPlan): string | undefined {
  const map: Record<PaidPlan, string | undefined> = {
    pro_monthly: process.env.DODO_PAYMENTS_PRODUCT_ID_MONTHLY ?? process.env.DODO_PRODUCT_PRO_MONTHLY,
    pro_yearly: process.env.DODO_PAYMENTS_PRODUCT_ID_YEARLY ?? process.env.DODO_PRODUCT_PRO_YEARLY,
  };
  return map[plan];
}

export function isPaidPlan(value: unknown): value is PaidPlan {
  return value === "pro_monthly" || value === "pro_yearly";
}
