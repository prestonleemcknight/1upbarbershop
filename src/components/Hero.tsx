import { useEffect, useState } from 'react';
import { business, bookLabelLong, hours, policies, ratingInfo } from '../data/business';
import { formatRange, getOpenStatus } from '../lib/hours';
import { BookButton, buttonGhostDark, buttonPrimary } from './ui';
import { ClockIcon, PinIcon, StarIcon, WalkInIcon } from './Icons';

/** Rendered after mount so the "open now" state is never stale in a cached HTML shell. */
function TodayStatus() {
  const [status, setStatus] = useState<{ label: string; isOpen: boolean } | null>(null);

  useEffect(() => {
    const update = () => {
      const s = getOpenStatus();
      setStatus({ label: s.label, isOpen: s.isOpen });
    };
    update();
    const t = window.setInterval(update, 60_000);
    return () => window.clearInterval(t);
  }, []);

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

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink">
      {/* Hero image: eager + high priority, it is the LCP element. */}
      <img
        src="/images/1up-barbershop-shop-floor-shaenfield-san-antonio.svg"
        alt="Barber chairs and stations on the floor at 1UP Barbershop in San Antonio"
        width={1600}
        height={900}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,15,20,0.72)_0%,rgba(11,15,20,0.86)_55%,var(--color-ink)_100%)]"
      />
      <div aria-hidden className="texture-grit absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24 md:pb-28 md:pt-32">
        <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-brand-lift">
          <span>Barbershop in {business.neighborhood}</span>
          <span aria-hidden className="hidden h-3 w-px bg-hairline sm:block" />
          <span>San Antonio, TX</span>
        </p>

        <h1 className="display-xl mt-5 max-w-[15ch] text-[clamp(2.6rem,10.5vw,5.6rem)]">
          Precision fades on{' '}
          <span className="text-brand-lift">W&nbsp;Loop&nbsp;1604</span>, seven days a week.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-2 sm:text-xl">
          Fades, tapers, beards, kids cuts and loc maintenance — cut clean and finished the same way
          every visit. Walk in, or lock in your chair ahead of time.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <BookButton className={`${buttonPrimary} w-full !min-h-[56px] !text-base sm:w-auto`}>
            {bookLabelLong}
          </BookButton>
          <a href="#services" className={`${buttonGhostDark} w-full !min-h-[56px] sm:w-auto`}>
            View Services
          </a>
        </div>

        <dl className="mt-12 grid gap-x-8 gap-y-5 border-t border-hairline pt-8 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
