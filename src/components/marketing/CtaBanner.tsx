import { Container } from "@/components/ui";
import { InstallButton } from "./InstallButton";

export function CtaBanner({
  title = "Install GrabChatAI and keep every AI answer worth saving",
  body = "Turn important conversations into documents, notes and a searchable library.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 via-surface to-brand-100/50 px-6 py-14 text-center shadow-sm sm:px-12">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">GrabChatAI</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">{body}</p>
          <div className="mt-8 flex justify-center">
            <InstallButton />
          </div>
        </div>
      </Container>
    </section>
  );
}
