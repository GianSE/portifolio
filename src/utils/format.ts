/** Formata uma data ISO (YYYY-MM-DD ou YYYY-MM) em "mês/ano" pt-BR. */
export function formatMonthYear(iso?: string): string {
  if (!iso) return 'Atual';
  const [year, month] = iso.split('-');
  if (!month) return year;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

/** Retorna apenas o ano de uma data ISO. */
export function formatYear(iso?: string): string {
  if (!iso) return 'Atual';
  return iso.split('-')[0];
}
