# 1UP Barbershop — what still needs your real information

The site is built and working. Everything below is a **real business detail that
was not supplied**, so the site either hides it or shows a visible amber
`✎ EDITOR NOTE` marker instead of making something up.

Almost everything lives in one file: **`src/data/business.ts`**.
Edit it, run `npm run build`, and the page, the JSON-LD and the FAQ schema all
update together.

---

## 1. Blocking — the site can't convert properly without these

| # | What's missing | Where to fix it | What happens right now |
|---|---|---|---|
| 1 | **Online booking URL** (Booksy / Square / Squire / Vagaro) | `booking.url` in `src/data/business.ts` | Every "Book" button falls back to click-to-call `(210) 708-2580`, and the labels read "Call to Book". The moment you paste a URL, all of them switch to the booking link, the labels become "Book Appointment", the FAQ answer changes, and a `ReserveAction` is added to the structured data. |
| 2 | **Service prices** | `price` on each service in `serviceGroups` | Each card shows an `✎ ADD PRICE` badge and an editor note above the grid. `priceRange` is kept out of the JSON-LD until at least one real price exists. |
| 3 | **Service durations** | `duration` on each service | Cards read "DURATION TBC". |
| 4 | **Barber names, specialties, bios, photos, working days** | the empty `barbers` array | The section shows three clearly-marked placeholder cards. Fill the array and real profiles replace them automatically. Instagram names the owners as **@brandowontmiss** and **@ej.fades** — their real names are still needed. Each barber now also takes an `instagram` link, which renders on their card. |
| 5 | **Real customer reviews** | `reviews` array | Three cards marked `✎ REVIEW 1/2/3`. Paste real Google reviews **word for word** with the reviewer's first name. Nothing is invented. |
| 6 | **Google rating + review count** | `ratingInfo` | Not displayed at all. Check the live Google Business Profile, then set `verified: true` with the real numbers. Only then does `aggregateRating` appear in the structured data. |

## 2. Important — customers ask these constantly

| # | What's missing | Where to fix it |
|---|---|---|
| 7 | **Parking details** (own lot? shared center lot? where to walk in from) | `policies.parking` |
| 8 | **Accepted payment methods** (cash, card, Apple Pay, Cash App…) | `policies.payments` |
| 9 | **Late / grace-period policy** | `policies.latePolicy` |
| 10 | **Nearest cross street or neighboring business** | `policies.landmark` |

Items 7–9 also appear in the FAQ as questions marked **"Needs confirming"**.
A question with an unconfirmed answer is deliberately **left out of the FAQ
schema** so Google is never fed a placeholder. Filling the policy in
`business.ts` is not enough for those three — also replace the matching answer
in `src/data/content.ts` (`faqs`) and delete its `needsInfo: true` flag.

## 3. Nice to have

| # | What's missing | Where to fix it |
|---|---|---|
| 11 | **The real logo file** | `src/components/Logo.tsx` — the circular badge there is a hand-built stand-in in the shop's colours. The script lettering in the actual logo can't be reproduced from a screenshot. Export the real mark as SVG (or a transparent PNG at 2x), drop it in `public/images/`, and swap it into that component. The same shape is repeated in `public/favicon.svg`, `privacy.html` and `accessibility.html`. |
| 12 | **Shop email address** (none exists yet) | `business.email` — leave empty and it stays hidden everywhere |
| 13 | **Google "write a review" link** | `business.googleReviewsUrl` — while empty, the button says "Find us on Google" and uses the Maps link |
| 14 | **Facebook / TikTok URLs** | `business.facebook`, `business.tiktok` — they only appear in `sameAs` when filled |
| 15 | **First-visit offer** | `firstVisitOffer` — the entire section is off (`active: false`). Only switch it on for a real offer |
| 16 | **Live domain** | `business.siteUrl`, plus the `canonical`, `og:url`, `og:image` and `twitter:image` tags in `index.html`, `public/robots.txt` and `public/sitemap.xml` |
| 17 | **Dates on the legal pages** | `[ADD DATE BEFORE PUBLISHING]` in `privacy.html` and `accessibility.html` |
| 18 | **Web host name** | `[CONFIRM YOUR HOST]` in `privacy.html` |
| 19 | **Physical accessibility of the shop** | `[CONFIRM AND DESCRIBE PHYSICAL ACCESSIBILITY]` in `accessibility.html` |

## 4. Images you need to supply

Thirteen images. Every one is currently a generated placeholder with
**PHOTO PLACEHOLDER** printed on it and a note about which shot belongs there.

