/**
 * All site copy and content. Pages and sections read from here; components contain no hard-coded copy.
 * Copy matches the Figma page "HER TABLE · Final Design (Website)".
 *
 * Client rules (Oct 28–30, 2026):
 *  - No example ticket prices on the live site: `price: null` shows "Pricing announced soon".
 *  - TABLE 01 date, venue, capacity and price stay "Coming soon".
 *  - Membership and event tickets are separate purchases.
 *  - Member price / early access only on selected events (`access`).
 */
import type { ImageKey } from './images';

export const site = {
  name: 'Her Table Society',
  legalName: 'HER TABLE SOCIETY',
  url: 'https://hertablesociety.com',
  email: 'hello@hertablesociety.com',
  description:
    '‘Her Table Society’ is a private social society for women in Los Angeles. Curated dinners, conversation, wellness and culture, hosted across the city. Women 27+.',
  tagline: 'No two tables are the same.',
  year: 2026,
  social: [
    { label: 'X', href: 'https://x.com/', icon: 'x' },
    { label: 'Instagram', href: 'https://www.instagram.com/hertablesocietyla', icon: 'instagram' },
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  ],
} as const;

export const nav = {
  links: [
    { label: 'Events', href: '/events' },
    { label: 'TABLE 01', href: '/table-01' },
    { label: 'Membership', href: '/membership' },
  ],
  cta: { label: 'Become a Member', short: 'Join', href: '/membership' },
  login: { label: 'Log in', href: '/account/login' },
};

/* ------------------------------------------------------------------ */
/* Categories: four that stay the same (Hermen, Oct 30)               */
/* ------------------------------------------------------------------ */
export const categories = [
  { slug: 'dinner', name: 'HER TABLE Dinner', image: 'catDinner', body: 'Curated dinners at different restaurants and venues, with changing themes and conversations, like TABLE 01.' },
  { slug: 'wellness-movement', name: 'HER Wellness & Movement', image: 'catWellness', body: 'Pilates, yoga, golf, horseback riding, hiking, swimming and more.' },
  { slug: 'activities-experiences', name: 'HER Activities & Experiences', image: 'catActivities', body: 'Cooking classes, flower arranging, painting, pottery, workshops and other experiences to enjoy together.' },
  { slug: 'book-club', name: 'HER TABLE Book Club', image: 'catBookClub', body: 'Book discussions and social gatherings, with different books and conversation topics.' },
] as const satisfies ReadonlyArray<{ slug: string; name: string; image: ImageKey; body: string }>;
export type CategorySlug = (typeof categories)[number]['slug'];

/* ------------------------------------------------------------------ */
/* Events                                                             */
/* ------------------------------------------------------------------ */
/**
 * access: public | member-price | early-access | members-only
 * status: available | few-left | sold-out | date-soon
 * price / memberPrice: number when Hermen sets it, null = "Pricing announced soon"
 */
export type EventAccess = 'public' | 'member-price' | 'early-access' | 'members-only';
export type EventStatus = 'available' | 'few-left' | 'sold-out' | 'date-soon';

export interface HtsEvent {
  slug: string;
  title: string;
  category: CategorySlug;
  dateShort: string;
  dateLong: string;
  startISO?: string;
  endISO?: string;
  area: string;
  location: string;
  dressCode: string;
  length: string;
  capacity: number | null;
  seatsLeft: number | null;
  access: EventAccess;
  status: EventStatus;
  price: number | null;
  memberPrice: number | null;
  publicSaleOpens?: string;
  about: string[];
  image: ImageKey;
  launch?: boolean;
}

