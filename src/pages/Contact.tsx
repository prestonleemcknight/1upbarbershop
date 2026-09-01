import { Section, SectionHeading } from '../components/ui';
import { ChairPicker } from '../components/ChairPicker';

export default function ContactPage() {
  return (
    <Section id="contact" watermark>
      <SectionHeading
        id="contact"
        eyebrow="The Team"
        title="Meet Our Barbers"
        lede="Every chair in the shop, and who works it. Tap a chair for their number, booking link and socials."
      />
      <div className="mt-10">
        <ChairPicker />
      </div>
    </Section>
  );
}
