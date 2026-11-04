/**
 * Small, serialisable event list for client scripts (checkout pages read ?event=slug&qty=n).
 * Thumbnails are resolved at build time with getImage so the client gets optimised URLs.
 */
import { getImage } from 'astro:assets';
import { events } from '../data/site';
import { images } from '../data/images';

export interface ClientEvent { slug: string; title: string; dateShort: string; dateLong: string; area: string; dressCode: string; price: number | null; memberPrice: number | null; thumb: string }

export async function clientEvents(): Promise<ClientEvent[]> {
  return Promise.all(events.map(async (e) => {
    const img = await getImage({ src: images[e.image], width: 144, height: 144, format: 'webp' });
    return { slug: e.slug, title: e.title, dateShort: e.dateShort, dateLong: e.dateLong, area: e.area, dressCode: e.dressCode, price: e.price, memberPrice: e.memberPrice, thumb: img.src };
  }));
}