export const events: HtsEvent[] = [
  {
    slug: 'matcha-and-morning-pages', title: 'Matcha & Morning Pages', category: 'book-club',
    dateShort: 'Sun, Nov 9 · 10 AM to 12 PM', dateLong: 'Sunday, November 9, 2026 · 10 AM to 12 PM',
    startISO: '2026-11-09T10:00:00-08:00', endISO: '2026-11-09T12:00:00-08:00',
    area: 'Silver Lake', location: 'A sunlit tea room in Silver Lake. Exact address sent with your ticket.',
    dressCode: 'Soft weekend layers. Comfortable and put together.', length: 'About two hours',
    capacity: 40, seatsLeft: 22, access: 'early-access', status: 'available', price: null, memberPrice: null,
    publicSaleOpens: 'Fri, Nov 7 at 10 AM PT',
    about: [
      'A slow Sunday morning with ceremonial matcha, a short reading and a few pages of your own. We pass a book around the table, talk about what stayed with us and leave a little lighter.',
      'Bring a notebook. Pens, matcha and pastries are on us.',
    ],
    image: 'catBookClub',
  },
  {
    slug: 'sunset-pilates-on-the-bluffs', title: 'Sunset Pilates on the Bluffs', category: 'wellness-movement',
    dateShort: 'Sat, Nov 15 · 4 to 6 PM', dateLong: 'Saturday, November 15, 2026 · 4 to 6 PM',
    startISO: '2026-11-15T16:00:00-08:00', endISO: '2026-11-15T18:00:00-08:00',
    area: 'Pacific Palisades', location: 'An open-air bluff in Pacific Palisades. Meeting point sent with your ticket.',
    dressCode: 'Activewear in neutral tones. Mats provided.', length: 'About two hours',
    capacity: 24, seatsLeft: 18, access: 'public', status: 'available', price: null, memberPrice: null,
    about: [
      'A gentle mat Pilates class above the ocean as the sun goes down, followed by cold-pressed juice and easy conversation on the grass.',
      'All levels welcome. Our instructor adapts every move.',
    ],
    image: 'catWellness',
  },
  {
    slug: 'gallery-night-after-hours', title: 'Gallery Night, After Hours', category: 'activities-experiences',
    dateShort: 'Thu, Nov 20 · 7 to 10 PM', dateLong: 'Thursday, November 20, 2026 · 7 to 10 PM',
    startISO: '2026-11-20T19:00:00-08:00', endISO: '2026-11-20T22:00:00-08:00',
    area: 'Arts District', location: 'A private gallery in the Arts District. Exact address sent with your ticket.',
    dressCode: 'Gallery black with one statement piece.', length: 'About three hours',
    capacity: 30, seatsLeft: 9, access: 'member-price', status: 'available', price: null, memberPrice: null,
    about: [
      'The gallery closes, the lights go low and we get the room to ourselves: a short talk with the curator, wine, and a floral arranging table to make something to take home.',
    ],
    image: 'catActivities',
  },
  {
    slug: 'rooftop-golden-hour', title: 'Rooftop Golden Hour', category: 'activities-experiences',
    dateShort: 'Fri, Dec 5 · 6 to 9 PM', dateLong: 'Friday, December 5, 2026 · 6 to 9 PM',
    startISO: '2026-12-05T18:00:00-08:00', endISO: '2026-12-05T21:00:00-08:00',
    area: 'West Hollywood', location: 'Private rooftop, West Hollywood. Exact address sent with your ticket.',
    dressCode: 'Golden hour glam. Neutrals, gold and champagne tones.', length: 'About three hours',
    capacity: 40, seatsLeft: 0, access: 'public', status: 'sold-out', price: null, memberPrice: null,
    about: [
      'Sunset drinks, a DJ set and the city lit up below. Rooftop Golden Hour is an easy, beautiful evening to meet the women of HER TABLE, whether it’s your first event or your tenth.',
      'Expect a welcome glass, small plates and a few gentle introductions so no one stands alone.',
    ],
    image: 'optionEvents',
  },
  {
    slug: 'desert-reset-weekend', title: 'Desert Reset Weekend', category: 'wellness-movement',
    dateShort: 'Fri, Jan 16 to Sun, Jan 18', dateLong: 'January 16 to 18, 2027 · Two nights',
    startISO: '2027-01-16T15:00:00-08:00', endISO: '2027-01-18T12:00:00-08:00',
    area: 'Joshua Tree', location: 'Private desert house, Joshua Tree. Shared rides from LA available.',
    dressCode: 'Relaxed and layered. Bring a swimsuit and something warm for the evenings.', length: 'Two nights',
    capacity: 16, seatsLeft: 6, access: 'members-only', status: 'available', price: null, memberPrice: null,
    about: [
      'Two nights in a private desert house with morning movement, a long-table dinner under the stars and a sound bath on the last night.',
      'Rooms are shared in pairs. We’ll match you with someone you’ll love.',
    ],
    image: 'eventDesert',
  },
  {
    slug: 'the-supper-club-table', title: 'The Supper Club Table', category: 'dinner',
    dateShort: 'Thu, Jan 22 · 7 to 10 PM', dateLong: 'Thursday, January 22, 2027 · 7 to 10 PM',
    startISO: '2027-01-22T19:00:00-08:00', endISO: '2027-01-22T22:00:00-08:00',
    area: 'Los Feliz', location: 'A candlelit supper club in Los Feliz. Exact address sent with your ticket.',
    dressCode: 'Evening wear. Think candlelight.', length: 'About three hours',
    capacity: 24, seatsLeft: 4, access: 'public', status: 'few-left', price: null, memberPrice: null,
    about: ['A long table, a seasonal menu and assigned seats that move between courses, so you leave knowing more than the woman next to you.'],
    image: 'catDinner',
  },
];

