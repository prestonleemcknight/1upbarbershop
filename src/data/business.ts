/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  1UP BARBERSHOP — SINGLE SOURCE OF TRUTH
 *  Everything the site renders comes from this file. Edit here, nowhere else.
 *
 *  Anything marked TODO is a real, unconfirmed business detail. The site is
 *  built to hide or clearly flag unconfirmed facts rather than invent them.
 *  See SETUP.md for the full checklist.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const business = {
  name: '1UP Barbershop',
  legalName: '1UP Barbershop',
  tagline: 'Sharp cuts, seven days a week.',
  /** TODO: replace with the live domain once the site is deployed. */
  siteUrl: 'https://www.1upbarbershopsa.com',

  neighborhood: 'Shaenfield',
  city: 'San Antonio',
  region: 'TX',
  regionName: 'Texas',
  address: {
    street: '7807 W Loop 1604 N',
    locality: 'San Antonio',
    region: 'TX',
    postalCode: '78254',
    country: 'US',
  },
  get addressLine() {
    return `${this.address.street}, ${this.address.locality}, ${this.address.region} ${this.address.postalCode}`;
  },

  phoneDisplay: '(210) 708-2580',
  phoneHref: 'tel:+12107082580',
  /** TODO: no shop email address exists yet. Leave empty to hide it site-wide. */
  email: '',

  instagram: 'https://www.instagram.com/up1barbershop/',
  instagramHandle: '@up1barbershop',
  /** TODO: add Facebook / TikTok / Yelp URLs here if the shop has them. */
  facebook: '',
  tiktok: '',

  googleMapsUrl:
    'https://www.google.com/maps?rlz=1C1VDKB_enUS1170US1170&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRirAjIHCAIQIRirAjIHCAMQIRirAjIHCAQQIRiPAjIHCAUQIRiPAtIBCTE0NjI4ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KWkm3wLraVyGMXpimKGJkBXt&daddr=7807+W+Loop+1604+N,+San+Antonio,+TX+78254',
  /** TODO: paste the shop's "Write a review" / reviews link from Google Business Profile. */
  googleReviewsUrl: '',
} as const;

/* ─── Booking ──────────────────────────────────────────────────────────────
 * TODO: paste the live booking link (Booksy / Square / Squire / Vagaro).
 * While `url` is empty every "Book" button gracefully falls back to
 * click-to-call, so the site is never a dead end.
 * ------------------------------------------------------------------------ */
export const booking = {
  url: '',
  provider: '' as '' | 'Booksy' | 'Square' | 'Squire' | 'Vagaro',
} as const;

export const bookingReady = booking.url.length > 0;
export const bookHref = bookingReady ? booking.url : business.phoneHref;
export const bookLabel = bookingReady ? 'Book Appointment' : 'Call to Book';
export const bookLabelLong = bookingReady ? 'Book Your Cut' : 'Call to Book Your Cut';
/** External booking links need target/rel; a tel: link must not have them. */
export const bookLinkProps = bookingReady
  ? ({ target: '_blank', rel: 'noopener' } as const)
  : ({} as const);

/* ─── Hours ─────────────────────────────────────────────────────────────── */
export type Hours = { day: string; short: string; open: string; close: string; dayIndex: number };

/** dayIndex follows JS getDay(): 0 = Sunday. */
export const hours: Hours[] = [
  { day: 'Monday', short: 'Mon', open: '10:00', close: '19:00', dayIndex: 1 },
  { day: 'Tuesday', short: 'Tue', open: '10:00', close: '19:00', dayIndex: 2 },
  { day: 'Wednesday', short: 'Wed', open: '10:00', close: '19:00', dayIndex: 3 },
  { day: 'Thursday', short: 'Thu', open: '10:00', close: '19:00', dayIndex: 4 },
  { day: 'Friday', short: 'Fri', open: '10:00', close: '19:00', dayIndex: 5 },
  { day: 'Saturday', short: 'Sat', open: '10:00', close: '17:00', dayIndex: 6 },
  { day: 'Sunday', short: 'Sun', open: '11:00', close: '17:00', dayIndex: 0 },
];

