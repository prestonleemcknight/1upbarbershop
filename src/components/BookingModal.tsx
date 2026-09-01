import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { business, bookingReady, bookHref, bookLinkProps, policies } from '../data/business';
import { buttonPrimary, buttonGhostDark, EditorNote } from './ui';
import { CloseIcon, PhoneIcon } from './Icons';
import { BookingContext } from '../lib/booking';

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    openerRef.current?.focus();
  }, []);

  // Escape closes; the page behind must not scroll while it is up.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('button,a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <BookingContext.Provider value={value}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={close}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-3xl rounded-[8px] border border-hairline bg-ink-2 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.7)] sm:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow text-brand-lift">Booking</p>
                <h2 id="booking-title" className="display-xl mt-1 text-[clamp(1.6rem,4.6vw,2.6rem)]">
                  Book an Appointment
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close booking"
                className="shrink-0 rounded-[4px] border border-hairline p-2.5 text-muted transition-colors hover:border-brand-lift hover:text-bone"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted">
              Lock in a chair ahead of time, or walk in — both work, seven days a week.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[6px] border border-brand/45 bg-brand/8 p-6">
                <h3 className="text-[1.05rem] font-extrabold text-bone">Book online</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-bone-2">
                  Pick your barber, service and time. Fastest way to guarantee a chair.
                </p>
                <a href={bookHref} {...bookLinkProps} className={`${buttonPrimary} mt-5 !min-h-[48px] !text-[0.85rem]`}>
                  {bookingReady ? 'Open Booksy' : 'Call to book'}
                </a>
              </div>

              <div className="rounded-[6px] border border-hairline bg-ink/50 p-6">
                <h3 className="text-[1.05rem] font-extrabold text-bone">Call the shop</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">
                  Talk to someone directly, ask about a service or check the wait.
                </p>
                <a href={business.phoneHref} className={`${buttonGhostDark} mt-5 !min-h-[48px] !text-[0.85rem]`}>
                  <PhoneIcon className="h-[17px] w-[17px]" />
                  {business.phoneDisplay}
                </a>
              </div>

              <div className="rounded-[6px] border border-hairline bg-ink/50 p-6">
                <h3 className="text-[1.05rem] font-extrabold text-bone">Walk in</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{policies.walkInNote}</p>
                <Link
                  to="/location"
                  onClick={close}
                  className={`${buttonGhostDark} mt-5 !min-h-[48px] !text-[0.85rem]`}
                >
                  Hours &amp; directions
                </Link>
              </div>

              <div className="rounded-[6px] border border-hairline bg-ink/50 p-6">
                <h3 className="text-[1.05rem] font-extrabold text-bone">Book a specific barber</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">
                  Tap a barber in the shop photo to call or book straight into their chair.
                </p>
                <Link to="/contact" onClick={close} className={`${buttonGhostDark} mt-5 !min-h-[48px] !text-[0.85rem]`}>
                  Meet the team
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-[6px] border border-hairline bg-ink/50 p-6">
              <h3 className="eyebrow text-muted">Before your visit</h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  'Appointments keep your wait to a minimum',
                  'Walk-ins are taken first come, first served',
                  'Turn up a few minutes early where you can',
                  policies.refunds,
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-bone-2">
                    <span aria-hidden className="mt-[0.15em] shrink-0 font-bold text-brand-lift">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {!bookingReady && (
              <EditorNote>
                No online booking link on file yet, so every booking action falls back to click-to-call. Paste the
                Booksy URL into <code>booking.url</code> in <code>src/data/business.ts</code> and all of them switch
                over at once.
              </EditorNote>
            )}
          </div>
        </div>
      )}
    </BookingContext.Provider>
  );
}
