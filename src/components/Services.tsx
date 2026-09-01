import { serviceGroups, pricesPublished, business } from '../data/business';
import { BookButton, Code, EditorNote, NeedsInfo, Reveal, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';

export function Services() {
  return (
    <Section id="services" tone="dark">
      <SectionHeading
        id="services"
        eyebrow="Services & Pricing"
        title={<>What we cut</>}
        lede={
          <>
            Men’s haircuts and beard work in {business.neighborhood}, San Antonio — for every hair type and
            texture. Add-ons can be tacked onto any service; just say so when you book.
          </>
        }
      />

      {!pricesPublished && (
        <EditorNote>
          Service prices and durations have not been supplied yet. Add them in <Code>src/data/business.ts</Code> and
          every row updates automatically.
        </EditorNote>
      )}

      <div className="mt-14 space-y-16">
        {serviceGroups.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 60}>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b-2 border-hairline pb-4">
                <h3 className="text-[1.35rem] font-extrabold uppercase tracking-[0.01em] sm:text-[1.5rem]">
                  {group.title}
                </h3>
                <p className="text-[0.9rem] text-muted">{group.blurb}</p>
              </div>

              {/* CSS columns balance the rows themselves, so no group ever ends on a half-empty grid cell. */}
              <ul
                className={
                  group.services.length > 1
                    ? 'lg:columns-2 lg:gap-x-14'
                    : // A lone service keeps the width of a single column so the rhythm holds.
                      'lg:max-w-[calc(50%-1.75rem)]'
                }
              >
                {group.services.map((service) => (
                  <li
                    key={service.name}
                    className="group grid break-inside-avoid grid-cols-[1fr_auto] items-baseline gap-x-5 border-b border-hairline/70 py-5"
                  >
                    <h4 className="text-[1.05rem] font-bold leading-snug">{service.name}</h4>

                    {service.price ? (
                      <span className="text-[1.1rem] font-extrabold tabular-nums text-brand-lift">{service.price}</span>
                    ) : (
                      <NeedsInfo>Add price</NeedsInfo>
                    )}

                    <p className="col-span-2 mt-1.5 max-w-prose text-[0.92rem] leading-relaxed text-muted">
                      {service.description}
                    </p>

                    <p className="col-span-2 mt-3 flex items-center gap-4">
                      <span className="text-[0.76rem] font-bold uppercase tracking-[0.12em] text-muted">
                        {service.duration || 'Duration TBC'}
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-hairline/70" />
                      <BookButton
                        className="-my-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] px-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-brand-lift transition-colors hover:bg-brand hover:text-white"
                        label={`Book ${service.name}`}
                      >
                        Book
                      </BookButton>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-10 sm:flex-row sm:items-center">
        <BookButton className={`${buttonPrimary} w-full sm:w-auto`}>Book Your Cut</BookButton>
        <a href={business.phoneHref} className={`${buttonGhostDark} w-full sm:w-auto`}>
          Call {business.phoneDisplay}
        </a>
      </div>
    </Section>
  );
}
