import Link from "next/link";
import { Brand } from "./Brand";
import { Container } from "@/components/ui";
import { Icon } from "@/components/ui/icons";
import { legalNav, platforms, site } from "@/lib/site";
import { tools } from "@/lib/tools";

function Column({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-wider text-white uppercase">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {l.label}
              </a>
            ) : (
              <Link href={l.href} className="hover:text-white">
                {l.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Brand dark />
            <p className="mt-4 max-w-xs text-sm leading-6">
              Export, organize and reuse every important AI conversation.
            </p>
            <a href={`mailto:${site.supportEmail}`} className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
              <Icon.Mail className="h-4 w-4" />
              {site.supportEmail}
            </a>
          </div>
          <Column
            title="Install"
            links={[
              { href: site.chromeStoreUrl, label: "Chrome Web Store", external: true },
              { href: "/docs/getting-started", label: "Getting started" },
            ]}
          />
          <Column
            title="Exporters"
            links={platforms.map((p) => ({ href: `/features/${p.slug}`, label: `${p.name} Exporter` }))}
          />
          <Column
            title="Resources"
            links={[
              ...tools.map((t) => ({ href: `/tools/${t.slug}`, label: t.name })),
              { href: "/docs", label: "Docs" },
              { href: "/faq", label: "FAQ" },
              { href: "/pricing", label: "Pricing" },
            ]}
          />
          <Column
            title="Company"
            links={[
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              ...legalNav,
            ]}
          />
        </div>

        <div className="mt-12 space-y-3 border-t border-white/10 pt-6 text-xs leading-5 text-neutral-500">
          <p>
            Payments are processed by <span className="text-neutral-300">Dodo Payments</span>, our authorized reseller
            and Merchant of Record, which handles billing, taxes and invoicing for all purchases.
          </p>
          <p>
            {site.name} is an independent product and is not affiliated with, endorsed by, or sponsored by OpenAI,
            Google, Anthropic, xAI or Notion Labs. All product names are trademarks of their respective owners.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p>© {site.copyrightYear} {site.legal.entityName}. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-neutral-300">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
