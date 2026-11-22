import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function Page() {
  return (
    <AuthLayout mode="signin">
      <SignIn path="/signin" routing="path" signUpUrl="/signup" fallbackRedirectUrl="/pricing" />
    </AuthLayout>
  );
}
