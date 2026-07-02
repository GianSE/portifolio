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
  /** corpo Markdown em inglês (opcional — fallback é `body`) */
  body_en?: string;
}

export type ProjectCategory = 'Full Stack' | 'Dados' | 'Pesquisa' | 'DevOps';

export interface Project extends ContentMeta {
  title: string;
  title_en?: string;
  category: ProjectCategory;
  description: string;
  description_en?: string;
  featured: boolean;
  technologies: string[];
  highlights: string[];
  highlights_en?: string[];
  cover?: string;
  github?: string;
  demo?: string;
  date: string; // ISO
  order?: number;
}

export interface ArchitectureNode {
  label: string;
  label_en?: string;
  description?: string;
  description_en?: string;
}

export interface Architecture extends ContentMeta {
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  /** fluxo do diagrama: nós em sequência (renderizados em SVG/CSS) */
  flow: ArchitectureNode[];
  technologies: string[];
  date: string;
  order?: number;
}

export interface Experience extends ContentMeta {
  role: string;
  role_en?: string;
  organization: string;
  startDate: string; // ISO (ano-mês)
  endDate?: string; // ausente = atual
  current: boolean;
  area: string; // ex.: "Engenharia de Dados"
  area_en?: string;
  description: string;
  description_en?: string;
  highlights: string[];
  highlights_en?: string[];
  order?: number;
  /** false = aparece só no currículo, não na Timeline pública do portfólio (default true) */
  showInTimeline?: boolean;
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
  name_en?: string;
  icon?: string;
  items: SkillItem[];
}

export interface StatItem {
  label: string;
  label_en?: string;
  value: number;
  suffix?: string;
}

export interface LanguageItem {
  name: string;
  name_en?: string;
  level: string;
  level_en?: string;
}

export interface AboutContent extends ContentMeta {
  heroBadge: string;
  heroBadge_en?: string;
  roles: string[]; // efeito de digitação no Hero (já em inglês, sem tradução)
  headline: string;
  headline_en?: string;
  subheadline: string;
  subheadline_en?: string;
  avatar?: string;
  paragraphs: string[];
  paragraphs_en?: string[];
  expertise: string[]; // áreas destacadas em "Sobre Mim"
  expertise_en?: string[];
  stats: StatItem[];
  skills: SkillCategory[];
  /** Campos específicos do currículo — deriva do mesmo "about", nunca diverge do portfólio */
  cvSummary?: string;
  cvSummary_en?: string;
  cvObjective?: string;
  cvObjective_en?: string;
  languages?: LanguageItem[];
}
