import { firstVisitOffer } from '../data/business';
import { BookButton, buttonOnLight } from './ui';

/** Renders nothing unless a real first-visit offer has been switched on in the data file. */
export function Offer() {
  if (!firstVisitOffer.active) return null;

  return (
    <section id="offer" aria-labelledby="offer-heading" className="bg-brand text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <p className="eyebrow text-white/75">First visit</p>
          <h2 id="offer-heading" className="display-xl mt-3 text-[clamp(1.8rem,5vw,2.8rem)]">
            {firstVisitOffer.headline}
          </h2>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-white/90">{firstVisitOffer.detail}</p>
          {firstVisitOffer.terms && <p className="mt-3 text-[0.85rem] text-white/70">{firstVisitOffer.terms}</p>}
        </div>
        <BookButton className={`${buttonOnLight} w-full shrink-0 !bg-white !text-ink hover:!bg-ink hover:!text-white md:w-auto`}>
          Claim It
        </BookButton>
      </div>
    </section>
  );
}
