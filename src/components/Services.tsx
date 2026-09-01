import { serviceGroups, pricesPublished, business } from '../data/business';
import { BookButton, NeedsInfo, Reveal, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';

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
        <p className="mt-8 flex flex-wrap items-center gap-3 rounded-[4px] border border-dashed border-amber-400/50 bg-amber-400/5 px-4 py-3 text-[0.9rem] text-amber-200">
          <NeedsInfo>Editor note</NeedsInfo>
          Service prices and durations have not been supplied yet. Add them in{' '}
          <code className="rounded bg-ink-3 px-1.5 py-0.5 text-[0.82rem] text-bone">src/data/business.ts</code> and
          every card updates automatically.
        </p>
      )}

      <div className="mt-12 space-y-14">
        {serviceGroups.map((group, gi) => (
          <Reveal key={group.id} delay={gi * 60}>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hairline pb-4">
                <h3 className="text-[1.5rem] font-extrabold uppercase tracking-[-0.01em]">{group.title}</h3>
                <p className="text-[0.92rem] text-muted">{group.blurb}</p>
              </div>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.services.map((service) => (
                  <li
                    key={service.name}
                    className="group flex flex-col rounded-[4px] border border-hairline bg-ink-2 p-5 transition-colors duration-200 hover:border-brand-lift/50"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-[1.05rem] font-bold leading-snug">{service.name}</h4>
                      {service.price ? (
                        <span className="shrink-0 text-[1.05rem] font-extrabold text-brand-lift">{service.price}</span>
                      ) : (
                        <NeedsInfo className="shrink-0">Add price</NeedsInfo>
                      )}
                    </div>

                    <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted">{service.description}</p>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                      <span className="text-[0.8rem] font-semibold uppercase tracking-[0.1em] text-muted">
                        {service.duration ? service.duration : 'Duration TBC'}
                      </span>
                      <BookButton
                        className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] px-3 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-brand-lift transition-colors hover:bg-brand hover:text-white"
                        label={`Book ${service.name}`}
                      >
                        Book
                      </BookButton>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-10 sm:flex-row sm:items-center">
        <BookButton className={`${buttonPrimary} w-full sm:w-auto`}>Book Your Cut</BookButton>
        <a href={business.phoneHref} className={`${buttonGhostDark} w-full sm:w-auto`}>
          Call {business.phoneDisplay}
        </a>
      </div>
    </Section>
  );
}
