# HK FINCORP — Premium Financial Consultancy Website

Production-ready website for **HK FINCORP**, a pan-India financial consultancy with 24+ years of experience across loans and insurance.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** (custom luxury-finance design system: midnight navy, champagne gold, ivory)
- **Framer Motion** — subtle scroll reveals, floating hero cards, micro-interactions
- **react-hook-form + zod** — validated forms everywhere
- **lucide-react** icons

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # TypeScript check
```

## Editing Content (no code knowledge needed beyond the data files)

All editable content lives in `lib/`:

| File | Contains |
|---|---|
| `lib/constants.ts` | **Phone/WhatsApp/email placeholders**, socials, founders, nav, disclaimers |
| `lib/services.ts` | All 9 services — copy, benefits, eligibility, documents, process, FAQs |
| `lib/offers.ts` | Offers & policy updates (marked `EDIT`) |
| `lib/testimonials.ts` | Placeholder testimonials (replace with consented client quotes) |
| `lib/partners.ts` | Banking partner list |
| `lib/documents.ts` | Document checklist logic |
| `lib/chatbot.ts` | Rule-based chatbot responses |
| `lib/faq.ts` | General FAQs |

**Before go-live checklist:**

1. Phone/WhatsApp is set to +91 98111 62249 in `lib/constants.ts` and `lib/chatbot.ts` — update there if it changes.
2. Set the production domain in `lib/constants.ts` → `SITE.url` (drives sitemap, canonical URLs, JSON-LD).
3. Drop the real logo at `public/hk-logo.png` (a text-mark fallback renders until then).
4. Replace founder initial blocks with photos (`components/sections/FounderSection.tsx`, `app/about/page.tsx`).
5. Review legal pages with counsel (`/privacy-policy`, `/terms-disclaimer`).

## Lead Capture

Every form (contact, quick consultation, service pages, chatbot callback, credit score) posts to **`/api/leads`**, which currently logs to the server console. Integration hooks for email, Google Sheets, CRM, WhatsApp Business API, webhooks, and databases are stubbed in `app/api/leads/route.ts` — wire them in one place.

## API Routes

- `POST /api/leads` — central lead intake
- `POST /api/emi` — EMI calculation (`principal`, `annualRate`, `tenureMonths`)
- `POST /api/credit-score` — consent-based credit consultation request (bureau-integration-ready stub)
- `POST /api/chatbot` — rule-based responder (upgradeable to LLM without client changes)

## SEO

- Per-page metadata + canonical URLs
- JSON-LD: Organization/FinancialService (global), FAQPage (service + contact pages), BreadcrumbList (service pages)
- `app/sitemap.ts` and `app/robots.ts` auto-generate `/sitemap.xml` and `/robots.txt`
