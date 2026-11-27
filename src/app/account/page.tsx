import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Container } from "@/components/ui";
import { AccountBilling } from "@/components/auth/AccountBilling";
import { getEntitlement, type Entitlement } from "@/lib/entitlement";

export const metadata: Metadata = {
  title: "Account & billing",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Account & billing</h1>
        <p className="mt-3 text-slate-600">Your plan, invoices and subscription settings.</p>
        {/* Reads the session, so it streams in behind the boundary (Cache Components). */}
        <Suspense fallback={<div className="mt-8 h-48 animate-pulse rounded-2xl bg-slate-100" aria-hidden="true" />}>
          <Billing />
        </Suspense>
      </div>
    </Container>
  );
}

async function Billing() {
  const { userId } = await auth();
  if (!userId) redirect(`/signin?redirect_url=${encodeURIComponent("/account")}`);

  let entitlement: Entitlement | null = null;
  try {
    entitlement = await getEntitlement(userId);
  } catch (err) {
    console.error("[account] entitlement failed", { userId, err });
  }
  return <AccountBilling initial={entitlement} />;
}