| Slot | Where it appears | Suggested export | Filename to overwrite |
|---|---|---|---|
| Hero — wide shot of the shop floor / chairs | top of the page, full-bleed | 1600 × 900 (16:9) | `1up-barbershop-shop-floor-shaenfield-san-antonio` |
| Interior — station, mirrors, tools | "Why 1UP" | 1200 × 900 (4:3) | `1up-barbershop-interior-barber-chairs` |
| Skin fade, back of head | Gallery → Fades | 1000 × 1250 (4:5) | `1up-barbershop-skin-fade-san-antonio` |
| Mid taper fade, side profile | Gallery → Fades | 1000 × 1250 | `1up-barbershop-mid-taper-fade` |
| Hard part / hair design detail | Gallery → Fades | 1000 × 1250 | `1up-barbershop-hair-design-hard-part` |
| Classic scissor cut, styled | Gallery → Classic Cuts | 1000 × 1250 | `1up-barbershop-classic-scissor-cut` |
| Kids cut in the chair | Gallery → Classic Cuts | 1000 × 1250 | `1up-barbershop-kids-first-haircut` |
| Loc retwist / maintenance | Gallery → Classic Cuts | 1000 × 1250 | `1up-barbershop-loc-retwist-maintenance` |
| Beard shape-up and lineup | Gallery → Beard Work | 1000 × 1250 | `1up-barbershop-beard-shape-up-lineup` |
| Before + after transformation | Gallery → Transformations | 1000 × 1250 | `1up-barbershop-before-after-transformation` |
| Barber portrait × 3 | Meet the Barbers | 900 × 900 (1:1) | `1up-barbershop-barber-portrait-1/2/3` |

Shoot notes: portrait/4:5 for gallery work so it fills the tile without cropping
heads off; square for barber portraits; landscape for the hero. Get permission
from clients before posting their cut.

## 5. Photography — how to swap a placeholder

Every image in `public/images/` is a generated placeholder that says
**PHOTO PLACEHOLDER** on it, with a note about which shot belongs there.

To replace one:

1. Export the real photo as `.webp` (or `.jpg`) — hero around 1600 px wide,
   gallery around 1000 × 1250, portraits square around 900 × 900.
2. Save it in `public/images/` using the **same descriptive filename**
   (`1up-barbershop-skin-fade-san-antonio.webp`) — the filenames are written for
   local image search, so keep the pattern.
3. Update the `src`, `alt`, `width`, `height` and set `placeholder: false` in
   `gallery` in `src/data/business.ts`. The hero and the interior shot are
   referenced in `src/components/Hero.tsx` and `src/components/WhyUs.tsx`.
4. Write alt text that describes the *actual* photo. Once every gallery item has
   `placeholder: false`, the editor note above the grid disappears on its own.

`node scripts/gen-placeholders.mjs` regenerates the placeholders if you need
them back.

---

## Pre-publish checklist

Work top to bottom. The site is publishable from the moment section 1 is done —
everything after that makes it better.

- [ ] Paste the booking URL into `booking.url` (unblocks 18 CTAs at once)
- [ ] Fill in all 10 service prices
- [ ] Fill in all 10 service durations
- [ ] Add every barber: name, specialty, bio, working days, booking link, Instagram
      (owners are @brandowontmiss and @ej.fades — real names needed)
- [ ] Export the real logo and swap out the stand-in badge in `src/components/Logo.tsx`
- [ ] Shoot and drop in 13 photos (see section 4)
- [ ] Paste 3 real Google reviews with reviewer first names
- [ ] Verify the Google rating + review count, then set `ratingInfo.verified`
- [ ] Confirm parking
- [ ] Confirm accepted payment methods
- [ ] Confirm the late / grace-period policy
- [ ] Confirm the nearest cross street or landmark
- [ ] Clear the three `needsInfo: true` flags in `src/data/content.ts` once the
      policies above are written
- [ ] Add the shop email address (or leave blank to keep it hidden)
- [ ] Add the Google "write a review" link
- [ ] Add Facebook / TikTok URLs if the shop has them
- [ ] Point `business.siteUrl`, the canonical + OG tags in `index.html`,
      `robots.txt` and `sitemap.xml` at the live domain
- [ ] Date and finish `privacy.html` (host name) and `accessibility.html`
      (physical accessibility of the shop)
- [ ] Decide on a first-visit offer, or leave `firstVisitOffer.active` false
- [ ] Run `npm run lint && npm run typecheck && npm run build` one last time

---

## Facts that were confirmed and are live on the site

Name · address (7807 W Loop 1604 N, San Antonio, TX 78254) · phone
(210) 708-2580 · all seven days of opening hours · walk-ins welcome ·
appointments available · Instagram · Google Maps link · service names.

## Deliberately **not** on the site

No years in business, no awards, no star rating, no review count, no invented
prices, no fake testimonials or names, no guarantees, no claimed credentials —
none of those were supplied, so none of them are stated or in the structured
data.
