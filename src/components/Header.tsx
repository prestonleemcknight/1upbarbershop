import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { business, bookLabel } from '../data/business';
import { buttonPrimary } from './ui';
import { useBooking } from '../lib/booking';
import { CloseIcon, PhoneIcon } from './Icons';
import { Logo } from './Logo';

/** Split either side of the centred mark. Booking is the blue button, not a link. */
const navLeft = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/location', label: 'Location' },
];

const navRight = [
  { href: '/contact', label: 'Contact' },
  { href: '/employment', label: 'Employment' },
  { href: '/socials', label: 'Socials' },
];

const allLinks = [...navLeft, ...navRight];

const linkClass =
  'inline-flex min-h-[44px] items-center rounded-[4px] px-3 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-bone';

/** The centred mark, used by both the desktop and the mobile row. */
function Brand({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group flex min-h-[44px] shrink-0 items-center gap-2.5 text-bone ${className}`}>
      <Logo className="h-10 w-10 shrink-0" />
      <span className="sr-only">1UP</span>{' '}
      <span className="hidden text-[0.95rem] font-extrabold uppercase tracking-[0.14em] sm:block">Barbershop</span>
    </Link>
  );
}

export function Header() {
  const { open: openBooking } = useBooking();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Keep tab focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const onFocus = (e: FocusEvent) => {
      const panel = panelRef.current;
      if (panel && e.target instanceof Node && !panel.contains(e.target) && e.target !== toggleRef.current) {
        panel.querySelector<HTMLElement>('a,button')?.focus();
      }
    };
    document.addEventListener('focusin', onFocus);
    return () => document.removeEventListener('focusin', onFocus);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-hairline bg-ink/95 backdrop-blur-md' : 'border-transparent bg-ink/70 backdrop-blur-sm'
      }`}
    >
      {/* Promo strip. Shown at every width, which also keeps the header a uniform
          108px (36 + 72) so the hero can offset by one figure. */}
      <div className="border-b border-hairline/60">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] sm:px-8">
          <p className="flex min-w-0 items-center gap-3 text-bone">
            <span className="truncate">Gift cards now available!</span>
            <Link
              to="/gift-cards"
              className="shrink-0 whitespace-nowrap text-brand-lift underline underline-offset-4 transition-colors hover:text-bone"
            >
              Purchase now
            </Link>
          </p>
          <a
            href={business.phoneHref}
            className="hidden shrink-0 items-center gap-2 text-muted transition-colors hover:text-brand-lift sm:inline-flex"
          >
            <PhoneIcon className="h-[15px] w-[15px]" />
            {business.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Desktop: nav split either side of the centred mark. */}
      <nav aria-label="Primary" className="mx-auto hidden max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-6 px-8 lg:grid">
        <ul className="flex items-center justify-start gap-1">
          {navLeft.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className={linkClass}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex h-[72px] items-center justify-center">
          <Brand />
        </div>

        <div className="flex items-center justify-end gap-1">
          <ul className="flex items-center gap-1">
            {navRight.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={openBooking}
            className={`${buttonPrimary} ml-2 !px-5 !text-[0.8rem] whitespace-nowrap`}
            aria-label={bookLabel}
          >
            Book
          </button>
        </div>
      </nav>

      {/* Mobile: mark left, actions right. */}
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:hidden">
        <Brand />
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <button type="button" onClick={openBooking} className={`${buttonPrimary} !px-5 !text-[0.8rem]`}>
              {bookLabel}
            </button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-hairline text-bone"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden focusable="false">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div id="mobile-menu" ref={panelRef} hidden={!open} className="border-t border-hairline bg-ink lg:hidden">
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {allLinks.map((link) => (
              <li key={link.href} className="border-b border-hairline/60 last:border-0">
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-bone"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="grid gap-2 py-4 sm:grid-cols-2">
            <a
              href={business.phoneHref}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-hairline text-[0.9rem] font-bold uppercase tracking-[0.08em] text-bone"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {business.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openBooking();
              }}
              className={buttonPrimary}
            >
              {bookLabel}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
