import { Section, SectionHeading } from '../components/ui';
import { business } from '../data/business';

export default function BookPage() {
  return (
    <Section id="book">
      <div className="mx-auto max-w-2xl">
        <SectionHeading id="book" title="Book an Appointment" />

        <div className="space-y-8">
          {/* Booking Options */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Booksy */}
            <div className="rounded-lg border-2 border-brand bg-brand/5 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book Online</h3>
              <p className="text-slate-700 mb-6">
                Schedule your appointment directly on Booksy for guaranteed availability
              </p>
              <a
                href="#"
                className="inline-block rounded-lg bg-brand hover:bg-brand/90 text-white font-bold py-3 px-8 transition-colors"
              >
                Open Booksy
              </a>
            </div>

            {/* Call */}
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call to Book</h3>
              <p className="text-slate-700 mb-6">
                Speak with our team directly to schedule or ask questions
              </p>
              <a
                href={business.phoneHref}
                className="inline-block rounded-lg border-2 border-brand text-brand hover:bg-brand/5 font-bold py-3 px-8 transition-colors"
              >
                📞 {business.phoneDisplay}
              </a>
            </div>

            {/* Walk-In */}
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Walk-Ins Welcome</h3>
              <p className="text-slate-700 mb-6">
                No appointment needed! Walk in during business hours and we'll take great care of you
              </p>
              <div className="inline-block text-slate-700">
                <p className="font-semibold">Open Today</p>
                <p className="text-sm">Check hours on the location page</p>
              </div>
            </div>

            {/* Specific Barber */}
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-8 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Book Your Barber</h3>
              <p className="text-slate-700 mb-6">
                Want a specific barber? Visit our Barbers page and call or book directly
              </p>
              <a
                href="/contact"
                className="inline-block rounded-lg border-2 border-brand text-brand hover:bg-brand/5 font-bold py-3 px-8 transition-colors"
              >
                Meet Our Team
              </a>
            </div>
          </div>

          {/* Booking Info */}
          <div className="rounded-lg bg-slate-50 p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Before Your Visit</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Appointments ensure minimal wait time</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Walk-ins served on a first-come, first-served basis</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Please arrive a few minutes early</span>
              </li>
              <li className="flex gap-3">
                <span className="text-brand font-bold">✓</span>
                <span>Cash and card payments accepted</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
