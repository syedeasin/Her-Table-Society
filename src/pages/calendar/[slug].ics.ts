import type { APIRoute } from 'astro';
import { events } from '../../data/site';

export function getStaticPaths() {
  return events.filter((e) => e.startISO).map((e) => ({ params: { slug: e.slug } }));
}

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s: string) => s.replace(/[\\,;]/g, '\\$&');

export const GET: APIRoute = ({ params }) => {
  const e = events.find((x) => x.slug === params.slug)!;
  const body = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//HER TABLE SOCIETY//Events//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:${e.slug}@hertablesociety.com`, `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.startISO!)}`, `DTEND:${stamp(e.endISO ?? e.startISO!)}`,
    `SUMMARY:${esc(`${e.title} · HER TABLE`)}`, `LOCATION:${esc(`${e.area}, Los Angeles`)}`,
    `DESCRIPTION:${esc('Exact address in your confirmation email. ' + e.about[0])}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
