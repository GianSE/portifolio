/** Formata uma data ISO (YYYY-MM-DD ou YYYY-MM) em "mês/ano". */
export function formatMonthYear(iso?: string, locale: 'pt' | 'en' = 'pt'): string {
  if (!iso) return locale === 'en' ? 'Current' : 'Atual';
  const [year, month] = iso.split('-');
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'pt-BR', {
    month: 'short',
    year: 'numeric',
  });
}

/** Retorna apenas o ano de uma data ISO. */
export function formatYear(iso?: string): string {
  if (!iso) return 'Atual';
  return iso.split('-')[0];
}
