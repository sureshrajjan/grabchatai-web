import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function Page() {
  return (
    <div className="bg-grid relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 to-page" />
      <div className="relative flex w-full justify-center">
        <Suspense>
          <AuthCard mode="signin" />
        </Suspense>
      </div>
    </div>
  );
}
