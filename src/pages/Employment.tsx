import { Section, SectionHeading } from '../components/ui';
import { business } from '../data/business';

export default function EmploymentPage() {
  return (
    <Section id="employment">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="employment" title="Join Our Team" />

        <div className="space-y-8">
          {/* We're Hiring */}
          <div className="rounded-lg border-2 border-brand bg-brand/5 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">We're Looking for Talented Barbers!</h3>
            <p className="text-slate-700 mb-6">
              1UP Barbershop is growing and we want passionate barbers who take pride in their craft
              to join our team. If you're skilled, professional, and ready to deliver amazing results,
              we'd love to hear from you.
            </p>

            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">What We Offer:</h4>
              <ul className="space-y-2 text-slate-700">
                <li className="flex gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span>Competitive commission and pay structure</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span>Flexible scheduling and growth opportunities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span>Professional work environment with modern equipment</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span>Supportive team culture focused on excellence</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand font-bold">•</span>
                  <span>Steady clientele and visibility in the community</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-lg border border-slate-300 bg-slate-50 p-8">
            <h4 className="text-lg font-bold text-slate-900 mb-4">Requirements:</h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-2">
                <span className="text-brand font-bold">✓</span>
                <span>Valid barber license (Texas)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold">✓</span>
                <span>Professional attitude and strong customer service skills</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold">✓</span>
                <span>Ability to work independently and as part of a team</span>
              </li>
              <li className="flex gap-2">
                <span className="text-brand font-bold">✓</span>
                <span>Portfolio or examples of your work</span>
              </li>
            </ul>
          </div>

          {/* How to Apply */}
          <div className="rounded-lg border-2 border-brand bg-white p-8 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Ready to Apply?</h3>
            <p className="text-slate-700 mb-6">
              Reach out to us with your portfolio and let's discuss how you can join the 1UP team
            </p>

            <div className="space-y-3 flex flex-col">
              <a
                href={business.phoneHref}
                className="inline-block rounded-lg bg-brand hover:bg-brand/90 text-white font-bold py-3 px-8 transition-colors"
              >
                📞 Call Us
              </a>
              <p className="text-slate-700 text-sm">
                or stop by in person at {business.addressLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
