import { Section, SectionHeading, EditorNote, BookButton, buttonPrimary } from '../components/ui';
import { business } from '../data/business';

export default function GiftCardsPage() {
  return (
    <Section id="gift-cards" watermark>
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          id="gift-cards"
          eyebrow="Gift Cards"
          title="Give a fresh cut"
          lede="A 1UP gift card covers any service in the shop — fades, beard work, the full reset."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[6px] border border-hairline bg-ink-2 p-6">
            <h3 className="text-[1.1rem] font-extrabold">Buy in the shop</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              Pick one up at the counter any day we are open, in any amount.
            </p>
            <p className="mt-4 text-[0.9rem] font-semibold text-bone">{business.addressLine}</p>
          </div>

          <div className="rounded-[6px] border border-hairline bg-ink-2 p-6">
            <h3 className="text-[1.1rem] font-extrabold">Buy over the phone</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
              Call the shop and we will sort it out and hold it at the front.
            </p>
            <a href={business.phoneHref} className="mt-4 inline-block font-bold text-brand-lift hover:underline">
              {business.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-8">
          <BookButton className={`${buttonPrimary} !min-h-[54px]`}>Call the shop</BookButton>
        </div>

        <EditorNote>
          Placeholder page behind the &ldquo;Purchase now&rdquo; link in the header. Swap in the real online gift-card
          checkout (Booksy, Square or whichever the shop uses), amounts and terms when they exist.
        </EditorNote>
      </div>
    </Section>
  );
}
