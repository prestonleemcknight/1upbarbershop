import { useEffect, useState } from 'react';
import { business, hours } from '../data/business';
import { formatRange } from '../lib/hours';
import { InstagramIcon, PhoneIcon } from './Icons';

const footerNav = [
  { href: '#services', label: 'Services' },
  { href: '#barbers', label: 'Barbers' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#location', label: 'Location' },
  { href: '#faq', label: 'FAQ' },
];

export function Footer() {
  // Filled in after mount so the prerendered HTML can never carry a stale year.
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="border-t border-hairline bg-ink-2 pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-[4px] bg-brand text-[0.95rem] font-extrabold text-white">
              1UP
            </span>
            <span className="text-[0.95rem] font-extrabold uppercase tracking-[0.14em] text-bone">Barbershop</span>
          </p>
          <address className="mt-5 not-italic text-[0.95rem] leading-relaxed text-muted">
            {business.address.street}
            <br />
            {business.address.locality}, {business.address.region} {business.address.postalCode}
            <br />
            <a href={business.phoneHref} className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-semibold text-brand-lift hover:underline">
              <PhoneIcon className="h-[18px] w-[18px]" />
              {business.phoneDisplay}
            </a>
            {business.email && (
              <>
                <br />
                <a href={`mailto:${business.email}`} className="font-semibold text-brand-lift hover:underline">
                  {business.email}
                </a>
              </>
            )}
          </address>

          <a
            href={business.instagram}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.9rem] font-semibold text-muted hover:text-bone"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
            {business.instagramHandle}
          </a>
        </div>

        <div>
          <h2 className="eyebrow text-muted">Hours</h2>
          <ul className="mt-4 space-y-1.5 text-[0.9rem] text-muted">
            {hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span className="text-bone">{h.short}</span>
                <span className="tabular-nums">{formatRange(h)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-muted">Explore</h2>
          <ul className="mt-4 space-y-1">
            {footerNav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="-mx-2 inline-flex min-h-[44px] items-center px-2 text-[0.9rem] text-muted hover:text-bone">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={business.googleMapsUrl} target="_blank" rel="noopener" className="-mx-2 inline-flex min-h-[44px] items-center px-2 text-[0.9rem] text-muted hover:text-bone">
                Directions
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-[0.82rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year ?? ''} {business.legalName}. {business.addressLine}. {business.phoneDisplay}.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <a href="/privacy.html" className="-mx-2 inline-flex min-h-[44px] items-center px-2 hover:text-bone">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/accessibility.html" className="-mx-2 inline-flex min-h-[44px] items-center px-2 hover:text-bone">
                Accessibility
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
