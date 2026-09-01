import { Section, SectionHeading, EditorNote } from '../components/ui';
import { barbers } from '../data/business';

export default function SocialsPage() {
  const shopInstagram = 'PLACEHOLDER_SHOP_INSTAGRAM';
  const shopTikTok = 'PLACEHOLDER_SHOP_TIKTOK';

  return (
    <Section id="socials">
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="socials" title="Follow Us on Social Media" />

        {/* Shop Social Media */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">1UP Barbershop</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Instagram */}
            <a
              href={`https://instagram.com/${shopInstagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border-2 border-slate-300 hover:border-brand p-8 text-center transition-all hover:shadow-lg"
            >
              <div className="text-6xl mb-4">📷</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand">
                Instagram
              </h4>
              <p className="text-slate-600 text-sm mb-4">@{shopInstagram}</p>
              <p className="text-slate-700 text-sm">
                Follow for fresh cuts, behind-the-scenes, and shop updates
              </p>
            </a>

            {/* TikTok */}
            <a
              href={`https://tiktok.com/@${shopTikTok}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg border-2 border-slate-300 hover:border-brand p-8 text-center transition-all hover:shadow-lg"
            >
              <div className="text-6xl mb-4">🎵</div>
              <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand">
                TikTok
              </h4>
              <p className="text-slate-600 text-sm mb-4">@{shopTikTok}</p>
              <p className="text-slate-700 text-sm">
                Check out our trending cuts and barbershop content
              </p>
            </a>
          </div>
          <EditorNote>
            Replace PLACEHOLDER_SHOP_INSTAGRAM and PLACEHOLDER_SHOP_TIKTOK with actual shop social handles
          </EditorNote>
        </div>

        {/* Barber Social Media */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Follow Our Barbers</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {barbers.map((barber, index) => (
              <div key={index} className="rounded-lg border border-slate-300 p-6">
                <div className="flex gap-3 mb-4">
                  <div className="text-4xl">💈</div>
                  <div>
                    <h4 className="font-bold text-slate-900">{barber.name}</h4>
                    {barber.instagram && (
                      <a
                        href={`https://instagram.com/${barber.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand hover:underline font-semibold"
                      >
                        @{barber.instagram}
                      </a>
                    )}
                    {!barber.instagram && (
                      <p className="text-sm text-slate-500 italic">No Instagram yet</p>
                    )}
                  </div>
                </div>
                {barber.instagram && (
                  <a
                    href={`https://instagram.com/${barber.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-brand hover:underline font-semibold"
                  >
                    View Profile →
                  </a>
                )}
              </div>
            ))}
          </div>
          {barbers.some((b) => !b.instagram) && (
            <EditorNote>
              Add Instagram handles to barber profiles in src/data/business.ts for them to appear here
            </EditorNote>
          )}
        </div>
      </div>
    </Section>
  );
}
