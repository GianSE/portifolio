import { useRef } from 'react';
import { motion } from 'framer-motion';
import { getExperiences, localizeExperience } from '@/services/content.service';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { formatMonthYear } from '@/utils/format';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Section } from '@/components/Section/Section';
import styles from './Timeline.module.css';

export function Timeline() {
  const { locale } = useLocale();
  const t = STRINGS[locale].timeline;
  const experiences = getExperiences().map((e) => localizeExperience(e, locale));
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="timeline"
      eyebrow={t.eyebrow}
      title={t.title}
      subtitle={t.subtitle}
    >
      <div className={styles.wrap}>
        {/* Linha vertical animada */}
        <motion.div
          ref={lineRef}
          className={styles.line}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.ol
          className={styles.list}
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={exp.slug}
                className={[styles.item, isLeft ? styles.left : styles.right].join(' ')}
                variants={fadeInUp}
              >
                {/* Marcador */}
                <div className={styles.markerWrap}>
                  <motion.div
                    className={styles.marker}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Card */}
                <motion.div
                  className={styles.card}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.cardMeta}>
                    <span className={styles.area}>{exp.area}</span>
                    <span className={styles.dates}>
                      {formatMonthYear(exp.startDate, locale)} — {exp.current ? t.current : formatMonthYear(exp.endDate, locale)}
                    </span>
                  </div>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <p className={styles.org}>{exp.organization}</p>
                  <p className={styles.desc}>{exp.description}</p>

                  {exp.highlights.length > 0 && (
                    <ul className={styles.highlights}>
                      {exp.highlights.map((h) => (
                        <li key={h} className={styles.highlight}>
                          <span className={styles.bullet} aria-hidden="true">›</span>{h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.current && (
                    <span className={styles.currentBadge}>● {t.current}</span>
                  )}
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </Section>
  );
}