/** TABLE 01: the launch event. Date, venue, capacity and price stay "Coming soon" until confirmed. */
export const table01 = {
  slug: 'table-01', title: 'Red Flag / Green Flag', category: 'dinner' as CategorySlug,
  subtitle: 'The first table. The beginning of many.',
  dateShort: 'Date announced soon', dateLong: 'Coming soon',
  area: 'Los Angeles', location: 'Coming soon',
  dressCode: 'Red or green attire in any shade. Dress to impress. Heels required.', length: 'About three hours',
  capacity: null, seatsLeft: null, access: 'public' as EventAccess, status: 'date-soon' as EventStatus,
  price: null, memberPrice: null,
  about: [
    'TABLE 01 is where HER TABLE begins: a fashion-forward dinner in Los Angeles built around one question, red flag or green flag? Take your seat among women you haven’t met yet, raise a flag, defend your answer and leave with new friends.',
  ],
  image: 'table01Poster' as ImageKey,
  launch: true,
  flags: {
    red: 'Dating, money, behavior, boundaries, funny, confessions',
    green: 'Peace, consistency, values, maturity, unexpected, positives',
  },
  quotes: [
    '“He follows 3,000 women on Instagram.”',
    '“He calls his mother every Sunday.”',
    '“I make more money than him.”',
    '“He says every ex was crazy.”',
    '“I date for peace, not potential.”',
  ],
} satisfies HtsEvent & Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Ticketing copy                                                     */
/* ------------------------------------------------------------------ */
export const ticketing = {
  maxPerOrder: 4,
  pricingSoon: 'Pricing announced soon',
  note: 'Secure checkout by Stripe. All guests must be 27+.',
  membersFirstNote:
    'This event opens to members first at the member price. Seats left after the early window open to the public. If members sell out the event, no public tickets are released.',
  cancellation: {
    title: 'Cancellation policy',
    terms: [
      'Within 24 hours of purchase: full refund.',
      'After 24 hours: a $50 cancellation fee, with the rest of the ticket refunded if you cancel before the event’s final deadline.',
      'Close to the event: tickets are generally non-refundable. The exact deadline and any exceptions for this event are shown before checkout.',
      'If HER TABLE cancels the event: full refund.',
    ],
    short:
      'Cancellation policy: full refund within 24 hours of purchase. After that, a $50 fee applies and the rest is refunded until the event’s final deadline. Close to the event, tickets are generally non-refundable. If HER TABLE cancels, you get a full refund.',
  },
};

/* ------------------------------------------------------------------ */
/* Membership                                                         */
/* ------------------------------------------------------------------ */
export type PlanId = 'intro' | '6-months' | '12-months';
export interface Plan { id: PlanId; months: number; price: number; tag: string; terms: string[]; renews: boolean }

