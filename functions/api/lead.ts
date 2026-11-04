/**
 * POST /api/lead — notify-me and lead forms.
 * Accepts form-data or JSON. Validates server-side, drops honeypot spam,
 * forwards to LEAD_WEBHOOK_URL when set, otherwise logs and still returns success.
 */
interface Env { LEAD_WEBHOOK_URL?: string }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPIC = /^[a-z0-9:_-]{1,80}$/i;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let data: Record<string, string> = {};
  const type = request.headers.get('content-type') || '';
  try {
    if (type.includes('application/json')) {
      const body = (await request.json()) as Record<string, unknown>;
      for (const [k, v] of Object.entries(body)) if (typeof v === 'string') data[k] = v;
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) if (typeof v === 'string') data[k] = v;
    }
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: real people never fill this hidden field.
  if (data.company) return json({ ok: true });

  const email = (data.email || '').trim().toLowerCase();
  const topic = (data.topic || 'general').trim();
  if (!EMAIL.test(email) || email.length > 254) return json({ ok: false, error: 'Please enter a valid email address.' }, 422);
  if (!TOPIC.test(topic)) return json({ ok: false, error: 'Invalid form.' }, 422);

  const lead = {
    email,
    topic,
    name: (data.name || '').slice(0, 120) || undefined,
    page: request.headers.get('referer') || undefined,
    receivedAt: new Date().toISOString(),
  };

  if (env.LEAD_WEBHOOK_URL) {
    try {
      const res = await fetch(env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
      if (!res.ok) console.error('Lead webhook failed', res.status);
    } catch (err) {
      console.error('Lead webhook error', err);
    }
  } else {
    console.log('New lead (no LEAD_WEBHOOK_URL set):', JSON.stringify(lead));
  }
  // Forms submitted without JavaScript get a page, not JSON.
  if (!(request.headers.get('accept') || '').includes('application/json')) {
    return Response.redirect(new URL('/thank-you', request.url).toString(), 303);
  }
  return json({ ok: true });
};

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, error: 'Method not allowed.' }, 405);
