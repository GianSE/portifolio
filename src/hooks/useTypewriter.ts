import { useEffect, useState } from 'react';

interface TypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
}

/**
 * Efeito de digitação automática que percorre uma lista de palavras,
 * digitando e apagando em loop. Respeita prefers-reduced-motion
 * (mostra apenas a primeira palavra, sem animação).
 */
export function useTypewriter(
  words: string[],
  { typeSpeed = 90, deleteSpeed = 45, pauseMs = 1400 }: TypewriterOptions = {},
): string {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setText(words[0]);
      return;
    }

    const current = words[wordIndex % words.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const next = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);

    const t = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
}
