import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSeo } from '@/hooks/useSeo';
import { getProjectBySlug } from '@/services/content.service';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import { Tag } from '@/components/Tag/Tag';
import { Icon } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import styles from './ProjectDetailPage.module.css';

export default function ProjectDetailPage() {
  const { slug = '' } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/404" replace />;

  const { title, category, description, technologies, highlights, cover, github, demo, date, body } = project;

  useSeo({ title, path: `/projetos/${slug}` });

  return (
    <motion.article
      className={styles.wrap}
      variants={staggerContainer(0.08)}
      initial="hidden"
      animate="visible"
    >
      {/* Hero do projeto */}
      <div className={styles.hero}>
        {cover && (
          <div className={styles.coverWrap}>
            <img src={cover} alt={title} className={styles.cover} />
            <div className={styles.coverOverlay} />
          </div>
        )}
        <div className={`container ${styles.heroContent}`}>
          <motion.div variants={fadeInUp}>
            <Link to="/#projects" className={styles.back}>
              ← Voltar aos projetos
            </Link>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <Tag variant="accent">{category}</Tag>
          </motion.div>
          <motion.h1 variants={fadeInUp} className={styles.title}>{title}</motion.h1>
          <motion.p variants={fadeInUp} className={styles.description}>{description}</motion.p>
          <motion.div variants={fadeInUp} className={styles.actions}>
            {github && (
              <Button as="a" href={github} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                <Icon name="github" size={16} /> GitHub
              </Button>
            )}
            {demo && (
              <Button as="a" href={demo} target="_blank" rel="noopener noreferrer" size="sm">
                <Icon name="external" size={16} /> Demo ao vivo
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          {/* Conteúdo Markdown */}
          <motion.div variants={fadeInUp} className={styles.body}>
            {/* Renderiza o body Markdown como texto (rich content no Sprint futuro) */}
            <pre className={styles.prose}>{body}</pre>
          </motion.div>

          {/* Sidebar */}
          <motion.aside variants={fadeInUp} className={styles.sidebar}>
            {highlights.length > 0 && (
              <div className={styles.sideSection}>
                <h2 className={styles.sideTitle}>Destaques</h2>
                <ul className={styles.highlightList}>
                  {highlights.map((h) => (
                    <li key={h} className={styles.highlightItem}>
                      <span className={styles.bullet}>›</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Tecnologias</h2>
              <div className={styles.tags}>
                {technologies.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>

            <div className={styles.sideSection}>
              <h2 className={styles.sideTitle}>Data</h2>
              <p className={styles.date}>{new Date(date).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.article>
  );
}
