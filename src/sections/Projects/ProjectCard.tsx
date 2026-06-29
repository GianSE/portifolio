import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Project } from '@/types/content';
import { scaleIn } from '@/animations/variants';
import { Tag } from '@/components/Tag/Tag';
import { Icon } from '@/components/Icon/Icon';
import styles from './ProjectCard.module.css';

interface ProjectCardProps { project: Project; }

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, title, category, description, technologies, highlights, cover, github, demo } = project;

  return (
    <motion.article
      className={styles.card}
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Cover */}
      <div className={styles.cover}>
        {cover ? (
          <img src={cover} alt={title} className={styles.img} loading="lazy" decoding="async" />
        ) : (
          <div className={styles.coverFallback} aria-hidden="true">
            <span className={styles.coverInitial}>{title[0]}</span>
          </div>
        )}
        <Tag variant="accent">{category}</Tag>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {highlights.length > 0 && (
          <ul className={styles.highlights}>
            {highlights.slice(0, 2).map((h) => (
              <li key={h} className={styles.highlightItem}>
                <span className={styles.bullet} aria-hidden="true">›</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech tags */}
        <div className={styles.tags}>
          {technologies.slice(0, 5).map((t) => <Tag key={t}>{t}</Tag>)}
          {technologies.length > 5 && <Tag>+{technologies.length - 5}</Tag>}
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Link to={`/projetos/${slug}`} className={styles.detailLink}>
          Ver detalhes
          <Icon name="arrow-right" size={14} />
        </Link>
        <div className={styles.links}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.iconLink}>
              <Icon name="github" size={18} />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" aria-label="Demo" className={styles.iconLink}>
              <Icon name="external" size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
