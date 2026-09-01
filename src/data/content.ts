/**
 * Page copy that isn't a hard business fact. Safe to reword.
 * FAQs with `needsInfo: true` are missing a confirmed answer — they render a
 * visible "confirm this" note and are deliberately excluded from FAQ schema.
 */
import { business, policies, bookingReady } from './business';

export type TrustFact = { label: string; detail: string; icon: 'walkin' | 'calendar' | 'clock' | 'pin' | 'scissors' };

/** Only facts that were actually confirmed for the shop appear here. */
export const trustFacts: TrustFact[] = [
  { label: 'Walk-ins welcome', detail: 'No appointment needed', icon: 'walkin' },
  { label: 'Open 7 days', detail: 'Mon–Sun, every week', icon: 'clock' },
  { label: 'Appointments available', detail: bookingReady ? 'Book online in seconds' : 'Call to reserve a chair', icon: 'calendar' },
  { label: 'On W Loop 1604 N', detail: `${business.neighborhood}, San Antonio`, icon: 'pin' },
  { label: 'All hair types', detail: 'Fades, locs, kids, beards', icon: 'scissors' },
];

export type Differentiator = { title: string; body: string };

export const differentiators: Differentiator[] = [
  {
    title: 'Every hair type, every texture',
    body: 'Fades, tapers, lineups, beards, kids cuts and loc maintenance. Our barbers are trained across hair types, so you are not gambling on whether the shop can handle yours.',
  },
  {
    title: 'The same cut every visit',
    body: 'We keep notes on what you got and how you wear it. Come back in three weeks and you get the same fade, same guard, same finish — no re-explaining it from scratch.',
  },
  {
    title: 'Open seven days a week',
    body: 'Weeknights until 7 and both weekend days. Get lined up Sunday afternoon before the week starts instead of squeezing it into a Saturday morning.',
  },
  {
    title: 'Walk in or book ahead',
    body: 'Chairs are held for walk-ins every day. Booking just means your barber is waiting on you instead of the other way around.',
  },
];

export type Faq = { q: string; a: string; needsInfo?: boolean };

export const faqs: Faq[] = [
  {
    q: 'Do you take walk-ins?',
    a: 'Yes — walk-ins are welcome every day we are open. Wait times depend on how busy the shop is, so if you are on a tight schedule, booking ahead is the safer bet.',
  },
  {
    q: 'How do I book an appointment?',
    a: bookingReady
      ? 'Use the Book Appointment button anywhere on this page. It opens our online booking, where you can pick your barber, service and time.'
      : `Call or text the shop at ${business.phoneDisplay} and we will get you on the books.`,
  },
  {
    q: 'What if I show up late?',
    a: '',
    needsInfo: true,
  },
  {
    q: 'What payment methods do you accept?',
    a: '',
    needsInfo: true,
  },
  {
    q: 'Where do I park?',
    a: '',
    needsInfo: true,
  },
  {
    q: 'Do you cut kids’ hair?',
    a: 'Yes. Kids cuts are a regular part of what we do — first haircuts included. Kids get the same lineup and finish as everyone else, just with more patience.',
  },
  {
    q: 'How should I show up for my appointment?',
    a: 'Come with clean, dry, unstyled hair if you can — no heavy product. Bring a photo if you have a specific shape in mind; it is faster and more accurate than describing it. Otherwise just tell your barber how you wear it day to day.',
  },
  {
    q: 'Can I request a specific barber?',
    a: 'Yes. Ask for them by name when you call or walk in. If they are booked and you would rather not wait, any barber in the shop can pick up the same cut.',
  },
];

/** Answers we actually have — the only ones that belong in FAQPage schema. */
export const answeredFaqs = faqs.filter((f) => !f.needsInfo && f.a.length > 0);

/** Placeholder answers shown in the UI while the real policy is unconfirmed. */
export const faqPlaceholderAnswer = (q: string): string => {
  if (q.startsWith('What if I show up late')) return 'Confirm the shop’s late/grace-period policy and replace this answer.';
  if (q.startsWith('What payment')) return 'Confirm which payment methods the shop accepts and replace this answer.';
  if (q.startsWith('Where do I park')) return 'Confirm the parking situation at the center and replace this answer.';
  return 'Confirm this answer before publishing.';
};

export const parkingConfirmed = policies.parking.length > 0;
