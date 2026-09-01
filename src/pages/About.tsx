import { Section, SectionHeading } from '../components/ui';

export default function AboutPage() {
  return (
    <Section id="about">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="about" title="About 1UP Barbershop" />
        <div className="prose prose-sm max-w-none">
          <p className="text-base leading-relaxed text-slate-700">
            Welcome to 1UP Barbershop, your neighborhood destination for premium men's grooming.
            Located in San Antonio, our experienced barbers are dedicated to delivering top-tier
            haircuts, fades, and grooming services in a clean, welcoming environment.
          </p>
          <p className="text-base leading-relaxed text-slate-700 mt-4">
            We believe that a great haircut is more than just a service—it's an experience.
            Our team takes pride in listening to your needs, understanding your style, and delivering
            results that exceed expectations every single time.
          </p>
          <p className="text-base leading-relaxed text-slate-700 mt-4">
            Whether you're a regular or visiting for the first time, you'll experience the 1UP
            difference: skilled barbers, quality products, and genuine hospitality.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Our Mission</h3>
          <p className="text-base leading-relaxed text-slate-700">
            To provide the best barbering services in San Antonio, creating a community space
            where customers feel valued, respected, and leave looking and feeling their best.
          </p>
          <h3 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Why Choose 1UP?</h3>
          <ul className="space-y-2 text-slate-700">
            <li>✓ Professional barbers with years of experience</li>
            <li>✓ Clean, modern facility with quality equipment</li>
            <li>✓ Competitive pricing with transparent rates</li>
            <li>✓ Walk-ins welcome • Appointments available</li>
            <li>✓ Convenient location near Loop 1604</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
