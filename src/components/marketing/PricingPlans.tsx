import Link from "next/link";
import { buttonClass, cx } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { plans, site } from "@/lib/site";
import { CheckoutButton } from "./CheckoutButton";
import { PricingAccountBar } from "./PricingAccountBar";

function Features({ items, accent }: { items: readonly string[]; accent?: boolean }) {
  return (
    <ul className="mt-7 flex-1 space-y-3 text-sm text-slate-600">
      {items.map((f) => (
        <li key={f} className="flex gap-3">
          <Icon.Check className={cx("mt-0.5 h-4 w-4 shrink-0", accent ? "text-brand-600" : "text-slate-400")} />
          {f}
        </li>
      ))}
    </ul>
  );
}

function Price({ price, period, note }: { price: string; period: string; note: string }) {
  return (
    <>
      <p className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-bold tracking-tight text-slate-900">{price}</span>
        <span className="text-slate-500">{period}</span>
      </p>
      <p className="mt-1.5 text-xs text-slate-500">{note}</p>
    </>
  );
}

/** Three cards — Free, Pro Yearly (highlighted), Pro Monthly — like the reference layout. */
export function PricingPlans() {
  const { free, pro_yearly: yearly, pro_monthly: monthly } = plans;
  return (
    <div>
      <PricingAccountBar />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-surface p-8">
          <h3 className="text-lg font-semibold text-slate-900">{free.name}</h3>
          <Price price={free.price} period={free.period} note={free.note} />
          <Features items={free.features} />
          <a href={site.chromeStoreUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "md", "mt-8 w-full")}>
            Add to Chrome
          </a>
        </div>

        <div className="relative flex flex-col rounded-3xl border border-brand-500 bg-surface p-8 shadow-xl shadow-brand-600/10 ring-1 ring-brand-500">
          <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-brand-600 to-amber-400 px-3 py-1 text-xs font-semibold text-white">
            {yearly.badge}
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{yearly.name}</h3>
          <Price price={yearly.price} period={yearly.period} note={yearly.note} />
          <Features items={yearly.features} accent />
          <div className="mt-8">
            <CheckoutButton plan="pro_yearly" label="Get Pro Yearly" />
          </div>
        </div>

        <div className="flex flex-col rounded-3xl border border-slate-200 bg-surface p-8">
          <h3 className="text-lg font-semibold text-slate-900">{monthly.name}</h3>
          <Price price={monthly.price} period={monthly.period} note={monthly.note} />
          <Features items={monthly.features} accent />
          <div className="mt-8">
            <CheckoutButton plan="pro_monthly" label="Get Pro Monthly" variant="dark" />
          </div>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-500">
        Prices in USD. Taxes are calculated at checkout. Subscriptions renew automatically until cancelled. Payments are
        processed by Dodo Payments, our Merchant of Record. By upgrading you agree to our{" "}
        <Link href="/terms" className="underline hover:text-slate-700">Terms of Service</Link> and{" "}
        <Link href="/refund-policy" className="underline hover:text-slate-700">Refund Policy</Link>.
      </p>
    </div>
  );
}
