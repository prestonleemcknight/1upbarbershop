import { Section, SectionHeading } from '../components/ui';
import { business } from '../data/business';

const points = [
  'Barbers who cut every day and finish every head the same way',
  'A clean shop, sharp tools and a chair you are comfortable in',
  'Transparent pricing — the menu is on the site, not a surprise at the counter',
  'Walk-ins always welcome, appointments if you would rather not wait',
  'Right on the W Loop 1604 access road in Shaenfield',
];

export default function AboutPage() {
  return (
    <Section id="about" watermark>
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="about"
          eyebrow="About"
          title="About 1UP Barbershop"
          lede="A neighbourhood shop on the North Side, built around getting the cut right every single visit."
        />

        <div className="mt-12 space-y-6 text-[1.05rem] leading-relaxed text-bone-2">
          <p>
            1UP Barbershop is a men&rsquo;s grooming shop in {business.neighborhood}, San Antonio. Fades, tapers,
            scissor work, beards, kids cuts and loc maintenance — cut clean, finished properly, and done the same way
            whichever chair you sit in.
          </p>
          <p>
            A good haircut is not a transaction. It is ten minutes of someone actually listening to what you want,
            then the skill to deliver it. That is the whole business.
          </p>
          <p>
            Whether you are a regular or walking in for the first time, you get the same thing: a barber who takes the
            work seriously and a shop that respects your time.
          </p>
        </div>

        <h3 className="display-xl mt-16 text-[clamp(1.5rem,4vw,2.2rem)]">What you can hold us to</h3>
        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          {points.map((point, i) => (
            <li key={point} className="flex gap-5 py-5">
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-[0.8rem] font-extrabold tabular-nums tracking-[0.12em] text-brand-lift"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[1rem] leading-relaxed text-bone-2">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
