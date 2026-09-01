# Competitive research — 1UP Barbershop

Researched September 2026 for 1UP Barbershop, 7807 W Loop 1604 N, San Antonio TX 78254.

> **How solid is this?** Everything below came from **web search results only.** The
> research session could not open any competitor website — outbound fetching to
> external domains is blocked by the environment's egress policy. So prices and
> facts here are *directionally* right and useful for positioning, but none of them
> were read off the competitor's own page. **Do not quote any of it publicly**, and
> re-check a price before you set yours against it.
>
> The page-level teardown (layout, clicks-to-book, barber presentation, mobile
> behaviour) is still open — see [What's still missing](#whats-still-missing).

---

## 1. The competitive set — premium men's grooming

These are the shops running 1UP's model: precision fades, beard work, all hair
types, walk-ins plus appointments, presented as a premium brand rather than a
value cut. This is the group to benchmark the website and the price list against.

| Shop | Where | Prices seen in search | Site |
|---|---|---|---|
| **Matador Men's Grooming** | 14124 Culebra Rd #107 — **78254, same zip as 1UP** | Haircut $55 · Especial $58 · Cut+Shave $105 · Boys 9 & under $35 · Head shave $60 | [matadorgrooming.com/services](https://www.matadorgrooming.com/services/) |
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

## What's still missing

The page-level teardown could not be done, because no competitor page could be
opened. Still open for each of Matador, Finley's, Birds and Boardroom:

- [ ] Number of clicks from landing to a confirmed booking
- [ ] Which booking platform each one uses
- [ ] Whether individual barbers get photos, bios and their own booking links
- [ ] How prices are laid out — table, cards, tiers, or a PDF menu
- [ ] Whether walk-in policy appears above the fold
- [ ] Mobile behaviour: sticky CTA, tap target sizes, page weight
- [ ] Whether they show real Google ratings and how

**To close this out:** open those sites in a browser and paste the pages (or
screenshots) into a session. The comparison against 1UP's build can then be done
properly and this section replaced with findings.
