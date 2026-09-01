import { useState, type FormEvent } from 'react';
import { business } from '../data/business';
import { buttonPrimary, buttonGhostDark } from './ui';

const fieldClass =
  'w-full rounded-[4px] border border-hairline bg-ink px-4 py-3 text-[0.95rem] text-bone placeholder:text-muted focus:border-brand-lift focus:outline-none focus:ring-2 focus:ring-brand/40';
const labelClass = 'block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-muted';

const TOPICS = ['The cut', 'Wait time', 'Booking', 'The shop', 'Something else'] as const;

export function FeedbackForm() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [topic, setTopic] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  /**
   * Demo submit — a static site has no endpoint, so nothing leaves the browser.
   * The states are the real ones, so pointing this at a form service later is a
   * one-line change.
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 800));
    setStatus('sent');
  }

  if (status === 'sent') {
    return (
      <div className="rounded-[6px] border border-brand/45 bg-brand/8 p-7 text-center sm:p-10">
        <div
          aria-hidden
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-lift text-[1.6rem] text-brand-lift"
        >
          ✓
        </div>
        <h3 className="display-xl mt-6 text-[clamp(1.3rem,3.4vw,1.9rem)]">Thanks{name ? `, ${name}` : ''}</h3>
        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-bone-2">
          We read every one of these. If you left contact details we will follow up.
        </p>
        <button
          type="button"
          onClick={() => {
            setName('');
            setContact('');
            setTopic(null);
            setMessage('');
            setStatus('idle');
          }}
          className={`${buttonGhostDark} mt-8 !min-h-[48px]`}
        >
          Leave another
        </button>
        <p className="mt-6 text-[0.8rem] text-muted">
          Demo only — nothing was sent and no data left this browser.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[6px] border border-hairline bg-ink-2 p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fb-name">
            Your name <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input id="fb-name" value={name} onChange={(e) => setName(e.target.value)} className={`${fieldClass} mt-2`} />
        </div>
        <div>
          <label className={labelClass} htmlFor="fb-contact">
            Email or phone <span className="font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id="fb-contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={labelClass}>What is this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(on ? null : t)}
                className={`inline-flex min-h-[42px] items-center rounded-[4px] border px-4 text-[0.85rem] font-semibold transition-colors ${
                  on ? 'border-brand bg-brand text-white' : 'border-hairline text-muted hover:border-brand-lift hover:text-bone'
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7">
        <label className={labelClass} htmlFor="fb-message">
          Your recommendation
        </label>
        <textarea
          id="fb-message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what would make 1UP better — what worked, what did not, what you would change."
          className={`${fieldClass} mt-2 resize-y`}
        />
      </div>

      <button type="submit" disabled={status === 'sending'} className={`${buttonPrimary} mt-7 w-full !min-h-[54px] disabled:opacity-60 sm:w-auto`}>
        {status === 'sending' ? 'Sending…' : 'Send it in'}
      </button>

      <p className="mt-5 text-[0.82rem] leading-relaxed text-muted">
        Demo form — it validates and confirms, but the site is static so nothing is transmitted. Wired to a form
        service later, this would land at {business.email}. Prefer to talk?{' '}
        <a href={business.phoneHref} className="font-semibold text-brand-lift hover:underline">
          {business.phoneDisplay}
        </a>
        .
      </p>
    </form>
  );
}
