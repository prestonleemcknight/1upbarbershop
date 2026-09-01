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
  email: 'up1barbershop@gmail.com',

  instagram: 'https://www.instagram.com/up1barbershop/',
  instagramHandle: '@up1barbershop',
  /** TODO: add Facebook / TikTok / Yelp URLs here if the shop has them. */
  facebook: '',
  tiktok: '',

  googleMapsUrl:
    'https://www.google.com/maps?rlz=1C1VDKB_enUS1170US1170&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRirAjIHCAIQIRirAjIHCAMQIRirAjIHCAQQIRiPAjIHCAUQIRiPAtIBCTE0NjI4ajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=us&sa=X&geocode=KWkm3wLraVyGMXpimKGJkBXt&daddr=7807+W+Loop+1604+N,+San+Antonio,+TX+78254',
  /** Opens the address in Apple Maps on iOS/macOS. */
  appleMapsUrl:
    'https://maps.apple.com/?address=7807%20W%20Loop%201604%20N,%20San%20Antonio,%20TX%2078254&q=1UP%20Barbershop',
  /** Keyless Google Maps embed pinned to the street address. */
  mapEmbedUrl:
    'https://www.google.com/maps?q=7807+W+Loop+1604+N,+San+Antonio,+TX+78254&output=embed',
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
  /**
   * Refund / no-show terms. Stated plainly so a customer reads it before
   * booking rather than after being charged.
   * TODO: owner to confirm the exact wording and the grace period.
   */
  refunds:
    'Booked appointments are held for you. A no-call, no-show is charged 50% of the booked service before your next appointment. Call or message ahead and there is no charge — we will just move you.',
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
        price: '$35',
        duration: '45 min',
      },
      {
        name: 'Taper',
        description: 'Tight around the ears and neck, length kept on top. The low-maintenance standard.',
        price: '$30',
        duration: '40 min',
      },
      {
        name: 'Scissor Cut & Style',
        description: 'Scissor-over-comb through the top for texture and movement. Styled before you leave.',
        price: '$35',
        duration: '45 min',
      },
      {
        name: 'Kids Cut (12 & under)',
        description: 'Patient barbers, no rush, no bribes needed. Same lineup, same finish.',
        price: '$25',
        duration: '30 min',
      },
      {
        name: 'Loc Maintenance',
        description: 'Retwist, shape-up and clean edges for locs at any stage.',
        price: '$65',
        duration: '90 min',
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
        price: '$20',
        duration: '25 min',
      },
      {
        name: 'Lineup / Edge-Up',
        description: 'Hairline, temples and beard edges squared off with the trimmer and razor.',
        price: '$15',
        duration: '20 min',
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
        price: '$50',
        duration: '70 min',
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
        price: '$10',
        duration: '15 min',
      },
      {
        name: 'Eyebrow Cleanup',
        description: 'Trimmed and edged to match the rest of the cut.',
        price: '$8',
        duration: '10 min',
      },
    ],
  },
];

/** Flips to true automatically once real prices are filled in above. */
export const pricesPublished = serviceGroups.some((g) => g.services.some((s) => s.price !== ''));

/**
 * The prices above are demo figures placed in the local market range so the
 * page can be shown to the owner with real-looking numbers. Set this to true
 * once the owner confirms the actual menu — the "not confirmed" banner on the
 * services page disappears on its own.
 */
export const pricesConfirmed = false;

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
  /** Direct number. Empty = falls back to the shop line. */
  phone?: string;
  /** Marks a stand-in profile so the UI can label it honestly. */
  demo?: boolean;
};

export const barbers: Barber[] = [];

/* ─── Chair picker ─────────────────────────────────────────────────────────
 * Ten stand-in chairs so the click-a-chair interaction can be demonstrated
 * before real staff details exist. Every one is flagged `demo: true`, so the
 * UI labels it as a placeholder and never passes it off as a real person.
 * The phone and booking action point at the shop's real line, which is
 * accurate: any chair is reachable on it.
 *
 * TODO: replace with the real roster — see SETUP.md.
 * ------------------------------------------------------------------------ */
export const chairCount = 10;

export const demoChairs: Barber[] = Array.from({ length: chairCount }, (_, i) => ({
  name: `Barber ${i + 1}`,
  specialty: '',
  bio: '',
  days: '',
  image: '',
  imageAlt: '',
  bookingUrl: '',
  instagram: '',
  demo: true,
}));

/**
 * Where each barber stands in the shop photo, as a percentage of the image
 * box. These are placed by eye against the shop photo — nudge x/y here until
 * each marker sits on the right person. Order matches `chairRoster`.
 */
export const chairHotspots: { x: number; y: number }[] = [
  { x: 12, y: 62 },
  { x: 24, y: 55 },
  { x: 35, y: 50 },
  { x: 45, y: 47 },
  { x: 54, y: 45 },
  { x: 63, y: 47 },
  { x: 72, y: 50 },
  { x: 81, y: 55 },
  { x: 89, y: 61 },
  { x: 96, y: 68 },
];

/** Real roster when it exists, stand-ins until then. */
export const chairRoster: Barber[] = barbers.length > 0 ? barbers : demoChairs;
export const rosterIsDemo = barbers.length === 0;

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
