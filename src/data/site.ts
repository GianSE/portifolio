/**
 * Configuração estática do site: identidade, links sociais e navegação.
 * (Conteúdo editorial vem do CMS; isto são constantes de infraestrutura.)
 */

export interface NavLink {
  /** id da seção alvo na home (scroll-spy) */
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail' | 'cv';
}

export const SITE = {
  name: 'Gian Rodrigues',
  title: 'Engenheiro de Software e Dados',
  email: 'gianpedrodev@gmail.com',
  cvUrl: 'https://gianse.github.io/curriculo/',
  githubUrl: 'https://github.com/gianSE',
  linkedinUrl: 'https://www.linkedin.com/in/gian-pedro-rodrigues-3b6a44259/',
  url: 'https://gianrodrigues.dev',
} as const;

export const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'skills', label: 'Competências' },
  { id: 'projects', label: 'Projetos' },
  { id: 'architectures', label: 'Arquiteturas' },
  { id: 'dashboards', label: 'Dashboards' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'contact', label: 'Contato' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: SITE.githubUrl, icon: 'github' },
  { label: 'LinkedIn', href: SITE.linkedinUrl, icon: 'linkedin' },
  { label: 'E-mail', href: `mailto:${SITE.email}`, icon: 'mail' },
];
