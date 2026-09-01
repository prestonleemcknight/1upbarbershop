import { useEffect, useRef, useState } from 'react';
import { business, bookLabel } from '../data/business';
import { BookButton, buttonPrimary } from './ui';
import { CloseIcon, PhoneIcon } from './Icons';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#barbers', label: 'Barbers' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
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
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Accessible name is built from the visible text, so voice control matches what people see. */}
        <a href="#top" className="group flex min-h-[44px] shrink-0 items-center gap-2.5 text-bone">
          <span className="grid h-9 w-9 place-items-center rounded-[4px] bg-brand text-[0.95rem] font-extrabold tracking-tight text-white">
            1UP
          </span>{' '}
          <span className="hidden text-[0.95rem] font-extrabold uppercase tracking-[0.14em] sm:block">
            Barbershop
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded-[4px] px-3 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden min-h-[44px] min-w-[44px] items-center gap-2 rounded-[4px] px-3 text-[0.85rem] font-semibold text-muted transition-colors hover:text-bone md:inline-flex"
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            <span className="hidden xl:inline">{business.phoneDisplay}</span>
            <span className="sr-only xl:hidden">Call {business.name} at {business.phoneDisplay}</span>
          </a>

          {/* Wrapped rather than class-toggled: the shared button style sets its own
              display, which would win over a bare `hidden` utility. Below sm the
              sticky bottom bar already carries this action. */}
          <span className="hidden sm:block">
            <BookButton className={`${buttonPrimary} !px-5 !text-[0.8rem]`} withArrow={false}>
              {bookLabel}
            </BookButton>
          </span>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] border border-hairline text-bone lg:hidden"
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

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-hairline bg-ink lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-hairline/60 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-bone"
                >
                  {link.label}
                </a>
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
            <BookButton className={buttonPrimary} withArrow={false}>
              {bookLabel}
            </BookButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
