# GrabChatAI website

Marketing site + Dodo Payments checkout for the GrabChatAI Chrome extension. Next.js 16 (App Router), React 19, Tailwind CSS 4.

## Local development

```bash
cp .env.example .env.local   # fill in Dodo test keys + product IDs
npm install
npm run dev
```

## Project structure

- `src/lib/site.ts`: brand, emails, legal entity/address, Chrome Web Store URL, **plans and prices**, nav links
- `src/lib/tools.ts`: list of free online tools
- `src/content/`: FAQ (`faq.tsx`), docs (`docs.tsx`) and per-platform page copy (`platforms.ts`)
- `src/components/ui/`: hand-written primitives (Container, Section, Button, Accordion, icons…). No UI library.
- `src/components/layout/`: header, footer, mobile menu, docs and legal shells
- `src/components/marketing/`: install button, platform strip, feature rows, pricing, CTA, checkout button
- `src/components/mocks/`: HTML illustrations of the extension. Replace with real screenshots.
- `src/components/tools/`: Markdown to PDF / Word converter (runs entirely in the browser)

Pages: `/`, `/pricing`, `/faq`, `/docs`, `/docs/[slug]`, `/features/[slug]` (ChatGPT, Gemini, Claude, Grok), `/tools`,
`/tools/markdown-to-pdf`, `/tools/markdown-to-word`, `/about`, `/contact`, `/terms`, `/privacy`, `/privacy/extension`,
`/refund-policy`, `/checkout/success`.

## Dodo Payments setup

1. Create 2 subscription products in the Dodo dashboard (test mode first): Pro Monthly and Pro Yearly. Use the same prices as `site.ts`.
2. Put the product IDs and API key in the env vars (see `.env.example`).
3. Add the webhook endpoint `https://grabchatai.com/api/webhooks/dodo` and copy the signing secret to `DODO_PAYMENTS_WEBHOOK_KEY`.
4. When approved for live, switch to the `dodo_live_` key, live product IDs and `DODO_PAYMENTS_ENVIRONMENT=live_mode`.

Pages Dodo's verification team looks for, all linked from the footer: Pricing (`/pricing`), Terms (`/terms`), Privacy (`/privacy`), Refund & Cancellation (`/refund-policy`), Contact (`/contact`).

## Sign-in (Clerk)

Sign-in and sign-up use [Clerk](https://dashboard.clerk.com) with Google as the social provider. The Clerk pieces are:
`src/proxy.ts` (`clerkMiddleware`), `<ClerkProvider>` in `src/app/layout.tsx`, the pages
`src/app/signin/[[...signin]]` and `src/app/signup/[[...signup]]`, and `currentUser()` in `/api/checkout`.

1. Clerk dashboard → your app → **API keys**: copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into `.env.local`.
2. **SSO connections** → Google. For production, use your own Google OAuth client and add Clerk's
   *Authorized redirect URI* (shown in Clerk) in Google Cloud Console.
3. **Paths**: sign-in URL `/signin`, sign-up URL `/signup` (also set in code). After sign-in/up users land on `/pricing`.
4. Production: add the domain in Clerk (Domains) and use the `pk_live_` / `sk_live_` keys in Vercel.

Theme: Clerk's card uses the site's CSS variables (`src/components/auth/clerkAppearance.ts`), so it follows light/dark mode.

Flow: Sign in (`/signin` or `/signup`, via Clerk) → Google → back to `/pricing` → **Get Pro Yearly / Monthly** →
`POST /api/checkout` creates a Dodo subscription checkout for the signed-in email → Dodo payment page →
`/checkout/success`. Pro buttons send signed-out visitors to sign in first.

## Theme

Light/dark tokens live in `src/app/globals.css` (`:root` and `[data-theme="dark"]`). The `slate`, `brand` and `emerald`
palettes are CSS variables, so existing utilities switch automatically. `neutral` stays fixed for always-dark areas
(footer, hub). The toggle is `src/components/layout/ThemeToggle.tsx`. The site opens in light mode; dark mode is used only after a visitor picks it (saved in localStorage).

## Deploy to Vercel

1. Push this folder to a GitHub repo and import it in Vercel (framework is detected automatically).
2. Add every variable from `.env.example` under Project → Settings → Environment Variables.
3. Add the domain `grabchatai.com` under Project → Settings → Domains and update DNS at your registrar as Vercel instructs.
