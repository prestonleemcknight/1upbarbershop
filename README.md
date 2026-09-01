# 1UP Barbershop

Conversion-focused website for 1UP Barbershop — 7807 W Loop 1604 N, Shaenfield,
San Antonio, TX.

**Read [SETUP.md](./SETUP.md) first** — it lists every real business detail the
site is still waiting on (booking URL, prices, barbers, reviews, parking).

## Commands

```bash
npm install        # once
npm run dev        # local dev server, hot reload — http://localhost:5173
```

**To preview the real production build** (prerendered HTML, inlined CSS — this is
what the Lighthouse numbers below are measured against):

```bash
npm run build && npm run preview   # http://localhost:4173
```

Other commands:

```bash
npm run lint       # ESLint (typescript-eslint + react-hooks)
npm run typecheck  # tsc --noEmit
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
- **Services are a price list, not a card grid** — CSS columns balance each
  group, so no category ever ends on a half-empty cell at any width.

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
  gen-placeholders.mjs  regenerates the labeled photo placeholders
public/
  images/ fonts/ favicon.svg robots.txt sitemap.xml llms.txt
```

## Verified

- **Lighthouse** on the production build — homepage, privacy and accessibility
  pages: 100 / 100 / 100 / 100 on desktop; 99–100 / 100 / 100 / 100 on mobile.
- **axe-core**: zero violations across 12 page × breakpoint combinations
  (390 / 834 / 1280 / 1920 px), plus the open mobile menu and open lightbox.
- **No horizontal scrolling** at 320, 360, 390, 414, 480, 640, 768, 834, 1024,
  1280, 1440, 1920 and 2560 px — verified with `overflow-x: hidden` disabled so
  it cannot mask real overflow.
- **Every interactive element** is at least 44 × 44 px.
- **All 18 booking CTAs** resolve to the single centralized target in
  `src/data/business.ts`; 25 phone links all use one `tel:` number.
- **`npm run lint` and `npm run typecheck` both pass clean.**
