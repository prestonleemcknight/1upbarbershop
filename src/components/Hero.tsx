import { useState } from 'react';
import { business, bookLabelLong, hours, policies, ratingInfo, reviews, reviewsReady } from '../data/business';
import { formatRange } from '../lib/hours';
import { asset } from '../lib/asset';
import { useShopStatus } from '../lib/useShopClock';
import { BookButton, buttonGhostDark } from './ui';
import { ClockIcon, PinIcon, StarIcon, WalkInIcon } from './Icons';
import { Logo } from './Logo';

/**
 * The shop floor photo. Drop the real file at this path and it appears — until
 * then the image is dropped entirely and the section falls back to flat ink,
 * which reads as a deliberate dark hero rather than a broken placeholder.
 */
const HERO_PHOTO = '/images/1up-barbershop-chairs.jpg';
const HERO_PHOTO_WEBP = '/images/1up-barbershop-chairs.webp';

/** Reads the live open/closed state after hydration; the static HTML shows general hours. */
function TodayStatus() {
  const status = useShopStatus();
  const weekdays = hours.find((h) => h.dayIndex === 1);
  const fallback = weekdays ? `Mon–Fri ${formatRange(weekdays)}` : 'Open 7 days';

  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className={`h-2 w-2 shrink-0 rounded-full ${status?.isOpen ? 'bg-emerald-400' : 'bg-muted'}`}
      />
      {status ? status.label : fallback}
    </span>
  );
}

/** Centred flourish under the headline. */
function Flourish() {
  return (
    <div aria-hidden className="mt-9 flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-[linear-gradient(90deg,transparent,var(--color-hairline))] sm:w-24" />
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-brand-lift" fill="currentColor">
        <path d="M6 0l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
      </svg>
      <span className="h-px w-16 bg-[linear-gradient(270deg,transparent,var(--color-hairline))] sm:w-24" />
    </div>
  );
}

export function Hero() {
  const [hasPhoto, setHasPhoto] = useState(true);

  return (
    /* Pulled up under the sticky header so the photo runs behind the nav, then
       padded back down so the content clears it. The header is a uniform 108px (36px promo strip + 72px nav). */
    <section
      id="top"
      className="relative isolate -mt-[108px] flex min-h-[94svh] flex-col overflow-hidden bg-ink pt-[108px]"
    >
      {/* Hero image: eager + high priority, it is the LCP element. */}
      {hasPhoto && (
        <picture>
          <source srcSet={asset(HERO_PHOTO_WEBP)} type="image/webp" />
          <img
            src={asset(HERO_PHOTO)}
            onError={() => setHasPhoto(false)}
            alt="The floor at 1UP Barbershop in San Antonio — barber chairs, stations and hexagon lighting"
            width={2000}
            height={1116}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        </picture>
      )}
      {/* Darkened so the wordmark and headline stay legible over any photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_85%_at_50%_38%,rgba(11,15,20,0.55)_0%,rgba(11,15,20,0.82)_55%,var(--color-ink)_100%)]"
      />
      <div aria-hidden className="texture-grit absolute inset-0 -z-10" />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-24 md:py-28">
        <Logo className="h-[clamp(6rem,15vw,10.5rem)] w-[clamp(6rem,15vw,10.5rem)]" title="1UP Barbershop" />

        <p className="eyebrow mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-brand-lift">
          <span>{business.neighborhood}</span>
          <span aria-hidden className="h-3 w-px bg-hairline" />
          <span>San Antonio, TX</span>
        </p>

        <h1 className="display-xl mt-5 max-w-[17ch] text-[clamp(2.3rem,6.6vw,4.6rem)]">
          Precision fades on <span className="text-brand-lift">W&nbsp;Loop&nbsp;1604</span>, seven days a week.
        </h1>

        <Flourish />

        <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <BookButton className={`${buttonGhostDark} w-full !min-h-[58px] !px-10 !text-base sm:w-auto`}>
            {bookLabelLong}
          </BookButton>
        </div>
      </div>

      {/* Local proof, kept on the first screen — it is why a neighbourhood shop converts. */}
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 sm:px-8">
        <dl className="grid gap-x-8 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="eyebrow text-muted">Address</dt>
            <dd className="mt-1.5 flex items-start gap-2 text-[0.95rem] font-semibold text-bone">
              <PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-lift" />
              <span>
                {business.address.street}
                <span className="block font-normal text-muted">
                  {business.address.locality}, {business.address.region} {business.address.postalCode}
                </span>
              </span>
            </dd>
          </div>

          <div>
            <dt className="eyebrow text-muted">Hours</dt>
            <dd className="mt-1.5 flex items-start gap-2 text-[0.95rem] font-semibold text-bone">
              <ClockIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-lift" />
              <span className="min-h-[2.6em]">
                <TodayStatus />
                <span className="block font-normal text-muted">Open 7 days a week</span>
              </span>
            </dd>
          </div>

          {policies.walkIns && (
            <div>
              <dt className="eyebrow text-muted">Walk-ins</dt>
              <dd className="mt-1.5 flex items-start gap-2 text-[0.95rem] font-semibold text-bone">
                <WalkInIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-lift" />
                <span>
                  Always welcome
                  <span className="block font-normal text-muted">Appointments available too</span>
                </span>
              </dd>
            </div>
          )}

          {/* Rating renders only when it has been verified against the live profile. */}
          {ratingInfo.verified && (
            <div>
              <dt className="eyebrow text-muted">Google rating</dt>
              <dd className="mt-1.5 flex items-start gap-2 text-[0.95rem] font-semibold text-bone">
                <StarIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-lift" />
                <span>
                  {ratingInfo.rating} out of 5
                  <span className="block font-normal text-muted">{ratingInfo.reviewCount} Google reviews</span>
                </span>
              </dd>
            </div>
          )}
        </dl>

        {/* Reviews rail — reserved inside the hero box, under the CTA. */}
        <div className="mt-8 border-t border-hairline pt-8">
          <p className="eyebrow mb-4 text-muted">What people say</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {reviews.map((review, i) => (
              <li
                key={i}
                className={`rounded-[5px] border px-4 py-4 text-[0.9rem] leading-relaxed ${
                  reviewsReady
                    ? 'border-hairline bg-ink-2/60 text-bone-2'
                    : 'border-dashed border-hairline/70 bg-ink-2/30 text-muted'
                }`}
              >
                {review.quote ? (
                  <>
                    <p className="text-bone-2">&ldquo;{review.quote}&rdquo;</p>
                    <p className="mt-2 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-brand-lift">
                      {review.author} &middot; {review.source}
                    </p>
                  </>
                ) : (
                  <p className="flex min-h-[3.5em] items-center text-[0.82rem] font-semibold uppercase tracking-[0.1em]">
                    Google review slot {i + 1}
                  </p>
                )}
              </li>
            ))}
          </ul>
          {!reviewsReady && (
            <p className="mt-3 text-[0.8rem] text-muted">
              Three real Google reviews drop straight into these slots — nothing is invented here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
