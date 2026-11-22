import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = { title: "Sign up", robots: { index: false } };

export default function Page() {
  return (
    <AuthLayout mode="signup">
      <SignUp path="/signup" routing="path" signInUrl="/signin" fallbackRedirectUrl="/pricing" />
    </AuthLayout>
  );
}
