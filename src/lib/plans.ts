/** Client-side plan helpers for the join flow (demo dates match the Figma example member). */
export interface PlanInfo { id: string; months: number; price: number; renews: boolean }
export const PLANS: PlanInfo[] = [
  { id: 'intro', months: 3, price: 150, renews: false },
  { id: '6-months', months: 6, price: 300, renews: true },
  { id: '12-months', months: 12, price: 600, renews: true },
];
const RENEW: Record<string, string> = { intro: 'February 22, 2027', '6-months': 'May 22, 2027', '12-months': 'November 22, 2027' };

export const getPlan = (id?: string | null) => PLANS.find((p) => p.id === id) ?? PLANS[1];

export function planText(p: PlanInfo) {
  return {
    name: p.id === 'intro' ? 'Introductory membership' : `${p.months}-month membership`,
    detail: `${p.months} months · ${p.renews ? 'Renews automatically' : 'Paid upfront, no auto charge'}`,
    review: `${p.months} months · $${p.price} · ${p.renews ? 'renews automatically' : 'no auto charge'}`,
    line: `HER TABLE Membership · ${p.months} months`,
    price: `$${p.price}`,
    renewDate: RENEW[p.id],
    note: p.renews
      ? `Renews on ${RENEW[p.id]} for $${p.price}. We’ll email you 14 and 3 days before. Switch plan or cancel any time before then.`
      : `Introductory plan: no auto charge. It ends on ${RENEW[p.id]} and we’ll remind you to choose 6 or 12 months before then.`,
  };
}

/** Fill every [data-sum] / [data-plan] hook on the page for the chosen plan. */
export function renderPlan(p: PlanInfo) {
  const t = planText(p);
  const set = (sel: string, v: string) => document.querySelectorAll<HTMLElement>(sel).forEach((el) => (el.textContent = v));
  set('[data-sum="detail"]', t.detail);
  set('[data-sum="plan-label"]', `${p.months}-month membership`);
  set('[data-sum="plan-value"]', t.price);
  set('[data-sum="total"]', t.price);
  set('[data-sum="note"]', t.note);
  set('[data-sum="line"]', t.line);
  set('[data-plan="review"]', t.review);
  set('[data-plan="name"]', t.name);
  set('[data-plan="renew"]', t.renewDate);
  document.querySelectorAll<HTMLElement>('[data-plan="pay"] span:first-child').forEach((el) => (el.textContent = el.textContent!.replace(/\$\d+/, t.price)));
}
