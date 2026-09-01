import { useState } from 'react';
import { Section, SectionHeading } from '../components/ui';
import { barbers, business } from '../data/business';
import { X } from 'lucide-react';

interface Barber {
  id: string;
  name: string;
  bio?: string;
  phone?: string;
  instagram?: string;
  photo?: string;
  position?: { x: number; y: number; radius: number };
}

export default function ContactPage() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  // Barbers with placeholder positions in the shop (x, y as percentage, radius in pixels)
  const barsWithPositions: Barber[] = barbers.map((barber, index) => ({
    ...barber,
    id: `barber-${index}`,
    position: {
      x: 25 + (index % 2) * 50,
      y: 30 + Math.floor(index / 2) * 30,
      radius: 50,
    },
  }));

  return (
    <Section id="contact">
      <div className="mx-auto max-w-4xl">
        <SectionHeading id="contact" title="Meet Our Barbers" />

        {/* Shop Photo with Barber Hotspots */}
        <div className="relative mb-12 overflow-hidden rounded-lg bg-slate-100 shadow-lg">
          {/* Placeholder Shop Image */}
          <div className="relative aspect-video w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-lg font-semibold mb-2">Shop Photo Placeholder</p>
              <p className="text-slate-400 text-sm">Replace with actual barbershop photo</p>
            </div>

            {/* Barber Hotspots */}
            {barsWithPositions.map((barber) => (
              <button
                key={barber.id}
                onClick={() => setSelectedBarber(barber)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform hover:scale-110"
                style={{
                  left: `${barber.position!.x}%`,
                  top: `${barber.position!.y}%`,
                }}
                aria-label={`View details for ${barber.name}`}
              >
                {/* Clickable Circle */}
                <div
                  className="rounded-full border-2 border-brand bg-brand/20 flex items-center justify-center text-white font-bold text-sm backdrop-blur-sm group-hover:bg-brand/40 transition-colors"
                  style={{
                    width: `${barber.position!.radius * 2}px`,
                    height: `${barber.position!.radius * 2}px`,
                  }}
                >
                  {barber.name.charAt(0)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Barber Info Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {barsWithPositions.map((barber) => (
            <button
              key={barber.id}
              onClick={() => setSelectedBarber(barber)}
              className="text-left rounded-lg border border-slate-200 p-6 hover:border-brand hover:shadow-lg transition-all"
            >
              <div className="flex gap-4">
                <div
                  className="flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-2xl"
                  aria-hidden="true"
                >
                  {barber.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{barber.name}</h3>
                  {barber.bio && <p className="text-sm text-slate-600 mt-1">{barber.bio}</p>}
                  <p className="text-sm text-brand font-medium mt-2">Click for details →</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Barber Detail Modal */}
      {selectedBarber && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedBarber(null)}>
          <div
            className="relative w-full max-w-sm rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedBarber(null)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Barber Photo Placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold text-6xl rounded-t-lg">
              {selectedBarber.name.charAt(0)}
            </div>

            {/* Barber Details */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedBarber.name}</h2>
              {selectedBarber.bio && (
                <p className="text-slate-700 text-sm mb-4">{selectedBarber.bio}</p>
              )}

              {/* Contact Methods */}
              <div className="space-y-3 mt-6">
                <a
                  href={business.phoneHref}
                  className="flex items-center gap-2 w-full rounded-lg bg-brand hover:bg-brand/90 text-white font-semibold py-3 px-4 transition-colors text-center justify-center"
                >
                  📞 Call {selectedBarber.name}
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 w-full rounded-lg border-2 border-brand text-brand hover:bg-brand/5 font-semibold py-3 px-4 transition-colors text-center justify-center"
                >
                  📱 Book on Booksy
                </a>

                {selectedBarber.instagram && (
                  <a
                    href={`https://instagram.com/${selectedBarber.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 w-full rounded-lg border border-slate-300 text-slate-700 hover:border-slate-400 font-semibold py-3 px-4 transition-colors text-center justify-center"
                  >
                    📸 Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
