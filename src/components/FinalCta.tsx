import { business, bookLabelLong } from '../data/business';
import { BookButton, buttonGhostDark, buttonPrimary } from './ui';

export function FinalCta() {
  return (
    <section id="book" aria-labelledby="book-heading" className="relative isolate overflow-hidden bg-ink">
      <div aria-hidden className="texture-grit absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 id="book-heading" className="display-xl mx-auto max-w-[18ch] text-[clamp(2.2rem,7vw,4.2rem)]">
          Get in the chair this week.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
          Open seven days in {business.neighborhood}. Walk in when you can, book when you can’t wait.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookButton className={`${buttonPrimary} w-full !min-h-[56px] !text-base sm:w-auto`}>
            {bookLabelLong}
          </BookButton>
          <a href={business.googleMapsUrl} target="_blank" rel="noopener" className={`${buttonGhostDark} w-full !min-h-[56px] sm:w-auto`}>
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
