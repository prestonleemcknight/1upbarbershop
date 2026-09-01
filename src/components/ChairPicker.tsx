import { useEffect, useRef, useState } from 'react';
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

export function ChairPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasPhoto, setHasPhoto] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = selected === null ? null : chairRoster[selected];

  /* Bring the panel into view as soon as a barber is picked, so the details
     are never left off-screen below a tall photo. Honours reduced motion. */
  useEffect(() => {
    if (selected === null) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    panelRef.current?.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'center',
    });
  }, [selected]);

  // Escape clears the selection.
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
                aria-controls="barber-detail"
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
        </div>
      </div>

      <p className="mt-3 text-center text-[0.82rem] text-muted">
        Tap a number to see that barber.
        <span className="sm:hidden"> Swipe the photo to reach them all.</span>
        {rosterIsDemo && ' Names are placeholders until the real roster is added.'}
      </p>

      {/* The picked barber's details, directly under the photo. */}
      <div ref={panelRef} id="barber-detail" className="scroll-mt-32">
        {active && selected !== null && (
          <div className="mt-6 rounded-[6px] border border-brand/50 bg-ink-2 p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow text-brand-lift">Chair {selected + 1}</p>
                <h3 className="display-xl mt-1 text-[clamp(1.5rem,4vw,2.1rem)]">{active.name}</h3>
                {active.specialty && <p className="mt-2 text-[0.95rem] text-muted">{active.specialty}</p>}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-[4px] border border-hairline px-3 py-2 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-muted transition-colors hover:text-bone"
              >
                Close
              </button>
            </div>

            {active.bio && <p className="mt-4 max-w-prose text-[0.98rem] leading-relaxed text-bone-2">{active.bio}</p>}

            <dl className="mt-6 grid gap-5 border-t border-hairline pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={active.phone ? `tel:${active.phone}` : business.phoneHref}
                    className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-bone transition-colors hover:text-brand-lift"
                  >
                    <PhoneIcon className="h-[17px] w-[17px]" />
                    {active.phone ?? business.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${active.email ?? business.email}`}
                    className="break-all text-[1.05rem] font-semibold text-bone transition-colors hover:text-brand-lift"
                  >
                    {active.email ?? business.email}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={active.bookingUrl || bookHref}
              {...(active.bookingUrl ? { target: '_blank', rel: 'noopener noreferrer' } : bookLinkProps)}
              className="mt-6 flex min-h-[52px] w-full items-center justify-center rounded-[4px] bg-brand text-[0.85rem] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-deep sm:w-auto sm:px-10"
            >
              {bookingReady || active.bookingUrl ? 'Book on Booksy' : 'Booksy — call to book'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
