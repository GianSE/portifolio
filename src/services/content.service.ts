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
  Dashboard,
  Experience,
  Project,
} from '@/types/content';

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

/* ----------------------------- Dashboards ----------------------------- */
const dashboardModules = import.meta.glob<Module<Dashboard>>(
  '/content/dashboards/*.md',
  { eager: true },
);

export function getDashboards(): Dashboard[] {
  return sortByOrderThenDate(collect(dashboardModules));
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
