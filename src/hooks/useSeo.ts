import { useEffect } from 'react';
import { SITE } from '@/data/site';

export interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  /** caminho relativo, ex: "/projetos/portal" */
  path?: string;
  type?: 'website' | 'article';
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Hook nativo de SEO — manipula <head> sem dependências externas.
 * Mantém o bundle leve (favorece Lighthouse).
 */
export function useSeo(options: SeoOptions = {}): void {
  const {
    title,
    description = 'Construindo plataformas corporativas escaláveis, arquiteturas de dados e soluções de autenticação centralizada.',
    image = `${SITE.url}/og-image.png`,
    path = '',
    type = 'website',
  } = options;

  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.title}`;
  const canonical = `${SITE.url}${path}`;

  useEffect(() => {
    document.title = fullTitle;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);
    upsertCanonical(canonical);
  }, [fullTitle, description, image, canonical, type]);
}
