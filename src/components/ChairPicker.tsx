import { useEffect, useState } from 'react';
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
import { PhoneIcon } from './Icons';

const SHOP_PHOTO = '/images/1up-barbershop-chairs.jpg';
const SHOP_PHOTO_WEBP = '/images/1up-barbershop-chairs.webp';

/** Half the popover width, used to keep it inside the photo at either edge. */
const POP_HALF = '8.5rem';

export function ChairPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  const active = selected === null ? null : chairRoster[selected];

  // Escape closes the open card.
  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  if (!hasPhoto) {
    return (
      <p className="rounded-[6px] border border-dashed border-hairline bg-ink-2 px-5 py-8 text-center text-muted">
        Shop photo not found. Add it at <code>{SHOP_PHOTO}</code> to show the team.
      </p>
    );
  }

  return (
    <div>
      {/* On a phone the photo scrolls sideways at a wider size, so the two
          closest pairs of barbers do not collapse into one tap target. */}
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="relative isolate w-[780px] overflow-hidden rounded-[6px] border border-hairline bg-ink-2 sm:w-full">
          <picture>
            <source srcSet={asset(SHOP_PHOTO_WEBP)} type="image/webp" />
            <img
              src={asset(SHOP_PHOTO)}
              onError={() => setHasPhoto(false)}
              alt="The team at 1UP Barbershop, at their chairs"
              width={2000}
              height={1116}
              loading="lazy"
              decoding="async"
              className="block w-full"
            />
          </picture>

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
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className={`absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[0.7rem] font-extrabold shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all hover:z-30 hover:scale-125 focus-visible:z-30 focus-visible:scale-125 lg:h-9 lg:w-9 lg:text-[0.8rem] ${
                  isOpen
                    ? 'z-30 scale-125 border-white bg-brand text-white'
                    : 'z-10 border-white/90 bg-ink/35 text-white backdrop-blur-[1px] hover:bg-brand'
                }`}
              >
                <span className="sr-only">Show details for {barber.name}</span>
                <span aria-hidden>{i + 1}</span>
              </button>
            );
          })}

          {/* The card, anchored under its marker and clamped inside the photo. */}
          {active && selected !== null && (
            <div
              role="dialog"
              aria-label={`${active.name} details`}
              style={{
                left: `clamp(${POP_HALF}, ${chairHotspots[selected].x}%, calc(100% - ${POP_HALF}))`,
                top: `calc(${chairHotspots[selected].y}% + 1.6rem)`,
              }}
              className="absolute z-40 w-[17rem] -translate-x-1/2 rounded-[6px] border border-brand/60 bg-ink/95 p-4 shadow-[0_10px_40px_rgba(0,0,0,0.65)] backdrop-blur-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-brand-lift">
                    Chair {selected + 1}
                  </p>
                  <p className="mt-0.5 truncate text-[1.05rem] font-extrabold text-bone">{active.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="-mr-1 -mt-1 shrink-0 rounded p-1 text-muted transition-colors hover:text-bone"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden focusable="false">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                  </svg>
                </button>
              </div>

              <dl className="mt-3 space-y-2 border-t border-hairline pt-3 text-[0.82rem]">
                <div>
                  <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Phone</dt>
                  <dd className="mt-0.5">
                    <a
                      href={active.phone ? `tel:${active.phone}` : business.phoneHref}
                      className="inline-flex items-center gap-1.5 font-semibold text-bone hover:text-brand-lift"
                    >
                      <PhoneIcon className="h-[14px] w-[14px]" />
                      {active.phone ?? business.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted">Email</dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${active.email ?? business.email}`}
                      className="break-all font-semibold text-bone hover:text-brand-lift"
                    >
                      {active.email ?? business.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <a
                href={active.bookingUrl || bookHref}
                {...(active.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : bookLinkProps)}
                className="mt-4 flex min-h-[42px] items-center justify-center rounded-[4px] bg-brand text-[0.78rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-deep"
              >
                {bookingReady || active.bookingUrl ? 'Book on Booksy' : 'Booksy — call to book'}
              </a>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-[0.82rem] text-muted">
        Tap a number to see that barber.
        <span className="sm:hidden"> Swipe the photo to reach them all.</span>
        {rosterIsDemo && ' Names are placeholders until the real roster is added.'}
      </p>
    </div>
  );
}
