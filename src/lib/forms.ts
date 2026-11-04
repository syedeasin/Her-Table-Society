/**
 * Client helpers: lead / notify forms (POST /api/lead) and simple required-field validation for flow forms.
 */
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function setError(input: HTMLInputElement, msg: string | null) {
  const field = input.closest('[data-field]');
  const err = field?.querySelector<HTMLElement>('[data-field-error]');
  if (msg) { input.setAttribute('aria-invalid', 'true'); if (err) { err.textContent = msg; err.classList.remove('hidden'); } }
  else { input.removeAttribute('aria-invalid'); err?.classList.add('hidden'); }
}

/** Validates inputs inside a form. Returns true when valid; focuses the first invalid field. */
export function validate(form: HTMLFormElement): boolean {
  let first: HTMLElement | null = null;
  form.querySelectorAll<HTMLInputElement>('input[data-validate], input[required]').forEach((input) => {
    if (input.type === 'checkbox') {
      const ok = input.checked || !input.required;
      const box = input.closest('[data-check-group]')?.querySelector<HTMLElement>('[data-check-error]');
      if (!ok) { box?.classList.remove('hidden'); first ??= input; } else box?.classList.add('hidden');
      return;
    }
    const v = input.value.trim();
    let msg: string | null = null;
    if (input.required && !v) msg = 'This field is required';
    else if (input.type === 'email' && v && !emailOk(v)) msg = 'Please enter a valid email address';
    else if (input.type === 'password' && input.required && v.length < 8) msg = 'Use at least 8 characters';
    setError(input, msg);
    if (msg) first ??= input;
  });
  (first as HTMLElement | null)?.focus();
  return !first;
}

/** Progressive enhancement for notify / lead forms. */
export function initLeadForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]:not([data-ready])').forEach((form) => {
    form.dataset.ready = 'true';
    const status = form.querySelector<HTMLElement>('[data-status]');
    const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      if (!validate(form)) return;
      submit?.setAttribute('aria-busy', 'true');
      if (submit) submit.disabled = true;
      try {
        const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
        form.reset();
        if (status) { status.textContent = form.dataset.success || 'Thank you. We’ll be in touch.'; status.className = 'font-sans text-[14px] leading-5 text-green'; }
      } catch (e) {
        if (status) { status.textContent = e instanceof Error ? e.message : 'Something went wrong. Please try again.'; status.className = 'font-sans text-[14px] leading-5 text-error'; }
      } finally {
        submit?.removeAttribute('aria-busy');
        if (submit) submit.disabled = false;
      }
    });
  });
}
