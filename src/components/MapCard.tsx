import { business } from '../data/business';
import { PinIcon } from './Icons';

/**
 * The real location, embedded. Uses Google's keyless `output=embed` form
 * pinned to the street address, so it shows the actual spot in Shaenfield
 * without needing a Maps API key or a billing account.
 */
export function MapCard({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';

  return (
    <div
      className={`overflow-hidden rounded-[6px] border ${
        dark ? 'border-hairline bg-ink-2' : 'border-ink/15 bg-white'
      }`}
    >
      <iframe
        src={business.mapEmbedUrl}
        title={`Map showing ${business.name} at ${business.addressLine}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block aspect-4/3 w-full border-0"
      />

      <div className={`border-t p-5 ${dark ? 'border-hairline' : 'border-ink/12'}`}>
        <p className={`flex items-start gap-2 text-[0.95rem] font-semibold ${dark ? 'text-bone' : 'text-ink'}`}>
          <PinIcon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand-lift" />
          <span>
            {business.address.street}
            <span className={`block font-normal ${dark ? 'text-muted' : 'text-muted-ink'}`}>
              {business.address.locality}, {business.address.region} {business.address.postalCode}
            </span>
          </span>
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[4px] border text-[0.82rem] font-bold uppercase tracking-[0.08em] transition-colors ${
              dark
                ? 'border-hairline text-bone hover:border-brand-lift hover:text-brand-lift'
                : 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone'
            }`}
          >
            Google Maps
          </a>
          <a
            href={business.appleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[4px] border text-[0.82rem] font-bold uppercase tracking-[0.08em] transition-colors ${
              dark
                ? 'border-hairline text-bone hover:border-brand-lift hover:text-brand-lift'
                : 'border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone'
            }`}
          >
            Apple Maps
          </a>
        </div>
      </div>
    </div>
  );
}