export const timeZone = 'America/Chicago';

/* ─── Policies ──────────────────────────────────────────────────────────── */
export const policies = {
  /** Confirmed: walk-ins are always welcome, appointments available, open 7 days. */
  walkIns: true,
  walkInNote: 'Walk-ins are always welcome. Booking ahead just means a chair is waiting on you.',
  /** TODO: confirm parking details (free lot? shared center lot? street?). */
  parking: '',
  /** TODO: confirm accepted payment methods (cash, card, Apple Pay, Cash App...). */
  payments: [] as string[],
  /** TODO: confirm the late/cancellation policy before publishing. */
  latePolicy: '',
  /** TODO: confirm the nearest cross street / landmark for the FAQ + directions. */
  landmark: '',
} as const;

/* ─── First-visit offer ────────────────────────────────────────────────────
 * TODO: set `active: true` and fill this in only if the shop runs a real offer.
 * The whole section stays off the page while `active` is false.
 * ------------------------------------------------------------------------ */
export const firstVisitOffer = {
  active: false,
  headline: '',
  detail: '',
  terms: '',
} as const;

/* ─── Services ─────────────────────────────────────────────────────────────
 * Service names are confirmed. Prices and durations are NOT yet supplied —
 * leave `price`/`duration` empty and the card shows an honest "Call for price"
 * badge instead of a made-up number.
 * ------------------------------------------------------------------------ */
export type Service = {
  name: string;
  description: string;
  /** e.g. '$35'. Empty = not yet confirmed. */
  price: string;
  /** e.g. '45 min'. Empty = not yet confirmed. */
  duration: string;
};

export type ServiceGroup = { id: string; title: string; blurb: string; services: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'haircuts',
    title: 'Haircuts',
    blurb: 'Cut and shaped for your hair type — not a guard number.',
    services: [
      {
        name: 'Precision Fade',
        description: 'Low, mid, high or skin. Blended clean, shaped to your head, not a guard number.',
        price: '',
        duration: '',
      },
      {
        name: 'Taper',
        description: 'Tight around the ears and neck, length kept on top. The low-maintenance standard.',
        price: '',
        duration: '',
      },
      {
        name: 'Scissor Cut & Style',
        description: 'Scissor-over-comb through the top for texture and movement. Styled before you leave.',
        price: '',
        duration: '',
      },
      {
        name: 'Kids Cut (12 & under)',
        description: 'Patient barbers, no rush, no bribes needed. Same lineup, same finish.',
        price: '',
        duration: '',
      },
      {
        name: 'Loc Maintenance',
        description: 'Retwist, shape-up and clean edges for locs at any stage.',
        price: '',
        duration: '',
      },
    ],
  },
  {
    id: 'beard-shave',
    title: 'Beard & Shave',
    blurb: 'Edges you could measure with a ruler.',
    services: [
      {
        name: 'Beard Grooming',
        description: 'Shaped, trimmed to length and balanced to your jawline and cheek line.',
        price: '',
        duration: '',
      },
      {
        name: 'Lineup / Edge-Up',
        description: 'Hairline, temples and beard edges squared off with the trimmer and razor.',
        price: '',
        duration: '',
      },
    ],
  },
  {
    id: 'packages',
    title: 'Packages',
    blurb: 'The full reset, booked as one appointment.',
    services: [
      {
        name: 'Cut + Beard',
        description: 'Any haircut paired with a full beard groom, booked as one appointment.',
        price: '',
        duration: '',
      },
    ],
  },
  {
    id: 'add-ons',
    title: 'Add-Ons',
    blurb: 'Add any of these to a service when you book, or ask in the chair.',
    services: [
      {
        name: 'Hair Design',
        description: 'Hard parts, lines and freehand designs cut into the fade.',
        price: '',
        duration: '',
      },
      {
        name: 'Eyebrow Cleanup',
        description: 'Trimmed and edged to match the rest of the cut.',
        price: '',
        duration: '',
      },
    ],
  },
];

