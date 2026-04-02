export function maskPhone(digits: string): string {
  const d = digits.replace(/\D/g, '').slice(0, 11);
  if (d.length === 0) return '';
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function unmaskPhone(masked: string): string {
  return masked.replace(/\D/g, '');
}

export function toStoredFormat(digits: string): string {
  return `+55${digits.replace(/\D/g, '')}`;
}

export function toDisplayFormat(stored: string): string {
  const digits = stored.replace(/\D/g, '');
  const countryCode = digits.slice(0, 2);
  const number = digits.slice(2);
  return `+${countryCode} ${maskPhone(number)}`;
}
