import { useState, type FormEvent } from 'react';
import { business } from '../data/business';
import { EditorNote, buttonPrimary, buttonGhostDark } from './ui';

const YEARS = Array.from({ length: 10 }, (_, i) => i + 1);

const fieldClass =
  'w-full min-h-[50px] rounded-[4px] border border-hairline bg-ink px-4 text-[0.95rem] text-bone placeholder:text-muted focus:border-brand-lift focus:outline-none focus:ring-2 focus:ring-brand/40';
const labelClass = 'block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-muted';

type Status = 'idle' | 'sending' | 'sent';

const EMPTY = { firstName: '', lastName: '', email: '', phone: '' };

export function ApplicationForm() {
  const [values, setValues] = useState(EMPTY);
  const [experience, setExperience] = useState<number | null>(null);
  const [resumeName, setResumeName] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof typeof EMPTY) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  function reset() {
    setValues(EMPTY);
    setExperience(null);
    setResumeName('');
    setError('');
    setStatus('idle');
  }

  /**
   * Demo submit. There is no server behind a static site, so nothing leaves the
   * browser — the handler validates, shows a sending state and then the same
   * confirmation a real endpoint would produce. Swapping in a live form service
   * means replacing the timeout below with the fetch and nothing else.
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (experience === null) {
      setError('Pick how many years of experience you have.');
      return;
    }
    setError('');
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 900));
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
        <h3 className="display-xl mt-6 text-[clamp(1.4rem,3.6vw,2rem)]">Application sent</h3>
        <p className="mx-auto mt-4 max-w-md text-[1rem] leading-relaxed text-bone-2">
          Thanks {values.firstName || 'for applying'} — we have your details and a barber will get back to you at{' '}
          <span className="font-semibold text-bone">{values.email}</span> within a couple of days.
        </p>

        <dl className="mx-auto mt-8 max-w-sm space-y-2 border-t border-hairline pt-6 text-left text-[0.92rem]">
          {[
            ['Name', `${values.firstName} ${values.lastName}`.trim()],
            ['Phone', values.phone],
            ['Experience', `${experience} year${experience === 1 ? '' : 's'}`],
            ['Resume', resumeName || 'none attached'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <dt className="text-muted">{label}</dt>
              <dd className="text-right font-semibold text-bone">{value}</dd>
            </div>
          ))}
        </dl>

        <button type="button" onClick={reset} className={`${buttonGhostDark} mt-8 !min-h-[50px]`}>
          Submit another application
        </button>

        <EditorNote>
          Demo submission — nothing was actually sent and no data left this browser. Point the form at a service like
          Formspree or Web3Forms and this exact screen becomes the real confirmation.
        </EditorNote>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="rounded-[6px] border border-hairline bg-ink-2 p-7 sm:p-9">
      <h3 className="display-xl text-[clamp(1.4rem,3.6vw,2rem)]">Apply now</h3>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
        Tell us who you are and what you have cut. We read every one.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="first-name">
            First name
          </label>
          <input
            id="first-name"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={set('firstName')}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="last-name">
            Last name
          </label>
          <input
            id="last-name"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={set('lastName')}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <fieldset className="mt-8">
        <legend className={labelClass}>Years of barber experience</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {YEARS.map((n) => {
            const on = experience === n;
            return (
              <button
                key={n}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setExperience(on ? null : n);
                  setError('');
                }}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-[4px] border text-[0.95rem] font-bold tabular-nums transition-colors ${
                  on
                    ? 'border-brand bg-brand text-white'
                    : 'border-hairline text-muted hover:border-brand-lift hover:text-bone'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[0.82rem] text-muted">Pick 10 for ten years or more.</p>
      </fieldset>

      <div className="mt-8">
        <label className={labelClass} htmlFor="resume">
          Resume
        </label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.txt,image/*"
          onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? '')}
          className="mt-2 block w-full text-[0.9rem] text-muted file:mr-4 file:min-h-[46px] file:cursor-pointer file:rounded-[4px] file:border-0 file:bg-brand file:px-5 file:text-[0.82rem] file:font-bold file:uppercase file:tracking-[0.08em] file:text-white hover:file:bg-brand-deep"
        />
        {resumeName && <p className="mt-2 text-[0.85rem] text-bone-2">Selected: {resumeName}</p>}
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-[4px] border border-red-400/50 bg-red-500/10 px-4 py-3 text-[0.9rem] text-red-200">
          {error}
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className={`${buttonPrimary} mt-8 w-full !min-h-[54px] disabled:opacity-60 sm:w-auto`}>
        {status === 'sending' ? 'Sending…' : 'Send application'}
      </button>

      <EditorNote>
        Demo form — it validates and shows a confirmation, but the site is static so nothing is transmitted and no
        data leaves the browser. To collect applications for real, point it at Formspree or Web3Forms; the
        confirmation screen it already shows becomes the live one. Applications would go to{' '}
        <code>{business.email}</code>.
      </EditorNote>
    </form>
  );
}
