import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restaura o scroll ao topo em troca de rota — exceto quando há hash
 * (âncora), caso em que deixa o navegador/scroll-spy cuidar.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
