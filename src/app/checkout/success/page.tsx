import type { Metadata } from "next";
import { ButtonLink, Container } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default function CheckoutSuccessPage() {
  return (
    <Container className="py-24 text-center">
      <Icon.CheckCircle className="mx-auto h-14 w-14 text-emerald-500" />
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Welcome to Pro!</h1>
      <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
        Dodo Payments is confirming your payment. You’ll get a receipt by email in a few minutes. Pro is linked to the
        account you’re signed in with: the {site.name} extension picks it up automatically and shows a <strong>Pro</strong>{" "}
        badge. If it still shows Free, click your profile picture in the extension and choose <strong>Check now</strong>.
      </p>
      <p className="mt-4 text-sm text-slate-500">
        No email? Check spam or contact{" "}
        <a href={`mailto:${site.supportEmail}`} className="font-medium text-brand-600 hover:underline">{site.supportEmail}</a>.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/docs/getting-started" variant="dark">Read the guide</ButtonLink>
        <ButtonLink href="/" variant="outline">Back home</ButtonLink>
      </div>
    </Container>
  );
}
