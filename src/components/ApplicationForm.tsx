import { useState, type FormEvent } from 'react';
import { business } from '../data/business';
import { EditorNote, buttonPrimary } from './ui';

const YEARS = Array.from({ length: 10 }, (_, i) => i + 1);

const fieldClass =
  'w-full min-h-[50px] rounded-[4px] border border-hairline bg-ink px-4 text-[0.95rem] text-bone placeholder:text-muted focus:border-brand-lift focus:outline-none focus:ring-2 focus:ring-brand/40';
const labelClass = 'block text-[0.78rem] font-bold uppercase tracking-[0.12em] text-muted';

export function ApplicationForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState<number | null>(null);
  const [resumeName, setResumeName] = useState('');

  /**
   * The site is static, so there is no server to POST to. Submitting opens the
   * applicant's mail client with everything filled in, addressed to the shop.
   * A mailto cannot carry the file, so we name it and ask them to attach it.
   */
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Barber experience: ${experience ?? 'not given'} / 10`,
      '',
      resumeName ? `Resume: ${resumeName} — please attach before sending.` : 'Resume: please attach before sending.',
    ].join('\n');

    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      `Barber application — ${firstName} ${lastName}`.trim(),
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[6px] border border-hairline bg-ink-2 p-7 sm:p-9">
      <h3 className="display-xl text-[clamp(1.4rem,3.6vw,2rem)]">Apply now</h3>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
        Fill this in and it opens an email to the shop with your details ready to send.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="first-name">
            First name
          </label>
          <input
            id="first-name"
            name="firstName"
            required
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="last-name">
            Last name
          </label>
          <input
            id="last-name"
            name="lastName"
            required
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
                onClick={() => setExperience(on ? null : n)}
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
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.txt,image/*"
          onChange={(e) => setResumeName(e.target.files?.[0]?.name ?? '')}
          className="mt-2 block w-full text-[0.9rem] text-muted file:mr-4 file:min-h-[46px] file:cursor-pointer file:rounded-[4px] file:border-0 file:bg-brand file:px-5 file:text-[0.82rem] file:font-bold file:uppercase file:tracking-[0.08em] file:text-white hover:file:bg-brand-deep"
        />
        {resumeName && <p className="mt-2 text-[0.85rem] text-bone-2">Selected: {resumeName}</p>}
      </div>

      <button type="submit" className={`${buttonPrimary} mt-8 w-full !min-h-[54px] sm:w-auto`}>
        Send application
      </button>

      <EditorNote>
        There is no server behind this form — the site is static, so submitting opens the applicant&rsquo;s email
        client addressed to <code>{business.email}</code> with every field filled in. A mailto cannot carry the
        file, so the applicant is asked to attach the resume themselves. To collect resumes automatically, point the
        form at a service like Formspree or Web3Forms.
      </EditorNote>
    </form>
  );
}
