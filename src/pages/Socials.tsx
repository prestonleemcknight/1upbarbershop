import { Section, SectionHeading } from '../components/ui';
import { business } from '../data/business';
import { Logo } from '../components/Logo';

type Row = { label: string; value: string; href: string; note?: string };

export default function SocialsPage() {
  // `as const` in business.ts narrows an unset handle to the '' literal, which
  // makes the populated branch unreachable to TS. Widen before using it.
  const tiktok: string = business.tiktok;

  const rows: Row[] = [
    {
      label: 'Instagram',
      value: business.instagramHandle,
      href: business.instagram,
    },
    {
      label: 'TikTok',
      value: tiktok ? tiktok.replace(/^https?:\/\/(www\.)?tiktok\.com\//, '') : 'Not on file yet',
      href: tiktok,
      note: tiktok ? undefined : 'Add the handle in business.ts and this links up.',
    },
    {
      label: 'Gmail',
      value: business.email,
      href: `mailto:${business.email}`,
    },
  ];

  return (
    <Section id="socials" watermark>
      <div className="mx-auto max-w-xl">
        <SectionHeading
          id="socials"
          eyebrow="Socials"
          title="Follow the shop"
          lede="Everywhere you can find 1UP, in one place."
        />

        <div className="mt-12 overflow-hidden rounded-[8px] border border-hairline bg-ink-2">
          {/* One big square carrying the mark. */}
          <div className="flex aspect-square w-full items-center justify-center border-b border-hairline bg-ink p-10">
            <Logo className="h-[70%] w-[70%]" title="1UP Barbershop" />
          </div>

          <ul className="divide-y divide-hairline">
            {rows.map((row) => {
              const live = row.href.length > 0;
              const content = (
                <>
                  <span className="min-w-0">
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-muted">
                      {row.label}
                    </span>
                    <span
                      className={`mt-1 block break-all text-[1.02rem] font-semibold ${
                        live ? 'text-bone' : 'text-muted'
                      }`}
                    >
                      {row.value}
                    </span>
                    {row.note && <span className="mt-1 block text-[0.8rem] text-muted">{row.note}</span>}
                  </span>
                  {live && (
                    <span
                      aria-hidden
                      className="shrink-0 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-brand-lift"
                    >
                      Open
                    </span>
                  )}
                </>
              );

              return (
                <li key={row.label}>
                  {live ? (
                    <a
                      href={row.href}
                      {...(row.href.startsWith('mailto:')
                        ? {}
                        : { target: '_blank', rel: 'noopener noreferrer' })}
                      className="flex min-h-[76px] items-center justify-between gap-4 px-6 py-4 transition-colors hover:bg-ink/60"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex min-h-[76px] items-center justify-between gap-4 px-6 py-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
