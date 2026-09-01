import { business, hours, policies } from '../data/business';
import { formatRange } from '../lib/hours';
import { useShopStatus } from '../lib/useShopClock';
import { BookButton, NeedsInfo, Section, SectionHeading, buttonGhostDark, buttonPrimary } from './ui';
import { PhoneIcon, PinIcon } from './Icons';

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

/** Stylised map card. A linked still image keeps the page free of third-party scripts and cookies. */
function MapCard() {
  return (
    <a
      href={business.googleMapsUrl}
      target="_blank"
      rel="noopener"
      className="group block overflow-hidden rounded-[4px] border border-hairline bg-ink transition-colors hover:border-brand-lift"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-3">
        <svg
          viewBox="0 0 640 400"
          className="absolute inset-0 h-full w-full"
          aria-hidden
          focusable="false"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect width="640" height="400" fill="#131a22" />
          {/* City blocks */}
          <g fill="#171f29">
            <rect x="24" y="24" width="150" height="86" rx="3" />
            <rect x="220" y="24" width="120" height="86" rx="3" />
            <rect x="390" y="24" width="110" height="60" rx="3" />
            <rect x="24" y="270" width="130" height="106" rx="3" />
            <rect x="205" y="292" width="150" height="84" rx="3" />
            <rect x="420" y="250" width="170" height="126" rx="3" />
          </g>
          {/* Surface streets */}
          <g stroke="#212b37" strokeWidth="9" strokeLinecap="square">
            <path d="M0 140h640M0 250h640M190 0v400M380 0v400M540 0v400" />
          </g>
          {/* The loop */}
          <path
            d="M-30 384 C 140 362, 246 306, 336 214 S 512 74, 690 46"
            stroke="#14356f"
            strokeWidth="28"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-30 384 C 140 362, 246 306, 336 214 S 512 74, 690 46"
            stroke="#1b5ce0"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-30 384 C 140 362, 246 306, 336 214 S 512 74, 690 46"
            stroke="#8fbcff"
            strokeWidth="2"
            strokeDasharray="16 18"
            fill="none"
            opacity="0.7"
          />
          <text
            x="470"
            y="104"
            fill="#9dc2ff"
            fontFamily="Archivo, Helvetica, Arial, sans-serif"
            fontSize="17"
            fontWeight="700"
            letterSpacing="1.5"
            transform="rotate(-21 470 104)"
          >
            W LOOP 1604 N
          </text>
          {/* Shop marker */}
          <circle cx="300" cy="238" r="34" fill="#1b5ce0" opacity="0.1" />
          <path
            d="M300 268c0 0-17-13.5-17-26.5a17 17 0 1 1 34 0c0 13-17 26.5-17 26.5Z"
            fill="#e8ecf1"
            stroke="#0b0f14"
            strokeWidth="2"
          />
          <circle cx="300" cy="241" r="6.5" fill="#1b5ce0" />
        </svg>

        <span className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-ink/88 px-4 py-3 text-[0.85rem] font-semibold backdrop-blur-sm">
          <span className="text-bone">{business.addressLine}</span>
          <span className="shrink-0 text-brand-lift group-hover:underline">Open in Maps</span>
        </span>
      </div>
    </a>
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
    <Section id="location" tone="panel">
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
            <PolicyBlock
              title="Parking"
              confirm={!policies.parking}
              body={policies.parking || 'Add the shop’s parking details here (lot, entrance, and where to walk in from).'}
            />
            <PolicyBlock
              title="Landmark"
              confirm={!policies.landmark}
              body={
                policies.landmark ||
                'Add the nearest cross street or the neighboring business so first-timers spot the door.'
              }
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
