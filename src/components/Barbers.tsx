import { barbers, barberPlaceholderImages, bookLabel, bookingReady } from '../data/business';
import { BookButton, Code, EditorNote, NeedsInfo, Reveal, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';
import { InstagramIcon } from './Icons';

/** Shown until real barber names, specialties, bios and photos are supplied. */
function BarberPlaceholders() {
  return (
    <>
      <EditorNote>
        Barber names, specialties, bios and photos have not been supplied. The shop’s Instagram names the owners as{' '}
        <Code>@brandowontmiss</Code> and <Code>@ej.fades</Code> — add their real names and the rest to the{' '}
        <Code>barbers</Code> array in <Code>src/data/business.ts</Code> and real profiles replace these cards.
      </EditorNote>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {barberPlaceholderImages.map((src, i) => (
          <Reveal key={src} as="li" delay={i * 70} className="overflow-hidden rounded-[4px] border border-hairline bg-ink-2">
              <img
                src={src}
                alt=""
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
              <div className="p-5">
                <NeedsInfo className="self-start">Barber {i + 1}</NeedsInfo>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                  Add this barber’s name, specialty (fades, beard work, locs, kids), a two-line bio, the days they work
                  and their personal booking link.
                </p>
              </div>
          </Reveal>
        ))}
      </ul>
    </>
  );
}

export function Barbers() {
  return (
    <Section id="barbers" tone="panel">
      <SectionHeading
        id="barbers"
        eyebrow="The Team"
        title={<>Meet the barbers</>}
        lede="Pick the barber you trust, or take whoever is open — every chair in the shop cuts to the same standard."
      />

      {barbers.length === 0 ? (
        <BarberPlaceholders />
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {barbers.map((barber, i) => (
            <Reveal key={barber.name} as="li" delay={i * 70} className="flex h-full flex-col overflow-hidden rounded-[4px] border border-hairline bg-ink">
                <img
                  src={barber.image}
                  alt={barber.imageAlt}
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1.15rem] font-extrabold">{barber.name}</h3>
                  <p className="mt-1 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand-lift">
                    {barber.specialty}
                  </p>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-muted">{barber.bio}</p>
                  {barber.days && (
                    <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted">
                      In the shop: {barber.days}
                    </p>
                  )}
                  {barber.instagram && (
                    <a
                      href={barber.instagram}
                      target="_blank"
                      rel="noopener"
                      className="mt-3 inline-flex min-h-[44px] items-center gap-2 text-[0.85rem] font-semibold text-muted hover:text-brand-lift"
                    >
                      <InstagramIcon className="h-[18px] w-[18px]" />
                      {barber.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '')}
                    </a>
                  )}
                  {barber.bookingUrl ? (
                    <a
                      href={barber.bookingUrl}
                      target="_blank"
                      rel="noopener"
                      className={`${buttonGhostDark} mt-5 w-full !text-[0.8rem]`}
                    >
                      Book {barber.name.split(' ')[0]}
                    </a>
                  ) : (
                    <BookButton className={`${buttonGhostDark} mt-5 w-full !text-[0.8rem]`} label={`Book with ${barber.name}`} withArrow={false}>
                      Book {barber.name.split(' ')[0]}
                    </BookButton>
                  )}
                </div>
            </Reveal>
          ))}
        </ul>
      )}

      <div className="mt-12 flex flex-col items-start gap-4 rounded-[4px] border border-hairline bg-ink p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[1.15rem] font-extrabold">No preference?</h3>
          <p className="mt-1 text-[0.92rem] text-muted">
            {bookingReady
              ? 'Book the first available chair and get in sooner.'
              : 'Call the shop and we’ll put you with the first available barber.'}
          </p>
        </div>
        <BookButton className={`${buttonPrimary} w-full shrink-0 sm:w-auto`} withArrow={false}>
          {bookingReady ? 'Book First Available' : bookLabel}
        </BookButton>
      </div>
    </Section>
  );
}
