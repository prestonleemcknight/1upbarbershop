import { hours, timeZone, type Hours } from '../data/business';

/** Minutes since midnight for a 'HH:MM' string. */
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/** '10:00' -> '10 AM', '19:00' -> '7 PM', '17:30' -> '5:30 PM' */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${String(m).padStart(2, '0')} ${period}`;
}

export function formatRange(entry: Hours): string {
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

/** Current day + minute-of-day in the shop's timezone, regardless of visitor timezone. */
function nowInShopTimeZone(): { dayIndex: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayIndex = days.indexOf(get('weekday'));
  // Intl can return '24' for midnight in hour12:false.
  const hour = Number(get('hour')) % 24;
  return { dayIndex, minutes: hour * 60 + Number(get('minute')) };
}

export type OpenStatus = {
  today: Hours | undefined;
  isOpen: boolean;
  /** Short, human status line, e.g. 'Open today until 7 PM'. */
  label: string;
};

export function getOpenStatus(): OpenStatus {
  const { dayIndex, minutes } = nowInShopTimeZone();
  const today = hours.find((h) => h.dayIndex === dayIndex);
  if (!today) return { today, isOpen: false, label: 'See today’s hours' };

  const opens = toMinutes(today.open);
  const closes = toMinutes(today.close);
  const isOpen = minutes >= opens && minutes < closes;

  if (isOpen) return { today, isOpen, label: `Open today until ${formatTime(today.close)}` };
  if (minutes < opens) return { today, isOpen, label: `Opens today at ${formatTime(today.open)}` };

  const tomorrow = hours.find((h) => h.dayIndex === (dayIndex + 1) % 7);
  return {
    today,
    isOpen,
    label: tomorrow ? `Closed — opens ${tomorrow.short} at ${formatTime(tomorrow.open)}` : 'Closed now',
  };
}

/** Schema.org OpeningHoursSpecification entries, one per day. */
export function schemaOpeningHours() {
  return hours.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.open,
    closes: h.close,
  }));
}