export const plans: Plan[] = [
  { id: 'intro', months: 3, price: 150, tag: 'Introductory · First-time members only', renews: false,
    terms: ['Paid upfront, no auto charge', 'A reminder to choose 6 or 12 months before it ends', 'Once per person, cannot be renewed'] },
  { id: '6-months', months: 6, price: 300, tag: 'Renews every 6 months', renews: true,
    terms: ['Paid upfront, renews automatically', 'Switch plan or cancel before renewal', 'Reminders 14 and 3 days before renewal'] },
  { id: '12-months', months: 12, price: 600, tag: 'Renews every 12 months', renews: true,
    terms: ['Paid upfront, renews automatically', 'Switch plan or cancel before renewal', 'Reminders 14 and 3 days before renewal'] },
];

export const membership = {
  /** Set to true when 2,000 active members is reached: registration closes and the notify form shows. */
  isFull: false,
  eyebrow: 'Membership · Los Angeles · 27+',
  title: 'Become a member.',
  intro:
    'HER TABLE is a private social society for women in Los Angeles, 27+. Membership is access and belonging: early access and member pricing on selected events, plus experiences only members see. Event tickets are purchased separately.',
  facts: [
    { value: '$50/mo', label: 'equivalent, paid upfront' },
    { value: '3 · 6 · 12', label: 'month plans' },
    { value: '2,000', label: 'members maximum' },
  ],
  benefitsEyebrow: '01 · Benefits',
  benefitsTitle: 'What membership includes.',
  benefitsIntro: 'Every plan includes the same benefits. Choose the term that suits you.',
  benefits: [
    'Priority access to event announcements and tickets before public release.',
    'Preferred member ticket pricing on eligible events.',
    'Access to exclusive members-only experiences.',
    'Selected guest privileges and celebration perks.',
    'Access to the growing HER TABLE calendar and member community.',
  ],
  plansEyebrow: '02 · Plans',
  plansTitle: 'Choose your membership',
  plansNote: 'All plans include HER TABLE membership benefits. Event tickets are purchased separately.',
  planTicketsNote: 'Event tickets purchased separately',
  howTitle: 'How joining works',
  howSteps: ['Select plan', 'Enter details', 'Confirm 27+', 'Pay', 'Confirmation'],
  join: { label: 'Join HER TABLE SOCIETY', href: '/join' },
  joinNote: 'Members and their guests must be 27 or older. Secure payment by Stripe.',
  full: {
    title: 'Membership is currently full.',
    body: 'HER TABLE is limited to 2,000 active members. Leave your email and we’ll let you know as soon as a spot opens.',
  },
  faqEyebrow: '03 · Questions',
  faqTitle: 'Renewal & cancellation.',
  faqIntro: 'Still wondering? Write to hello@hertablesociety.com',
  faq: [
    { q: 'Does my membership renew automatically?', a: 'The 6 and 12 month plans renew automatically for the same term. You’ll get an email 14 days and 3 days before renewal, and you can switch plan or cancel any time before then. The 3-month introductory plan never auto-charges.', open: true },
    { q: 'What happens when the introductory plan ends?', a: 'Nothing is charged. We’ll remind you 14 days and 3 days before it ends so you can choose the 6 or 12 month plan. The introductory plan is for first-time members, once per person, and can’t be renewed.' },
    { q: 'Can I switch plans or cancel?', a: 'Yes. Switch or cancel from your account any time before your renewal date. Your membership stays active until the end of the term you’ve paid for.' },
    { q: 'What if my payment fails?', a: 'We’ll email you to update your card. You have a 7-day grace period and your spot stays reserved. If payment isn’t updated within 7 days, your membership ends and the spot opens to someone new.' },
    { q: 'Are event tickets included?', a: 'No. Membership gives you benefits and access, not tickets. Event tickets are always purchased separately, for each event. On selected events, members get early access or member pricing.', open: true },
    { q: 'Can I bring a guest to celebrate a birthday?', a: 'HER TABLE doesn’t host separate birthday parties. If you’re celebrating a birthday or milestone at one of our scheduled events, you can request to bring one non-member guest, such as your mother, sister or a friend. Requests depend on approval, available seats and the type of event, and your guest buys her own ticket. It isn’t an automatic privilege at every event.', open: true },
  ],
};

