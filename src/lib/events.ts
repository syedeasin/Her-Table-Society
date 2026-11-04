import { categories, events, table01, type HtsEvent, type CategorySlug } from '../data/site';
import type { BadgeStatus } from './badges';

export const categoryName = (slug: CategorySlug) => categories.find((c) => c.slug === slug)?.name ?? '';

/** One badge per event, by priority. Plain public events with seats show no badge (Figma: Sunset Pilates). */
export function badgeFor(e: HtsEvent): BadgeStatus | null {
  if (e.status === 'date-soon') return 'date-soon';
  if (e.status === 'sold-out') return 'sold-out';
  if (e.access === 'members-only') return 'members-only';
  if (e.access === 'early-access') return 'early-access';
  if (e.access === 'member-price') return 'member-price';
  if (e.status === 'few-left') return 'few-left';
  return null;
}

/** Button label on event cards (Figma Event Card). */
export function cardCta(e: HtsEvent): { label: string; soldOut?: boolean } {
  if (e.status === 'sold-out') return { label: 'Sold out', soldOut: true };
  if (e.access === 'members-only') return { label: 'Members only' };
  if (e.access === 'early-access') return { label: 'Member access' };
  return { label: 'View event' };
}

export type PanelState = 'public-sale' | 'early-access' | 'sold-out' | 'members-only' | 'date-soon' | 'pricing-soon';

/** Ticket panel state (Figma "Ticket Panel" variants), derived from the event data. */
export function panelState(e: HtsEvent): PanelState {
  if (e.status === 'date-soon') return 'date-soon';
  if (e.status === 'sold-out') return 'sold-out';
  if (e.access === 'members-only') return 'members-only';
  if (e.access === 'early-access') return 'early-access';
  if (e.price == null) return 'pricing-soon';
  return 'public-sale';
}

export const eventHref = (e: HtsEvent) => (e.launch ? '/table-01' : `/events/${e.slug}`);
export const formatPrice = (n: number | null | undefined) => (n == null ? null : `$${n.toLocaleString('en-US')}`);
export const getEvent = (slug: string) => (slug === table01.slug ? (table01 as HtsEvent) : events.find((e) => e.slug === slug));
export const relatedEvents = (slug: string, n = 3) => events.filter((e) => e.slug !== slug).slice(0, n);

/** Google / Outlook calendar links (Apple uses the .ics file). */
export function calendarLinks(e: HtsEvent) {
  if (!e.startISO) return null;
  const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = stamp(e.startISO);
  const end = stamp(e.endISO ?? e.startISO);
  const text = encodeURIComponent(`${e.title} · HER TABLE`);
  const loc = encodeURIComponent(`${e.area}, Los Angeles`);
  const details = encodeURIComponent('Exact address in your confirmation email.');
  return {
    google: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&location=${loc}&details=${details}`,
    apple: `/calendar/${e.slug}.ics`,
    outlook: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${text}&startdt=${encodeURIComponent(e.startISO)}&enddt=${encodeURIComponent(e.endISO ?? e.startISO)}&location=${loc}&body=${details}`,
  };
}
