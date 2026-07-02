import { motion } from 'framer-motion';
import { SITE, SOCIAL_LINKS } from '@/data/site';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Section } from '@/components/Section/Section';
import { Icon, type IconName } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import styles from './Contact.module.css';

export function Contact() {
  const { locale } = useLocale();
  const t = STRINGS[locale].contact;

  return (
    <Section
      id="contact"
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
        {/* Card principal */}
        <motion.div variants={fadeInUp} className={styles.card}>
          <h3 className={styles.cardTitle}>{t.cardTitle}</h3>
          <p className={styles.cardText}>{t.cardText}</p>

          <Button
            as="a"
            href={`mailto:${SITE.email}`}
            className={styles.emailBtn}
          >
            <Icon name="mail" size={18} />
            {SITE.email}
          </Button>

          <div className={styles.divider}>
            <span>{t.connect}</span>
          </div>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={styles.social}
              >
                <Icon name={s.icon as IconName} size={20} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Card CV */}
        <motion.div variants={fadeInUp} className={styles.cardSecondary}>
          <span className={styles.label}>{t.cvLabel}</span>
          <h3 className={styles.cardTitle}>{t.cvTitle}</h3>
          <p className={styles.cardText}>{t.cvText}</p>
          <Button
            as="a"
            href={SITE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <Icon name="download" size={16} />
            {t.cvButton}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
