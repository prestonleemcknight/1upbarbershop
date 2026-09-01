import { useEffect, useState } from 'react';
import { business, hours, policies } from '../data/business';
import { formatRange, getOpenStatus } from '../lib/hours';
import { BookButton, NeedsInfo, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';
import { PhoneIcon, PinIcon } from './Icons';

function HoursTable() {
  const [todayIndex, setTodayIndex] = useState<number | null>(null);

  useEffect(() => {
    setTodayIndex(getOpenStatus().today?.dayIndex ?? null);
  }, []);

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Weekly opening hours for {business.name}</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((h) => {
          const isToday = todayIndex === h.dayIndex;
          return (
            <tr key={h.day} className="border-b border-hairline last:border-0">
              <th
                scope="row"
                className={`py-3 pr-4 text-[0.95rem] font-semibold ${isToday ? 'text-brand-lift' : 'text-bone'}`}
              >
                {h.day}
                {isToday && <span className="ml-2 text-[0.7rem] font-bold uppercase tracking-[0.12em]">Today</span>}
              </th>
              <td className={`py-3 text-right text-[0.95rem] tabular-nums ${isToday ? 'text-brand-lift' : 'text-muted'}`}>
                {formatRange(h)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function LocationHours() {
  return (
    <Section id="location" tone="panel">
      <SectionHeading
        id="location"
        eyebrow="Location & Hours"
        title={<>Find the shop</>}
        lede={`On W Loop 1604 N in ${business.neighborhood}, San Antonio — open seven days a week.`}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="eyebrow text-muted">Address</h3>
          <address className="mt-3 not-italic">
            <p className="text-[1.35rem] font-extrabold leading-snug">{business.address.street}</p>
            <p className="text-[1.05rem] text-muted">
              {business.address.locality}, {business.address.region} {business.address.postalCode}
            </p>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[1.05rem] font-bold text-brand-lift hover:underline"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {business.phoneDisplay}
            </a>
          </address>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={business.googleMapsUrl} target="_blank" rel="noopener" className={`${buttonPrimary} w-full sm:w-auto`}>
              <PinIcon className="h-[18px] w-[18px]" />
              Get Directions
            </a>
            <BookButton className={`${buttonGhostDark} w-full sm:w-auto`} withArrow={false}>
              Book Ahead
            </BookButton>
          </div>

          <div className="mt-8 space-y-5 border-t border-hairline pt-8">
            {policies.walkIns && (
              <div>
                <h3 className="text-[0.95rem] font-bold">Walk-in policy</h3>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{policies.walkInNote}</p>
              </div>
            )}

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[0.95rem] font-bold">Parking</h3>
                {!policies.parking && <NeedsInfo>Confirm</NeedsInfo>}
              </div>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">
                {policies.parking || 'Add the shop’s parking details here (lot, entrance, and where to walk in from).'}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[0.95rem] font-bold">Landmark</h3>
                {!policies.landmark && <NeedsInfo>Confirm</NeedsInfo>}
              </div>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">
                {policies.landmark ||
                  'Add the nearest cross street or the neighboring business so first-timers spot the door.'}
              </p>
            </div>
          </div>
        </div>

        <div>
          {/* Linked map card instead of an embedded iframe: no third-party script, no CLS, no cookies. */}
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener"
            className="group block overflow-hidden rounded-[4px] border border-hairline bg-ink transition-colors hover:border-brand-lift"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-3">
              <svg
                viewBox="0 0 640 400"
                className="absolute inset-0 h-full w-full"
                aria-hidden
                focusable="false"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="640" height="400" fill="#141b24" />
                <g stroke="#1e2733" strokeWidth="10" strokeLinecap="round">
                  <path d="M0 118h640M0 288h640M158 0v400M462 0v400" />
                </g>
                <g stroke="#26313f" strokeWidth="4">
                  <path d="M0 60h640M0 200h640M0 350h640M80 0v400M300 0v400M560 0v400" />
                </g>
                <path d="M-30 372 C 130 350, 250 300, 340 210 S 520 70, 680 42" stroke="#1b5ce0" strokeWidth="22" fill="none" opacity="0.5" strokeLinecap="round" />
                <path d="M-30 372 C 130 350, 250 300, 340 210 S 520 70, 680 42" stroke="#6fa8ff" strokeWidth="2" strokeDasharray="14 14" fill="none" opacity="0.6" />
                <circle cx="320" cy="212" r="32" fill="#1b5ce0" opacity="0.2" />
                <circle cx="320" cy="212" r="14" fill="#0b0f14" />
                <circle cx="320" cy="212" r="7" fill="#6fa8ff" />
              </svg>
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-ink/85 px-4 py-3 text-[0.85rem] font-semibold backdrop-blur-sm">
                <span className="text-bone">{business.addressLine}</span>
                <span className="shrink-0 text-brand-lift group-hover:underline">Open in Maps</span>
              </span>
            </div>
          </a>

          <h3 className="eyebrow mt-8 text-muted">Weekly hours</h3>
          <div className="mt-3">
            <HoursTable />
          </div>
        </div>
      </div>
    </Section>
  );
}
