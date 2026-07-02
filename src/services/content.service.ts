/**
 * Camada de acesso ao conteúdo editorial.
 *
 * Lê todos os `.md` de content/ via import.meta.glob (eager). O parse do
 * front matter já foi feito em build-time pelo vite-plugin-content, então
 * aqui recebemos objetos prontos e apenas tipamos, ordenamos e expomos.
 *
 * Adicionar um novo arquivo .md em content/ é refletido automaticamente —
 * nenhum componente React precisa ser alterado.
 */
import type {
  AboutContent,
  Architecture,
  Article,
  Certification,
  Experience,
  Project,
} from '@/types/content';
import type { Locale } from '@/types/locale';

type Module<T> = { default: T };

/** Converte o mapa do glob num array, na ordem dos arquivos. */
function collect<T>(modules: Record<string, Module<T>>): T[] {
  return Object.values(modules).map((m) => m.default);
}

/** Ordena por `order` (asc) e, como desempate, por `date` (desc). */
function sortByOrderThenDate<T extends { order?: number; date?: string }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return (b.date ?? '').localeCompare(a.date ?? '');
  });
}

/* ------------------------------ Projetos ------------------------------ */
const projectModules = import.meta.glob<Module<Project>>('/content/projects/*.md', {
  eager: true,
});

export function getProjects(): Project[] {
  return sortByOrderThenDate(collect(projectModules));
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

/** Categorias presentes (para construir filtros dinamicamente). */
export function getProjectCategories(): string[] {
  return Array.from(new Set(getProjects().map((p) => p.category)));
}

/* ---------------------------- Arquiteturas ---------------------------- */
const architectureModules = import.meta.glob<Module<Architecture>>(
  '/content/architectures/*.md',
  { eager: true },
);

export function getArchitectures(): Architecture[] {
  return sortByOrderThenDate(collect(architectureModules));
}

/* ---------------------------- Experiências ---------------------------- */
const experienceModules = import.meta.glob<Module<Experience>>(
  '/content/experiences/*.md',
  { eager: true },
);

export function getExperiences(): Experience[] {
  // Timeline: mais recente primeiro (por startDate desc), respeitando order.
  return [...collect(experienceModules)].sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return (b.startDate ?? '').localeCompare(a.startDate ?? '');
  });
}

/* --------------------------- Certificações ---------------------------- */
const certificationModules = import.meta.glob<Module<Certification>>(
  '/content/certifications/*.md',
  { eager: true },
);

export function getCertifications(): Certification[] {
  return sortByOrderThenDate(collect(certificationModules));
}

/* ------------------------------ Artigos ------------------------------- */
const articleModules = import.meta.glob<Module<Article>>('/content/articles/*.md', {
  eager: true,
});

export function getArticles(): Article[] {
  return sortByOrderThenDate(collect(articleModules));
}

/* --------------------------- About (singleton) ------------------------ */
const aboutModules = import.meta.glob<Module<AboutContent>>('/content/about/*.md', {
  eager: true,
});

export function getAbout(): AboutContent | undefined {
  return collect(aboutModules)[0];
}

/* ---------------------------- Localização ------------------------------
 * Conteúdo é sempre autorado em pt (fonte). Campos `*_en` são opcionais —
 * quando ausentes, cai de volta para o valor em pt automaticamente.
 * ------------------------------------------------------------------------ */

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale !== 'en') return project;
  return {
    ...project,
    title: project.title_en || project.title,
    description: project.description_en || project.description,
    highlights: project.highlights_en?.length ? project.highlights_en : project.highlights,
    body: project.body_en || project.body,
  };
}

export function localizeArchitecture(architecture: Architecture, locale: Locale): Architecture {
  if (locale !== 'en') return architecture;
  return {
    ...architecture,
    title: architecture.title_en || architecture.title,
    description: architecture.description_en || architecture.description,
    body: architecture.body_en || architecture.body,
    flow: architecture.flow.map((node) => ({
      ...node,
      label: node.label_en || node.label,
      description: node.description_en || node.description,
    })),
  };
}

export function localizeExperience(experience: Experience, locale: Locale): Experience {
  if (locale !== 'en') return experience;
  return {
    ...experience,
    role: experience.role_en || experience.role,
    area: experience.area_en || experience.area,
    description: experience.description_en || experience.description,
    highlights: experience.highlights_en?.length ? experience.highlights_en : experience.highlights,
  };
}

export function localizeAbout(about: AboutContent, locale: Locale): AboutContent {
  if (locale !== 'en') return about;
  return {
    ...about,
    heroBadge: about.heroBadge_en || about.heroBadge,
    headline: about.headline_en || about.headline,
    subheadline: about.subheadline_en || about.subheadline,
    paragraphs: about.paragraphs_en?.length ? about.paragraphs_en : about.paragraphs,
    expertise: about.expertise_en?.length ? about.expertise_en : about.expertise,
    stats: about.stats.map((s) => ({ ...s, label: s.label_en || s.label })),
    skills: about.skills.map((sk) => ({ ...sk, name: sk.name_en || sk.name })),
  };
}
