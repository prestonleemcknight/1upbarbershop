import { trustFacts } from '../data/content';
import { CalendarIcon, ClockIcon, PinIcon, ScissorsIcon, WalkInIcon } from './Icons';

const icons = {
  walkin: WalkInIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  pin: PinIcon,
  scissors: ScissorsIcon,
};

export function TrustBar() {
  return (
    <section aria-label="What to expect" className="border-y border-hairline bg-ink-2">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden bg-hairline sm:grid-cols-3 lg:grid-cols-5">
        {trustFacts.map((fact) => {
          const Icon = icons[fact.icon];
          return (
            <li key={fact.label} className="bg-ink-2 px-4 py-6 sm:px-5">
              <Icon className="h-5 w-5 text-brand-lift" />
              <p className="mt-3 text-[0.92rem] font-bold leading-snug text-bone">{fact.label}</p>
              <p className="mt-1 text-[0.82rem] leading-snug text-muted">{fact.detail}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
