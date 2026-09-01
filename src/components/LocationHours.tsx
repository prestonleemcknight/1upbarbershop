import { business, hours, policies } from '../data/business';
import { formatRange } from '../lib/hours';
import { useShopStatus } from '../lib/useShopClock';
import { BookButton, NeedsInfo, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';
import { PhoneIcon, PinIcon } from './Icons';
import { MapCard } from './MapCard';

function HoursTable() {
  const todayIndex = useShopStatus()?.today?.dayIndex ?? null;

  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Weekly opening hours for {business.name}</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {hours.map((h) => {
          const isToday = todayIndex === h.dayIndex;
          return (
            <tr key={h.day} className="border-b border-hairline last:border-0">
              <th
                scope="row"
                className={`py-3 pr-4 text-[0.95rem] font-semibold ${isToday ? 'text-brand-lift' : 'text-bone'}`}
              >
                {h.day}
                {isToday && <span className="ml-2 text-[0.7rem] font-bold uppercase tracking-[0.12em]">Today</span>}
              </th>
              <td className={`py-3 text-right text-[0.95rem] tabular-nums ${isToday ? 'text-brand-lift' : 'text-muted'}`}>
                {formatRange(h)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}


function PolicyBlock({ title, body, confirm }: { title: string; body: string; confirm: boolean }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="text-[0.95rem] font-bold">{title}</h3>
        {confirm && <NeedsInfo>Confirm</NeedsInfo>}
      </div>
      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-muted">{body}</p>
    </div>
  );
}

export function LocationHours() {
  return (
    <Section id="location" tone="panel" watermark>
      <SectionHeading
        id="location"
        eyebrow="Location & Hours"
        title={<>Find the shop</>}
        lede={`On W Loop 1604 N in ${business.neighborhood}, San Antonio — open seven days a week.`}
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: how to reach us, then the full week. */}
        <div>
          <h3 className="eyebrow text-muted">Address</h3>
          <address className="mt-3 not-italic">
            <p className="text-[1.35rem] font-extrabold leading-snug">{business.address.street}</p>
            <p className="text-[1.05rem] text-muted">
              {business.address.locality}, {business.address.region} {business.address.postalCode}
            </p>
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[1.05rem] font-bold text-brand-lift hover:underline"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              {business.phoneDisplay}
            </a>
          </address>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={business.googleMapsUrl} target="_blank" rel="noopener" className={`${buttonPrimary} w-full sm:w-auto`}>
              <PinIcon className="h-[18px] w-[18px]" />
              Get Directions
            </a>
            <BookButton className={`${buttonGhostDark} w-full sm:w-auto`} withArrow={false}>
              Book Ahead
            </BookButton>
          </div>

          <h3 className="eyebrow mt-10 border-t border-hairline pt-8 text-muted">Weekly hours</h3>
          <div className="mt-3">
            <HoursTable />
          </div>
        </div>

        {/* Right: where it is, then what to expect when you arrive. */}
        <div>
          <MapCard />

          <div className="mt-8 space-y-6 border-t border-hairline pt-8">
            {policies.walkIns && (
              <PolicyBlock title="Walk-in policy" body={policies.walkInNote} confirm={false} />
            )}
            <PolicyBlock title="Refunds & no-shows" confirm={false} body={policies.refunds} />
          </div>
        </div>
      </div>
    </Section>
  );
}
