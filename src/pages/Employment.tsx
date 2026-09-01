import { Section, SectionHeading, buttonPrimary, buttonGhostDark } from '../components/ui';
import { ApplicationForm } from '../components/ApplicationForm';
import { business } from '../data/business';

const offers = [
  'Competitive commission and pay structure',
  'Flexible scheduling and room to grow your book',
  'Modern shop, quality equipment, clean stations',
  'A team that takes the craft seriously',
  'Steady walk-in traffic on a busy stretch of 1604',
];

const requirements = [
  'Valid Texas barber or cosmetology licence',
  'Professional attitude and real customer service',
  'Able to work independently and as part of a team',
  'A portfolio or photos of your recent work',
];

export default function EmploymentPage() {
  return (
    <Section id="employment" watermark>
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="employment"
          eyebrow="Careers"
          title="Join Our Team"
          lede="1UP is growing. If you take pride in the work and want a chair on the North Side, we want to hear from you."
        />

        <div className="mt-12 rounded-[6px] border border-brand/45 bg-brand/8 p-7 sm:p-9">
          <h3 className="display-xl text-[clamp(1.4rem,3.6vw,2rem)] text-bone">
            We&rsquo;re looking for talented barbers
          </h3>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-bone-2">
            If you are skilled, reliable and care about how someone looks walking out the door, there is a chair here
            for you. Bring your licence and your portfolio and let&rsquo;s talk.
          </p>

          <h4 className="eyebrow mt-8 text-brand-lift">What we offer</h4>
          <ul className="mt-4 space-y-2.5">
            {offers.map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-bone-2">
                <span aria-hidden className="mt-[0.15em] shrink-0 font-bold text-brand-lift">
                  &bull;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 rounded-[6px] border border-hairline bg-ink-2 p-7 sm:p-9">
          <h4 className="eyebrow text-muted">Requirements</h4>
          <ul className="mt-4 space-y-2.5">
            {requirements.map((item) => (
              <li key={item} className="flex gap-3 text-[0.98rem] leading-relaxed text-bone-2">
                <span aria-hidden className="mt-[0.15em] shrink-0 font-bold text-brand-lift">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-hairline pt-10">
          <ApplicationForm />
        </div>

        <div className="mt-10 border-t border-hairline pt-10 text-center">
          <h3 className="display-xl text-[clamp(1.4rem,3.6vw,2rem)]">Rather talk first?</h3>
          <p className="mt-3 text-[1rem] leading-relaxed text-muted">
            Call the shop, or stop in with your portfolio at {business.addressLine}.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={business.phoneHref} className={`${buttonGhostDark} w-full !min-h-[54px] sm:w-auto`}>
              Call {business.phoneDisplay}
            </a>
            <a href={`mailto:${business.email}`} className={`${buttonPrimary} w-full !min-h-[54px] sm:w-auto`}>
              {business.email}
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
