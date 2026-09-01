import { business, bookLabel } from '../data/business';
import { useBooking } from '../lib/booking';
import { PhoneIcon } from './Icons';

/** Compact, always-reachable Call + Book bar on small screens. */
export function MobileBar() {
  const { open: openBooking } = useBooking();

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/97 backdrop-blur-md lg:hidden"
    >
      <div
        className="grid grid-cols-[auto_1fr] gap-2 px-3 py-2.5"
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={business.phoneHref}
          className="inline-flex min-h-[52px] min-w-[52px] items-center justify-center gap-2 rounded-[4px] border border-hairline px-5 text-[0.88rem] font-bold uppercase tracking-[0.08em] text-bone"
        >
          <PhoneIcon className="h-[18px] w-[18px]" />
          Call
        </a>
        <button
          type="button"
          onClick={openBooking}
          className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[4px] bg-brand px-4 text-[0.92rem] font-bold uppercase tracking-[0.08em] text-white"
        >
          {bookLabel}
        </button>
      </div>
    </nav>
  );
}
