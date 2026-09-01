# 1UP Barbershop

Conversion-focused website for 1UP Barbershop — 7807 W Loop 1604 N, Shaenfield,
San Antonio, TX.

**Read [SETUP.md](./SETUP.md) first** — it lists every real business detail the
site is still waiting on (booking URL, prices, barbers, reviews, parking).

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # typecheck → build → prerender → inline CSS, into dist/
npm run preview    # serve the production build
npm run typecheck
```

## Editing the content

Nearly everything is in **`src/data/business.ts`** (business facts, hours,
policies, services, barbers, gallery, reviews) and **`src/data/content.ts`**
(trust bar, differentiators, FAQ). Components read from those objects, so a
price or an FAQ answer is changed in exactly one place — including the
structured data, which is generated from the same objects at build time.

## How it's built

- **React 19 + TypeScript + Tailwind CSS v4**, bundled by Vite. No UI kit, no
  icon package, no animation library — the icons are inline SVG and the reveals
  are a few lines of CSS driven by one `IntersectionObserver`.
- **Prerendered.** `scripts/prerender.mjs` renders the page to static HTML at
  build time and the client hydrates it, so the content is in the HTML for
  crawlers and paints before JavaScript runs. The same script inlines the single
  stylesheet to remove the only render-blocking request.
- **Self-hosted variable font** (Archivo, latin subset, 88 kB) — no third-party
  font request.
- **JSON-LD** (`BarberShop` + `FAQPage`) is generated from the data objects in
  `src/lib/seo.ts` and injected into `index.html` by a small Vite plugin, so the
  markup can't drift from what the page says. Unverified facts — rating, price
  range, booking action — are omitted rather than guessed.
- **Placeholder discipline.** Missing business details render as visible amber
  `✎` markers, and unanswered FAQs are excluded from the FAQ schema.

## Structure

```
index.html            homepage shell + meta/OG tags
privacy.html          static page, shares the same stylesheet
accessibility.html    static page, shares the same stylesheet
src/
  data/               business.ts (facts) · content.ts (copy)
  lib/                hours.ts (open/closed, formatting) · seo.ts (JSON-LD)
  components/         one file per page section, plus ui.tsx and Icons.tsx
scripts/
  prerender.mjs       static render + CSS inlining
  gen-placeholders.mjs  regenerates the labelled photo placeholders
public/
  images/ fonts/ favicon.svg robots.txt sitemap.xml llms.txt
```

## Verified

Lighthouse on the production build: **Performance 100 / Accessibility 100 /
Best Practices 100 / SEO 100** on desktop, **99 / 100 / 100 / 100** on mobile,
for the homepage and both legal pages. axe-core reports zero violations at 390 px
and 1350 px. No horizontal scrolling from 320 px up; every link, button and
disclosure is at least 44 × 44 px.