/** Flips to true automatically once real prices are filled in above. */
export const pricesPublished = serviceGroups.some((g) => g.services.some((s) => s.price !== ''));

/* ─── Barbers ──────────────────────────────────────────────────────────────
 * Known from the shop's Instagram: the owners are @brandowontmiss and
 * @ej.fades. Their real names, specialties, bios and photos are still needed
 * before they can be published — see SETUP.md.
 *
 * TODO: no barber names, specialties, bios or photos supplied yet.
 * Fill this array and the section renders real profiles automatically;
 * while it is empty the section shows a clearly-marked placeholder.
 * ------------------------------------------------------------------------ */
export type Barber = {
  name: string;
  specialty: string;
  bio: string;
  /** e.g. 'Tue–Sat'. Empty = not shown. */
  days: string;
  image: string;
  imageAlt: string;
  /** Personal booking link. Empty = falls back to the shop-wide booking action. */
  bookingUrl: string;
  /** Personal Instagram URL. Empty = not shown. */
  instagram: string;
};

export const barbers: Barber[] = [];

/** Portraits ready to pair with real barbers once names are supplied. */
export const barberPlaceholderImages = [
  '/images/1up-barbershop-barber-portrait-1.svg',
  '/images/1up-barbershop-barber-portrait-2.svg',
  '/images/1up-barbershop-barber-portrait-3.svg',
];

/* ─── Gallery ──────────────────────────────────────────────────────────────
 * Swap each `src` for a real photo of your own work (keep the descriptive
 * filename pattern and update the alt text to match the actual photo).
 * ------------------------------------------------------------------------ */
export type GalleryCategory = 'Fades' | 'Classic Cuts' | 'Beard Work' | 'Transformations';

export type GalleryItem = {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
  /** True while this is a generated placeholder, not a real photo. */
  placeholder: boolean;
};

export const galleryCategories: GalleryCategory[] = ['Fades', 'Classic Cuts', 'Beard Work', 'Transformations'];

export const gallery: GalleryItem[] = [
  {
    src: '/images/1up-barbershop-skin-fade-san-antonio.svg',
    alt: 'Skin fade cut at 1UP Barbershop in San Antonio, viewed from the back',
    category: 'Fades',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-mid-taper-fade.svg',
    alt: 'Mid taper fade in side profile, blended into the hairline',
    category: 'Fades',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-hair-design-hard-part.svg',
    alt: 'Hard part and freehand hair design cut into a fade',
    category: 'Fades',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-classic-scissor-cut.svg',
    alt: 'Classic scissor cut styled with texture on top',
    category: 'Classic Cuts',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-kids-first-haircut.svg',
    alt: 'Kids haircut in progress in the barber chair',
    category: 'Classic Cuts',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-loc-retwist-maintenance.svg',
    alt: 'Loc retwist and shape-up maintenance',
    category: 'Classic Cuts',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-beard-shape-up-lineup.svg',
    alt: 'Beard shaped and lined up with a razor finish',
    category: 'Beard Work',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
  {
    src: '/images/1up-barbershop-before-after-transformation.svg',
    alt: 'Before and after a full cut and beard transformation',
    category: 'Transformations',
    width: 1000,
    height: 1250,
    placeholder: true,
  },
];

/* ─── Reviews ──────────────────────────────────────────────────────────────
 * TODO: the Google rating and review count are NOT verified, so nothing is
 * displayed. Set `verified: true` and fill in the real numbers only after
 * checking the live Google Business Profile.
 *
 * `reviews` are unfilled placeholders on purpose — paste real review text
 * (and the reviewer's first name) copied from Google. Never invent one.
 * ------------------------------------------------------------------------ */
export const ratingInfo = {
  verified: false,
  rating: 0,
  reviewCount: 0,
} as const;

export type Review = { quote: string; author: string; source: string };

export const reviews: Review[] = [
  { quote: '', author: '', source: 'Google' },
  { quote: '', author: '', source: 'Google' },
  { quote: '', author: '', source: 'Google' },
];

export const reviewsReady = reviews.every((r) => r.quote.length > 0);
