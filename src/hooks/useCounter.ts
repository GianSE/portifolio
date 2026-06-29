import { useEffect, useRef, useState } from 'react';

/**
 * Anima um contador de 0 até `target` quando o elemento entra na viewport.
 * Respeita prefers-reduced-motion (pula direto ao valor final).
 */
export function useCounter(target: number, durationMs = 1600): [number, (el: Element | null) => void] {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const refCallback = (el: Element | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observerRef.current.observe(el);
  };

  useEffect(() => {
    if (!hasStarted) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setCount(target); return; }

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setCount(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, target, durationMs]);

  return [count, refCallback];
}