/** Example member shown on account and confirmation screens (front-end only until accounts are built). */
export const demoMember = {
  firstName: 'Jessica', lastName: 'Doe', email: 'jessica@example.com', phone: '(310) 555-0123',
  plan: '6-months' as PlanId, startDate: 'November 22, 2026', renewDate: 'May 22, 2027',
  reminders: 'May 8 and May 19, 2027', card: 'Visa ending 4242 · Expires 08/28',
};

/* ------------------------------------------------------------------ */
/* Home (Figma 01 · Home)                                             */
/* ------------------------------------------------------------------ */
export const home = {
  hero: {
    eyebrow: ['A private', 'women’s society'],
    titleTop: 'No two tables',
    titleBottom: 'are the same',
    leadName: '‘Her Table Society’',
    lead: 'is a private social society for women in Los Angeles. Curated dinners, conversation, wellness and culture, hosted across the city.',
    primary: { label: 'Explore Events', href: '/events' },
    secondary: { label: 'Discover TABLE 01', href: '/table-01' },
  },
  society: {
    eyebrow: 'The / society',
    title: 'A table for the women you haven’t met yet.',
    body: [
      'HER TABLE is built for women 27 and over who value real friendship, new experiences and investing in themselves. It is much more than a dinner club: tables, tea and matcha, wellness, culture, parties and adventures. Every gathering is designed around conversation, styling and connection, with assigned seats, thoughtful prompts and small groups that make it easy to meet someone new.',
      'There is no single venue. Los Angeles is the setting: gardens, studios, restaurants, the water, and places you have not been yet.',
    ],
  },
  pillars: {
    eyebrow: 'What makes it / different?',
    title: 'Six things every table shares.',
    items: [
      { title: 'Conversation', body: 'Playful, provocative themes that give strangers a reason to talk.' },
      { title: 'Fashion', body: 'Dress codes and visual worlds that make every table feel intentional.' },
      { title: 'Connection', body: 'Assigned seating, rotations and prompts curated for real friendships.' },
      { title: 'Variety', body: 'A shifting calendar: dinner one month, wellness session the next.' },
      { title: 'Privacy', body: 'Be present. Not every moment is made for social media.' },
      { title: 'Celebration', body: 'Birthdays, engagements and milestones, marked together.' },
    ],
  },
  calendar: {
    eyebrow: 'The / calendar',
    title: 'Always changing. Always curated.',
    intro: 'Four categories that stay the same, with experiences inside them that keep changing. The calendar keeps growing with new ideas, new venues and brand collaborations, because no two tables are the same.',
  },
  table01: {
    badge: 'TABLE 01 · The launch event',
    fields: [
      { label: 'When', value: 'Coming soon' },
      { label: 'Length', value: 'About three hours' },
      { label: 'Where', value: 'Coming soon' },
      { label: 'Guests', value: 'Women 27+' },
    ],
    cta: { label: 'View event & tickets', href: '/table-01' },
  },
  privacy: {
    title: 'Your table. Your privacy.',
    bodyBefore: 'We share the world of ',
    bodyName: 'Her Table Society',
    bodyAfter: ': the styling, the tables, the flowers. Not our members’ private lives. Private conversations are never content.',
  },
  options: {
    eyebrow: 'HER TABLE SOCIETY',
    title: 'No two tables are the same.',
    sub: 'A private women’s social society in Los Angeles · 27+',
    cards: [
      { eyebrow: '01 · One-time ticket', title: 'Explore Events', body: 'Browse upcoming experiences and purchase a one-time ticket. No membership required.', meta: 'Four categories · Book one at a time', cta: { label: 'Explore Events', href: '/events' }, image: 'optionEvents' as ImageKey },
      { eyebrow: '02 · Membership', title: 'Become a Member', body: 'Discover membership benefits, select a plan, and join HER TABLE SOCIETY.', note: 'Membership gives you benefits and access. Event tickets are purchased separately.', meta: '3, 6 or 12 months · $50/mo equivalent', cta: { label: 'Become a Member', href: '/membership' }, image: 'optionMembership' as ImageKey },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Events page (Figma 02)                                             */
/* ------------------------------------------------------------------ */
export const eventsPage = {
  eyebrow: 'Explore events',
  title: 'Upcoming experiences.',
  intro: 'Book a single ticket to any HER TABLE experience. No membership required. Members get early access and preferred pricing on eligible events.',
  memberLink: { label: 'On selected events, members book first. Become a member', href: '/membership' },
  sorted: 'Sorted by date',
  featured: {
    eyebrow: 'Featured',
    category: 'HER TABLE Dinner · TABLE 01 · The launch event',
    line: 'Date, venue and tickets coming soon · Women 27+',
    cta: { label: 'View TABLE 01', href: '/table-01' },
    note: 'Members hear the date first',
  },
  gridTitle: 'This season',
  membersFirst: {
    eyebrow: 'Members book first',
    title: ['On selected events,', 'members book first.'],
    body: 'Some events open to members first, at the member price. Whatever is left opens to everyone when the early window closes. Other events are public from day one, and some are for members only.',
    cta: { label: 'Become a Member', href: '/membership' },
    steps: [
      { title: 'Members get first access.', body: 'All seats are offered to members during an early booking window.' },
      { title: 'Members book their seats.', body: 'They purchase tickets at the member price.' },
      { title: 'Remaining seats open to the public.', body: 'If members book 12 of 20 seats, the other 8 open to everyone when the early window closes.' },
      { title: 'If members sell out the event,', body: 'there are no public tickets.' },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Flows: checkout, join, confirmations                               */
/* ------------------------------------------------------------------ */
export const stripeCopy = {
  alertTitle: 'You’ll finish payment on Stripe.',
  alertBody: 'Secure checkout by Stripe. You’ll come back to HER TABLE when it’s done.',
  failedTitle: 'Your payment didn’t go through.',
  failedBody: 'Your card was declined and no charge was made. Try again or use a different card.',
  handoffTitle: 'Taking you to secure checkout…',
  handoffBody: 'You’ll pay on Stripe, our payment partner. Please don’t close this window. You’ll come back to HER TABLE as soon as it’s done.',
  secure: 'Secure checkout by Stripe',
  fallback: 'Not redirected? Continue to Stripe  →',
  processed: 'Payments are processed by Stripe. HER TABLE never sees your full card number.',
};

export const joinSteps = ['Select plan', 'Your details', 'Confirm 27+', 'Pay'];

export const welcome = {
  eyebrow: 'Membership confirmed',
  title: 'Welcome to HER TABLE.',
  next: [
    { title: 'Visit your account', body: 'Manage your plan, tickets and card any time.' },
    { title: 'Book your tickets', body: 'Tickets are booked per event. Members get early access and member pricing on selected events.' },
    { title: 'TABLE 01 is coming', body: 'Members hear the date first. Watch your inbox.' },
  ],
};

export const upsell = {
  title: 'Loved booking with us?',
  body: 'Members get early access and member pricing on selected events, plus members-only experiences. From $50/mo equivalent.',
  cta: { label: 'Become a Member', href: '/membership' },
};

/** Example orders on the account screens (front-end only). */
export const demoTickets = {
  upcoming: [
    { slug: 'rooftop-golden-hour', meta: 'West Hollywood · 2 tickets · Order #HT-20481' },
    { slug: 'the-supper-club-table', meta: 'Los Feliz · 1 ticket · Member price · Order #HT-20533' },
  ],
  past: [
    { slug: 'matcha-and-morning-pages', meta: 'Silver Lake · 1 ticket' },
    { slug: 'sunset-pilates-on-the-bluffs', meta: 'Pacific Palisades · 1 ticket' },
  ],
};
