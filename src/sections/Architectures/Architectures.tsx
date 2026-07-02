import { motion } from 'framer-motion';
import { getArchitectures, localizeArchitecture } from '@/services/content.service';
import type { Architecture } from '@/types/content';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Section } from '@/components/Section/Section';
import { Tag } from '@/components/Tag/Tag';
import styles from './Architectures.module.css';

interface DiagramProps { arch: Architecture; }

function Diagram({ arch }: DiagramProps) {
  const { flow = [], title, description, technologies, body } = arch;

  return (
    <motion.div
      className={styles.card}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
    >
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{description}</p>

      {/* Diagrama de fluxo SVG/CSS */}
      {flow.length > 0 && (
        <div className={styles.flow} role="img" aria-label={`Diagrama: ${title}`}>
          {flow.map((node, i) => (
            <div key={node.label} className={styles.flowRow}>
              <motion.div
                className={styles.node}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.nodeLabel}>{node.label}</span>
                {node.description && (
                  <span className={styles.nodeDesc}>{node.description}</span>
                )}
              </motion.div>

              {i < flow.length - 1 && (
                <motion.svg
                  className={styles.arrow}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.15 }}
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </motion.svg>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Descrição detalhada do Markdown (apenas primeiras linhas) */}
      {body && (
        <p className={styles.body}>{body.split('\n').filter(Boolean)[0]}</p>
      )}

      {/* Tech tags */}
      {technologies?.length > 0 && (
        <div className={styles.tags}>
          {technologies.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      )}
    </motion.div>
  );
}

export function Architectures() {
  const { locale } = useLocale();
  const t = STRINGS[locale].architectures;
  const architectures = getArchitectures().map((a) => localizeArchitecture(a, locale));

  return (
    <Section
      id="architectures"
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
    >
      <motion.div
        className={styles.grid}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {architectures.map((arch) => (
          <Diagram key={arch.slug} arch={arch} />
        ))}
      </motion.div>
    </Section>
  );
}
