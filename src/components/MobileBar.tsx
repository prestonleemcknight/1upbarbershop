import { business, bookLabel } from '../data/business';
import { BookButton } from './ui';
import { PhoneIcon } from './Icons';

/** Compact, always-reachable Call + Book bar on small screens. */
export function MobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-ink/97 backdrop-blur-md lg:hidden"
    >
      <div
        className="grid grid-cols-2 gap-2 px-3 py-2.5"
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <a
          href={business.phoneHref}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] border border-hairline text-[0.88rem] font-bold uppercase tracking-[0.08em] text-bone"
        >
          <PhoneIcon className="h-[18px] w-[18px]" />
          Call
        </a>
        <BookButton
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] bg-brand text-[0.88rem] font-bold uppercase tracking-[0.08em] text-white"
          withArrow={false}
        >
          {bookLabel}
        </BookButton>
      </div>
    </nav>
  );
}
