import { Section, SectionHeading, EditorNote } from '../components/ui';
import { business } from '../data/business';
import { Logo } from '../components/Logo';
import { InstagramIcon } from '../components/Icons';

/** Square brand tile. The Instagram one carries the shop's own mark. */
function SocialTile({
  href,
  network,
  handle,
  blurb,
  children,
}: {
  href: string;
  network: string;
  handle: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[6px] border border-hairline bg-ink-2 p-7 text-center transition-colors hover:border-brand-lift"
    >
      <span className="mx-auto flex aspect-square w-full max-w-[190px] items-center justify-center rounded-[6px] border border-hairline bg-ink transition-colors group-hover:border-brand/60">
        {children}
      </span>
      <span className="mt-6 text-[1.15rem] font-extrabold uppercase tracking-[0.1em] text-bone group-hover:text-brand-lift">
        {network}
      </span>
      <span className="mt-1 text-[0.9rem] font-semibold text-brand-lift">{handle}</span>
      <span className="mt-3 text-[0.92rem] leading-relaxed text-muted">{blurb}</span>
    </a>
  );
}

export default function SocialsPage() {
  const hasTikTok = business.tiktok.length > 0;

  return (
    <Section id="socials">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="socials"
          eyebrow="Socials"
          title="Follow the shop"
          lede="Fresh cuts, transformations and what is going on in the shop day to day."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          <SocialTile
            href={business.instagram}
            network="Instagram"
            handle={business.instagramHandle}
            blurb="Fresh cuts, behind the scenes and shop updates."
          >
            <Logo className="h-[62%] w-[62%]" title="1UP Barbershop on Instagram" />
          </SocialTile>

          {hasTikTok ? (
            <SocialTile href={business.tiktok} network="TikTok" handle="" blurb="Short-form cuts and shop content.">
              <Logo className="h-[62%] w-[62%]" title="1UP Barbershop on TikTok" />
            </SocialTile>
          ) : (
            <div className="flex flex-col rounded-[6px] border border-dashed border-hairline bg-ink-2/40 p-7 text-center">
              <span className="mx-auto flex aspect-square w-full max-w-[190px] items-center justify-center rounded-[6px] border border-dashed border-hairline">
                <InstagramIcon className="h-10 w-10 text-muted" />
              </span>
              <span className="mt-6 text-[1.15rem] font-extrabold uppercase tracking-[0.1em] text-muted">TikTok</span>
              <span className="mt-3 text-[0.92rem] leading-relaxed text-muted">
                No TikTok handle on file yet. Add one and this tile goes live.
              </span>
            </div>
          )}
        </div>

        {!hasTikTok && (
          <EditorNote>
            Add the shop&rsquo;s TikTok (and Facebook, if there is one) to <code>business.tiktok</code> in{' '}
            <code>src/data/business.ts</code> and the tile fills in automatically. Barber-level socials appear on the
            Contact page once the real roster is added.
          </EditorNote>
        )}
      </div>
    </Section>
  );
}
