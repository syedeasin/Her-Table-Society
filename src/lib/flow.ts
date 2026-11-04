/**
 * Front-end state for the join and checkout flows, kept in sessionStorage until Stripe takes over.
 * Swap these for real API calls when the backend is built.
 */
export interface FlowData { [key: string]: string }
const KEY = 'hts-flow';

export function readFlow(): FlowData {
  try { return JSON.parse(sessionStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
export function saveFlow(patch: FlowData) {
  try { sessionStorage.setItem(KEY, JSON.stringify({ ...readFlow(), ...patch })); } catch { /* storage blocked */ }
}
/** Fill [data-flow="key"] elements with stored values (keeps the static demo text when nothing is stored). */
export function fillFlow(data = readFlow()) {
  document.querySelectorAll<HTMLElement>('[data-flow]').forEach((el) => {
    const v = data[el.dataset.flow!];
    if (v) el.textContent = v;
  });
}
/** Restore saved values into form inputs. */
export function restoreForm(form: HTMLFormElement, data = readFlow()) {
  form.querySelectorAll<HTMLInputElement>('input[name]').forEach((i) => {
    const v = data[i.name];
    if (v == null || i.type === 'password') return;
    if (i.type === 'checkbox' || i.type === 'radio') i.checked = i.type === 'radio' ? i.value === v : v === 'yes';
    else i.value = v;
  });
}
export function formToFlow(form: HTMLFormElement): FlowData {
  const out: FlowData = {};
  form.querySelectorAll<HTMLInputElement>('input[name]').forEach((i) => {
    if (i.type === 'password' || i.name === 'company') return;
    if (i.type === 'checkbox') out[i.name] = i.checked ? 'yes' : 'no';
    else if (i.type === 'radio') { if (i.checked) out[i.name] = i.value; }
    else out[i.name] = i.value.trim();
  });
  return out;
}
