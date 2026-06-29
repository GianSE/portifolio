/** Rola suavemente até a seção com o id informado, respeitando reduced-motion. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}
