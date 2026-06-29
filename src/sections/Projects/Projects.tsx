import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getProjects, getProjectCategories } from '@/services/content.service';
import { staggerContainer, viewportOnce } from '@/animations/variants';
import { Section } from '@/components/Section/Section';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

const ALL = 'Todos';

export function Projects() {
  const projects = getProjects();
  const rawCategories = getProjectCategories();
  const filters = [ALL, ...rawCategories];
  const [active, setActive] = useState(ALL);

  const visible = active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <Section
      id="projects"
      eyebrow="// projetos"
      title="O que construí"
      subtitle="Sistemas, plataformas e soluções construídos do conceito ao deploy."
    >
      {/* Filtros */}
      <div className={styles.filters}>
        {filters.map((f) => (
          <button
            key={f}
            className={[styles.filter, active === f ? styles.filterActive : ''].join(' ')}
            onClick={() => setActive(f)}
          >
            {f}
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
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {visible.length === 0 && (
        <p className={styles.empty}>Nenhum projeto nesta categoria ainda.</p>
      )}
    </Section>
  );
}
