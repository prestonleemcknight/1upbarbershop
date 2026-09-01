# Competitive research — 1UP Barbershop

Researched September 2026 for 1UP Barbershop, 7807 W Loop 1604 N, San Antonio TX 78254.

> **How solid is this?** Mixed, and it is marked per item.
>
> - **Matador** — the services and contact pages were reviewed directly from
>   screenshots. Section 5 is a real teardown and the prices in it are read off
>   their page.
> - **Everything else** — web search results only. The research session cannot open
>   external sites (egress policy), so those prices are *directionally* right for
>   positioning but were not read off the competitor's own page. **Do not quote
>   them publicly**, and re-check before setting a price against one.

---

## 1. The competitive set — premium men's grooming

These are the shops running 1UP's model: precision fades, beard work, all hair
types, walk-ins plus appointments, presented as a premium brand rather than a
value cut. This is the group to benchmark the website and the price list against.

| Shop | Where | Prices seen in search | Site |
|---|---|---|---|
| **Matador Men's Grooming** | 14124 Culebra Rd #107 — **78254, same zip as 1UP** | **Verified — see §5.** Cut $55 · Especial $58 · Facial shave $60 · Beard cleanup $35 | [matadorgrooming.com/services](https://www.matadorgrooming.com/services/) |
| **Tune Up "The Manly Salon"** | 11975 Alamo Ranch Pkwy 78253, plus 2 more SA locations | Adult cut from $33 · Kids $22 · Straight shave $35 · Beard trim $12 *(Killeen pricing)* | [tuneupkilleen.com](https://www.tuneupkilleen.com/) · [tuneuplakeway.com](https://www.tuneuplakeway.com/) |
| **Finley's Barbershop** | Austin / DFW — acquired by Boardroom | Premier Haircut from $46 · Electric Skin Fade $57 · Straight Razor Fade $65 | [finleysbarbershop.com/services](https://finleysbarbershop.com/services) |
| **Boardroom Salon for Men** | Texas-wide, upscale men's grooming | Membership $45–$60 / month | [boardroomsalon.com](https://www.boardroomsalon.com/) |
| **Birds Barbershop** | Austin — full-service benchmark | Short cut $41+ · Long cut $51+ · Skin fade $29+ | [birdsbarbershop.com/services](https://birdsbarbershop.com/services/) |

### Premium tier, different model (membership clubs)

Useful for understanding the ceiling, not direct competitors.

- **The Gents Place — The Dominion** — annual memberships $400–$2,365 —
  [thegentsplace.com](https://thegentsplace.com/service_location/sanantonio-thedominion/)
- **Scissors & Scotch — Quarry Village** — services $54+ / $74+, member rates from $28 —
  [scissorsscotch.com](https://scissorsscotch.com/locations/tx/san-antonio/quarry-village/)

---

## 2. Website benchmarks

Shops whose sites are worth studying for structure and presentation.

- **Rudy's Barbershop** — [rudysbarbershop.com](https://rudysbarbershop.com/pages/help) —
  men's cut $52 (NYC). Per-location service pages; the right pattern if 1UP ever
  opens a second shop.
- **Blind Barber** — $55 cut (Philadelphia) — [listing](https://dailybarber.com/barbers/blind-barber-philadelphia/)
- **Mustache Barbershop** — [mustachebarbershop.com](https://www.mustachebarbershop.com/)

Curated roundups that name the strongest barbershop sites (Ludlow Blunt, My
Brother's Barber, Squire, Fellow Barber, Collins & Co.):
[Colorlib](https://colorlib.com/wp/barbershop-websites/) ·
[The Salon Business](https://thesalonbusiness.com/barbershop-website-designs/) ·
[GlossGenius](https://webflow.glossgenius.com/blog/barber-website) ·
[Wix](https://www.wixfresh.com/post/barbershop-websites)

---

## 3. Immediate neighbours — the price floor

Not the target competitive set, but they set the local expectation on price and
on booking convenience, and they are what a walk-in compares against.

| Shop | Distance | Prices seen | Site |
|---|---|---|---|
| **Service Cuts Barbershop – Shaenfield** | 7915 W Loop 1604 N #109 — ~1 block | Kids from $25 · Braiding from $30 · Color from $35 | [servicecutsbarbershop.com/shaenfield](https://www.servicecutsbarbershop.com/shaenfield) |
| **Diesel Barbershop – Alamo Ranch** | 5535 W Loop 1604 N #106, 78253 — ~4 mi, same road | Diesel Plus from $45 · Razor skin fade $65 · Face shave $50 · Long hair $75 | [dieselbarbershop.com](https://www.dieselbarbershop.com/location/san-antonio-tx-alamo-ranch) |

Service Cuts is veteran-owned with first-responder discounts, complimentary
drinks and hot towels. Diesel takes walk-ins plus online booking, accepts Apple
Pay, and has arcade games.

Wider lists: [Yelp — Barber Shops, San Antonio](https://www.yelp.com/search?find_desc=Barber+Shops&find_loc=San+Antonio%2C+TX) ·
[Book of Barbering 2026 roundup](https://bookofbarbering.com/best-barber-shops-in-san-antonio/)

---

## 4. What this means for 1UP

**Price band.** Premium men's grooming in San Antonio reads as roughly **$46–$65
for a haircut**. Matador is $55 in 1UP's own zip code; Finley's straight-razor
fade is $65. The value floor nearby is $25–$33. 1UP's copy positions the shop as
premium — pricing much under $40 would work against that positioning. This is the
single most useful number still missing from the site.

**Everyone at this tier publishes a full price menu.** Not a "call for pricing"
line. The site is already built to display prices and durations the moment they
go into `src/data/business.ts`.

**Named service tiers are the differentiator worth copying as a pattern.**
Matador names its tiers (Matador, Especial, Deluxe, Toro Bravo, Espada), which
turns a price list into a brand. Use the *pattern*, never their names.

**Memberships are the retention play at this tier.** Boardroom runs $45–60/month;
Gents Place and Scissors & Scotch both sell them. Worth deciding on before the
price list is printed, because it changes how the menu is laid out.

**Where 1UP already wins:** open seven days. Diesel Alamo Ranch shows Mon–Fri
10–8; Service Cuts shows Mon–Fri 9–8. Sunday 11–5 is a genuine differentiator and
the hero already leads with it.

---

## 5. Matador teardown — reviewed directly

Source: screenshots of the Services and Contact pages, desktop, September 2026.
Home page, mobile rendering and the booking flow itself were not seen.

### Their price list, as published

| Service | Price | Upcharges shown inline |
|---|---|---|
| Matador (full-service haircut) | **$55** | — |
| Matador Especial (razor fades ½" or less, or shoulder-length) | **$58** | Shoulder-length +$2 · Extra long +$7 |
| Matador Deluxe (Haircut & Shave) | *price not captured* | — |
| Espada Head Shave | *price not captured* | — |
| Matador Facial Shave | **$60** | Steamer upgrade +$5 · Neck trim +$15 |
| Conquistador Cleanup (beard trim) | **$35** | Long beard +$5 · Mustache trim $15 |
| Conquistador Treatment (beard wash/condition/blowout) | **$40** | +$25 added to Cleanup |
| Afficionado Hair Color | **$63+** | Highlights $90+ · consultation required |
| Afficionado Beard Color | **$40** | — |
| Brazilian Blowout | **$180+** | Beard version $100 · 45–90 min |

Sections in order: Haircuts → Shaves & Beard Trims → Coloring & Treatments →
an offer (partly obscured, "$199* / $220 Value") → Book Appointment Now → Contact form.

### What they do well — worth learning from

1. **Named service tiers.** Matador, Especial, Deluxe, Espada, Conquistador,
   Afficionado. A price list becomes a brand vocabulary, and it makes the $55
   feel like a product rather than a haircut. **This is the single best idea on
   their site.** Copy the *pattern*, never their names.
2. **Descriptions that justify the price.** Every service spells out what is
   included — "neck shave, steam towel, scalp massage shampoo, blow-dry, styling,
   and a relaxing neck/shoulder massage." That is how $55 stops looking expensive.
3. **Upcharges published inline.** "+$2 shoulder length", "+$15 neck trim",
   "Mustache trim $15". No surprises at the chair, and it pre-sells the add-on.
4. **A committed visual identity.** Dark sepia photography, serif display face,
   one red accent, ornamental dividers. Consistent on every section.
5. **Gift cards in a persistent top bar.** Extra revenue line, always visible.

### Where they are weak — 1UP already beats them here

1. **The sticky nav overlaps section headings.** Confirmed on three separate
   sections: "HAIRCUTS", the "$199 / $220 Value" offer, and "Contact" are all
   partly hidden behind the nav on scroll. A promotional offer that cannot be read
   is a straight conversion loss. 1UP sets `scroll-padding-top` and every anchor
   was verified to land 88px down, clear of its 73px header.
2. **No booking action on any service.** Read a price, then hunt for the nav or
   scroll to the bottom to act on it. 1UP puts a Book action on every single
   service row — 18 of them.
3. **No durations.** Only the Brazilian Blowout shows one (45–90 min). A customer
   cannot tell whether a haircut takes 20 minutes or an hour. 1UP has a duration
   field on every service, waiting on real numbers.
4. **No phone number on the contact page.** Contact is a First Name / Last Name /
   Email / Message form with a Submit button. For a barbershop, where most people
   just want to call and ask if there is a wait, that is a real miss. 1UP has 25
   click-to-call links and a permanent Call button in the mobile bar.
5. **Four competing calls to action at once:** "Purchase Now" (gift cards),
   "Book Appointment" (nav), "Book Appointment Now" (button), and a "How Can We
   Help" chat widget. Attention is split. 1UP runs one primary action.
6. **Decoration costs layout.** The oversized scissors graphic takes roughly a
   third of the width in Haircuts, forcing that section into two columns while the
   others get three.
7. **No walk-in policy and no hours** anywhere on the services page.
8. **Typo, twice:** "Afficionado" should be "Aficionado".

### What to actually take from this

- **Name the tiers.** 1UP's services are currently generic ("Precision Fade",
  "Taper"). Giving the signature cut and the cut+beard package real names would
  do more for the brand than any design change.
- **Say what is included.** Match their level of detail once the real service
  list is settled.
- **Publish upcharges inline.** Long hair, extra length, add-ons. The site's
  service data has no field for this yet — worth adding when prices go in.
- **Price with confidence.** $55 is what the shop in your own zip code charges for
  a haircut, and they justify it entirely with description and presentation.

---

## What's still missing
Matador is done (§5). Still open for **Finley's, Birds and Boardroom**:

- [ ] Number of clicks from landing to a confirmed booking
- [ ] Which booking platform each one uses
- [ ] Whether individual barbers get photos, bios and their own booking links
- [ ] How prices are laid out — table, cards, tiers, or a PDF menu
- [ ] Whether walk-in policy appears above the fold
- [ ] Mobile behaviour: sticky CTA, tap target sizes, page weight
- [ ] Whether they show real Google ratings and how

Also still unseen for Matador: the home page, the booking flow itself, and how any
of it behaves on a phone.

**To close this out:** open those sites in a browser and paste the pages (or
screenshots) into a session, as was done for Matador.
