import { useState } from 'react';
import {
  chairRoster,
  chairHotspots,
  rosterIsDemo,
  business,
  bookHref,
  bookLinkProps,
  bookingReady,
} from '../data/business';
import { asset } from '../lib/asset';
import { EditorNote, Reveal } from './ui';
import { PhoneIcon } from './Icons';

/** The shop photo the markers sit on. Optional — the list below works without it. */
const SHOP_PHOTO = '/images/1up-barbershop-chairs.jpg';

function ChairIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden focusable="false">
      <rect x="14" y="5" width="20" height="7" rx="2.5" fill="currentColor" opacity="0.9" />
      <rect x="12" y="14" width="24" height="13" rx="3" fill="currentColor" />
      <rect x="7" y="21" width="6" height="4" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="35" y="21" width="6" height="4" rx="2" fill="currentColor" opacity="0.75" />
      <rect x="21.5" y="27" width="5" height="10" rx="1.5" fill="currentColor" opacity="0.8" />
      <path d="M13 43c0-3.3 4.9-6 11-6s11 2.7 11 6z" fill="currentColor" opacity="0.65" />
    </svg>
  );
}

export function ChairPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  const active = selected === null ? null : chairRoster[selected];

  return (
    <div>
      {/* The photo, with a marker on each barber. */}
      {hasPhoto && (
        <div className="relative isolate overflow-hidden rounded-[6px] border border-hairline bg-ink-2">
          <img
            src={asset(SHOP_PHOTO)}
            onError={() => setHasPhoto(false)}
            alt="The floor at 1UP Barbershop — tap a barber to see their details"
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
          <div aria-hidden className="absolute inset-0 bg-ink/25" />

          {chairRoster.map((barber, i) => {
            const spot = chairHotspots[i];
            if (!spot) return null;
            const isOpen = selected === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls="chair-detail"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[0.8rem] font-extrabold shadow-lg transition-transform hover:scale-110 focus-visible:scale-110 ${
                  isOpen
                    ? 'border-brand-lift bg-brand text-white'
                    : 'border-white/80 bg-ink/80 text-bone backdrop-blur-sm hover:bg-brand'
                }`}
              >
                <span className="sr-only">Show details for {barber.name}</span>
                <span aria-hidden>{i + 1}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* The same ten chairs as a list. Works without the photo, and is the
          reliable target on a phone where the markers get tight. */}
      <div className="mt-4 rounded-[6px] border border-hairline bg-ink-2 px-5 py-8 sm:px-8">
        <p className="eyebrow mb-6 text-center text-muted">
          {hasPhoto ? 'Or pick a chair from the list' : 'Tap a chair to meet the barber'}
        </p>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {chairRoster.map((barber, i) => {
            const isOpen = selected === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setSelected(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls="chair-detail"
                  className={`flex w-full flex-col items-center gap-2 rounded-[5px] border px-2 py-4 transition-colors ${
                    isOpen
                      ? 'border-brand bg-brand/15 text-brand-lift'
                      : 'border-hairline bg-ink/50 text-muted hover:border-brand-lift/60 hover:text-bone'
                  }`}
                >
                  <ChairIcon className="h-9 w-9" />
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.12em]">Chair {i + 1}</span>
                  <span className="text-[0.82rem] font-semibold text-bone">{barber.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detail panel — same content whichever way the barber was picked. */}
      <div id="chair-detail" hidden={!active} className="mt-4">
        {active && (
          <Reveal className="rounded-[6px] border border-brand/40 bg-ink-2 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-brand-lift">Chair {(selected ?? 0) + 1}</p>
                <h3 className="display-xl mt-1 text-[clamp(1.5rem,4vw,2.1rem)]">{active.name}</h3>
                {active.specialty && <p className="mt-2 text-[0.95rem] text-muted">{active.specialty}</p>}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-[4px] border border-hairline px-3 py-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-muted hover:text-bone"
              >
                Close
              </button>
            </div>

            {active.bio && <p className="mt-4 max-w-prose text-[0.98rem] leading-relaxed text-bone-2">{active.bio}</p>}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={active.phone ? `tel:${active.phone}` : business.phoneHref}
                className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-[4px] border border-hairline text-[0.85rem] font-bold uppercase tracking-[0.08em] text-bone hover:border-brand-lift hover:text-brand-lift"
              >
                <PhoneIcon className="h-[17px] w-[17px]" />
                {active.phone ?? business.phoneDisplay}
              </a>

              <a
                href={active.bookingUrl || bookHref}
                {...(active.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : bookLinkProps)}
                className="inline-flex min-h-[50px] items-center justify-center rounded-[4px] bg-brand text-[0.85rem] font-bold uppercase tracking-[0.08em] text-white hover:bg-brand-deep"
              >
                {bookingReady || active.bookingUrl ? 'Book on Booksy' : 'Booksy — call to book'}
              </a>
            </div>

            {active.demo && (
              <EditorNote>
                Stand-in chair. The name is a placeholder and both buttons point at the shop line and booking action —
                swap in the real barber once names, numbers and personal Booksy links are supplied.
              </EditorNote>
            )}
          </Reveal>
        )}
      </div>

      {rosterIsDemo && !active && (
        <EditorNote>
          These ten chairs are stand-ins so the click-to-open interaction can be demonstrated. Fill the{' '}
          <code>barbers</code> array in <code>src/data/business.ts</code> and the real roster replaces them
          automatically.
        </EditorNote>
      )}
    </div>
  );
}
