import { Link } from 'react-router-dom';
import { Section, SectionHeading, BookButton, buttonPrimary, buttonGhostDark, EditorNote } from '../components/ui';
import { business, bookingReady, policies } from '../data/business';

export default function BookPage() {
  return (
    <Section id="book">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="book"
          eyebrow="Booking"
          title="Book an Appointment"
          lede="Lock in a chair ahead of time, or walk in — both work, seven days a week."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-[6px] border border-brand/45 bg-brand/8 p-7">
            <h3 className="text-[1.15rem] font-extrabold text-bone">Book online</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-bone-2">
              Pick your barber, service and time. Fastest way to guarantee a chair.
            </p>
            <BookButton className={`${buttonPrimary} mt-6 !min-h-[52px]`} withArrow={false}>
              {bookingReady ? 'Open Booksy' : 'Call to book'}
            </BookButton>
          </div>

          <div className="rounded-[6px] border border-hairline bg-ink-2 p-7">
            <h3 className="text-[1.15rem] font-extrabold text-bone">Call the shop</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
              Talk to someone directly, ask about a service or check the wait.
            </p>
            <a href={business.phoneHref} className={`${buttonGhostDark} mt-6 !min-h-[52px]`}>
              {business.phoneDisplay}
            </a>
          </div>

          <div className="rounded-[6px] border border-hairline bg-ink-2 p-7">
            <h3 className="text-[1.15rem] font-extrabold text-bone">Walk in</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{policies.walkInNote}</p>
            <Link to="/location" className={`${buttonGhostDark} mt-6 !min-h-[52px]`}>
              Hours &amp; directions
            </Link>
          </div>

          <div className="rounded-[6px] border border-hairline bg-ink-2 p-7">
            <h3 className="text-[1.15rem] font-extrabold text-bone">Book a specific barber</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
              Tap a chair on the team page to call or book straight into it.
            </p>
            <Link to="/contact" className={`${buttonGhostDark} mt-6 !min-h-[52px]`}>
              Meet the team
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-[6px] border border-hairline bg-ink-2 p-7">
          <h3 className="eyebrow text-muted">Before your visit</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              'Appointments keep your wait to a minimum',
              'Walk-ins are taken first come, first served',
              'Turn up a few minutes early where you can',
              policies.refunds,
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[0.96rem] leading-relaxed text-bone-2">
                <span aria-hidden className="mt-[0.15em] shrink-0 font-bold text-brand-lift">
                  &check;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {!bookingReady && (
          <EditorNote>
            No online booking link on file yet, so every booking action falls back to click-to-call. Paste the Booksy
            URL into <code>booking.url</code> in <code>src/data/business.ts</code> and all of them switch over at once.
          </EditorNote>
        )}
      </div>
    </Section>
  );
}
