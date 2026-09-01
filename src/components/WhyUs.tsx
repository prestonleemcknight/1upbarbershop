import { differentiators } from '../data/content';
import { Reveal, Section, SectionHeading } from './ui';

export function WhyUs() {
  return (
    <Section id="why" tone="light">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeading
            id="why"
            tone="light"
            eyebrow="Why 1UP"
            title={<>Raising the standard on the North Side</>}
            lede="Four things you can hold us to — not slogans."
          />

          <ol className="mt-10 divide-y divide-ink/12 border-t border-ink/12">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} as="li" delay={i * 70} className="flex gap-5 py-7">
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-[0.8rem] font-extrabold tabular-nums tracking-[0.12em] text-brand-deep"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-[1.2rem] font-extrabold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-[0.98rem] leading-relaxed text-muted-ink">{item.body}</p>
                  </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="lg:pt-8">
          <figure className="overflow-hidden rounded-[4px] bg-ink">
            <img
              src="/images/1up-barbershop-interior-barber-chairs.svg"
              alt="Station, mirror and tools at 1UP Barbershop"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="border-t border-hairline px-5 py-4 text-[0.85rem] leading-relaxed text-muted">
              A clean shop, a comfortable chair and weeknight hours until 7 — the details that decide whether you come back.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
