/**
 * Tipos do conteúdo editorial (vindo do CMS em Markdown + front matter).
 *
 * Cada interface = uma coleção em content/. O front matter é tipado aqui;
 * o corpo Markdown vai em `body` (string) e o slug é derivado do nome do arquivo.
 */

/** Campos comuns a todo documento de conteúdo. */
export interface ContentMeta {
  /** derivado do nome do arquivo (sem extensão) */
  slug: string;
  /** corpo Markdown bruto (após o front matter) */
  body: string;
}

export type ProjectCategory = 'Full Stack' | 'Dados' | 'Pesquisa' | 'DevOps';

export interface Project extends ContentMeta {
  title: string;
  category: ProjectCategory;
  description: string;
  featured: boolean;
  technologies: string[];
  highlights: string[];
  cover?: string;
  github?: string;
  demo?: string;
  date: string; // ISO
  order?: number;
}

export interface ArchitectureNode {
  label: string;
  description?: string;
}

export interface Architecture extends ContentMeta {
  title: string;
  description: string;
  /** fluxo do diagrama: nós em sequência (renderizados em SVG/CSS) */
  flow: ArchitectureNode[];
  technologies: string[];
  date: string;
  order?: number;
}

export interface Experience extends ContentMeta {
  role: string;
  organization: string;
  startDate: string; // ISO (ano-mês)
  endDate?: string; // ausente = atual
  current: boolean;
  area: string; // ex.: "Engenharia de Dados"
  description: string;
  highlights: string[];
  order?: number;
}

export interface Certification extends ContentMeta {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  logo?: string;
}

export interface Article extends ContentMeta {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  cover?: string;
  externalUrl?: string;
}

/** ---------- Singletons (content/about) ---------- */

export interface SkillItem {
  name: string;
}

export interface SkillCategory {
  name: string;
  icon?: string;
  items: SkillItem[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface AboutContent extends ContentMeta {
  heroBadge: string;
  roles: string[]; // efeito de digitação no Hero
  headline: string;
  subheadline: string;
  avatar?: string;
  paragraphs: string[];
  expertise: string[]; // áreas destacadas em "Sobre Mim"
  stats: StatItem[];
  skills: SkillCategory[];
}
