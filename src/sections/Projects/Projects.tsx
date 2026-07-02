import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProjects, getProjectCategories, localizeProject } from '@/services/content.service';
import { staggerContainer, viewportOnce } from '@/animations/variants';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Section } from '@/components/Section/Section';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

const ALL = 'Todos';

export function Projects() {
  const { locale } = useLocale();
  const t = STRINGS[locale].projects;
  const projects = getProjects().map((p) => localizeProject(p, locale));
  const rawCategories = getProjectCategories();
  const filters = [ALL, ...rawCategories];
  const [active, setActive] = useState(ALL);

  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <Section
      id="projects"
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
    >
      {/* Filtros */}
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={[styles.filter, active === f ? styles.filterActive : ''].join(' ')}
            onClick={() => setActive(f)}
          >
            {f === ALL ? t.all : (t.categories[f] ?? f)}
          </button>
        ))}
      </div>

      {/* Grid com AnimatePresence para saída fluída */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className={styles.grid}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          viewport={viewportOnce}
        >
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} categoryLabel={t.categories[project.category] ?? project.category} />
          ))}
        </motion.div>
      </AnimatePresence>

      {visible.length === 0 && (
        <p className={styles.empty}>{t.empty}</p>
      )}
    </Section>
  );
}
