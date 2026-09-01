import { business } from '../data/business';
import { Section, SectionHeading, buttonGhostDark } from './ui';
import { InstagramIcon } from './Icons';
import { ChairPicker } from './ChairPicker';

export function ChooseBarber() {
  return (
    <Section id="chairs" tone="dark">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="chairs"
          eyebrow="The Chairs"
          title={<>Choose a Barber</>}
          lede="Ten chairs in the shop. Tap one to see who cuts there, call them or book straight into their chair."
        />
        <a href={business.instagram} target="_blank" rel="noopener" className={`${buttonGhostDark} shrink-0`}>
          <InstagramIcon className="h-[18px] w-[18px]" />
          {business.instagramHandle}
        </a>
      </div>

      <div className="mt-10">
        <ChairPicker />
      </div>
    </Section>
  );
}
