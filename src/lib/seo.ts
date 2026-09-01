import { business, booking, bookingReady, ratingInfo, serviceGroups, pricesPublished } from '../data/business';
import { answeredFaqs } from '../data/content';
import { schemaOpeningHours } from './hours';

/**
 * BarberShop JSON-LD. Every field is omitted unless the underlying business
 * detail is actually confirmed — no invented ratings, prices or profiles.
 */
export function barberShopSchema() {
  const sameAs = [business.instagram, business.facebook, business.tiktok].filter(Boolean);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BarberShop',
    '@id': `${business.siteUrl}/#barbershop`,
    name: business.name,
    url: business.siteUrl,
    telephone: business.phoneDisplay,
    image: `${business.siteUrl}/images/1up-barbershop-shop-floor-shaenfield-san-antonio.svg`,
    description:
      'Barbershop in Shaenfield, San Antonio, TX offering precision fades, tapers, beard grooming, lineups, kids cuts and loc maintenance. Walk-ins welcome, open seven days a week.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: [
      { '@type': 'Place', name: 'Shaenfield, San Antonio, TX' },
      { '@type': 'City', name: 'San Antonio' },
    ],
    hasMap: business.googleMapsUrl,
    openingHoursSpecification: schemaOpeningHours(),
    currenciesAccepted: 'USD',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Barbershop services',
      itemListElement: serviceGroups.map((group) => ({
        '@type': 'OfferCatalog',
        name: group.title,
        itemListElement: group.services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name, description: service.description },
          ...(service.price ? { price: service.price.replace(/[^0-9.]/g, ''), priceCurrency: 'USD' } : {}),
        })),
      })),
    },
  };

  if (sameAs.length) schema.sameAs = sameAs;
  if (business.email) schema.email = business.email;
  if (bookingReady) {
    schema.potentialAction = {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: booking.url, actionPlatform: 'https://schema.org/DesktopWebPlatform' },
      result: { '@type': 'Reservation', name: 'Barbershop appointment' },
    };
  }
  // priceRange is only meaningful once real prices exist.
  if (pricesPublished) schema.priceRange = '$$';
  // aggregateRating is only ever emitted from a verified Google rating.
  if (ratingInfo.verified) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: ratingInfo.rating,
      reviewCount: ratingInfo.reviewCount,
    };
  }

  return schema;
}

/** FAQPage covering only the questions whose answers are actually rendered on the page. */
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answeredFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}
