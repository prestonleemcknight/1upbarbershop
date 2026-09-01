import { faqs, faqPlaceholderAnswer } from '../data/content';
import { business } from '../data/business';
import { NeedsInfoLight, Section, SectionHeading, buttonGhostLight } from './ui';

export function Faq() {
  return (
    <Section id="faq" tone="light">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading id="faq" tone="light" eyebrow="FAQ" title={<>Before you come in</>} />
          <p className="mt-5 text-[0.98rem] leading-relaxed text-muted-ink">
            Still not sure about something? Call the shop — someone at the desk will answer.
          </p>
          <a href={business.phoneHref} className={`${buttonGhostLight} mt-6`}>
            Call {business.phoneDisplay}
          </a>
        </div>

        {/* Native disclosure elements: keyboard accessible with zero JavaScript. */}
        <div className="divide-y divide-ink/12 border-y border-ink/12">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-1">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[1.02rem] font-bold marker:content-none">
                <span>{faq.q}</span>
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/25 text-ink transition-transform duration-200 group-open:rotate-45"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="pb-5 pr-10">
                {faq.needsInfo ? (
                  <>
                    <NeedsInfoLight>Needs confirming</NeedsInfoLight>
                    <p className="mt-3 text-[0.96rem] leading-relaxed text-muted-ink">{faqPlaceholderAnswer(faq.q)}</p>
                  </>
                ) : (
                  <p className="text-[0.96rem] leading-relaxed text-muted-ink">{faq.a}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
