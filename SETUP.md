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
| 4 | **Barber names, specialties, bios, photos, working days** | the empty `barbers` array | The section shows three clearly-marked placeholder cards. Fill the array and real profiles replace them automatically. |
| 5 | **Real customer reviews** | `reviews` array | Three cards marked `✎ REVIEW 1/2/3`. Paste real Google reviews **word for word** with the reviewer's first name. Nothing is invented. |
| 6 | **Google rating + review count** | `ratingInfo` | Not displayed at all. Check the live Google Business Profile, then set `verified: true` with the real numbers. Only then does `aggregateRating` appear in the structured data. |

## 2. Important — customers ask these constantly

| # | What's missing | Where to fix it |
|---|---|---|
| 7 | **Parking details** (own lot? shared center lot? where to walk in from) | `policies.parking` |
| 8 | **Accepted payment methods** (cash, card, Apple Pay, Cash App…) | `policies.payments` |
| 9 | **Late / grace-period policy** | `policies.latePolicy` |
| 10 | **Nearest cross street or neighbouring business** | `policies.landmark` |

Items 7–9 also appear in the FAQ as questions marked **"Needs confirming"**.
A question with an unconfirmed answer is deliberately **left out of the FAQ
schema** so Google is never fed a placeholder. Filling the policy in
`business.ts` is not enough for those three — also replace the matching answer
in `src/data/content.ts` (`faqs`) and delete its `needsInfo: true` flag.

## 3. Nice to have

| # | What's missing | Where to fix it |
|---|---|---|
| 11 | **Shop email address** (none exists yet) | `business.email` — leave empty and it stays hidden everywhere |
| 12 | **Google "write a review" link** | `business.googleReviewsUrl` — while empty, the button says "Find us on Google" and uses the Maps link |
| 13 | **Facebook / TikTok URLs** | `business.facebook`, `business.tiktok` — they only appear in `sameAs` when filled |
| 14 | **First-visit offer** | `firstVisitOffer` — the entire section is off (`active: false`). Only switch it on for a real offer |
| 15 | **Live domain** | `business.siteUrl`, plus the `canonical`, `og:url`, `og:image` and `twitter:image` tags in `index.html`, `public/robots.txt` and `public/sitemap.xml` |
| 16 | **Dates on the legal pages** | `[ADD DATE BEFORE PUBLISHING]` in `privacy.html` and `accessibility.html` |
| 17 | **Web host name** | `[CONFIRM YOUR HOST]` in `privacy.html` |
| 18 | **Physical accessibility of the shop** | `[CONFIRM AND DESCRIBE PHYSICAL ACCESSIBILITY]` in `accessibility.html` |

## 4. Photography

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

## Facts that were confirmed and are live on the site

Name · address (7807 W Loop 1604 N, San Antonio, TX 78254) · phone
(210) 708-2580 · all seven days of opening hours · walk-ins welcome ·
appointments available · Instagram · Google Maps link · service names.

## Deliberately **not** on the site

No years in business, no awards, no star rating, no review count, no invented
prices, no fake testimonials or names, no guarantees, no claimed credentials —
none of those were supplied, so none of them are stated or in the structured
data.
