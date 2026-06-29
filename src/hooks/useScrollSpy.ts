import { useEffect, useState } from 'react';

/**
 * Observa as seções pelos seus ids e retorna o id da seção ativa
 * (scroll-spy) usando IntersectionObserver — sem listeners de scroll caros.
 */
export function useScrollSpy(ids: string[], offset = 0.4): string {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // ativa quando a seção cruza ~40% da viewport
        rootMargin: `-${offset * 100}% 0px -${(1 - offset) * 100}% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return activeId;
}
