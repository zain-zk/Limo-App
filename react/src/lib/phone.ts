export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

/** Digits-only form of the seeded placeholder (+1 234 567 890 / +1234567890). */
const PLACEHOLDER_DIGITS = '1234567890';

/** Real CMS phone for schema.org, or null when unset or still the placeholder. */
export function schemaTelephone(phone?: string | null): string | null {
  const trimmed = phone?.trim() || '';
  if (!trimmed) return null;
  const digits = trimmed.replace(/\D/g, '');
  if (!digits || digits === PLACEHOLDER_DIGITS) return null;
  return trimmed;
}
