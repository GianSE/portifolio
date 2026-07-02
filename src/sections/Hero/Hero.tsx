import { motion } from 'framer-motion';
import { SITE, SOCIAL_LINKS } from '@/data/site';
import type { AboutContent } from '@/types/content';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { fadeInUp, scaleIn, staggerContainer } from '@/animations/variants';
import { scrollToSection } from '@/utils/scroll';
import { Button } from '@/components/Button/Button';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon, type IconName } from '@/components/Icon/Icon';
import styles from './Hero.module.css';

const FALLBACK_ROLES = [
  'Software Engineer',
  'Data Engineer',
  'Full Stack Developer',
  'Solutions Architect',
];

interface HeroProps {
  about?: AboutContent;
}

export function Hero({ about }: HeroProps) {
  const roles = about?.roles?.length ? about.roles : FALLBACK_ROLES;
  const typed = useTypewriter(roles);
  const { locale } = useLocale();
  const t = STRINGS[locale].hero;

  return (
    <section id="hero" className={styles.hero}>
      <div className={`container ${styles.grid}`}>
        <motion.div
          className={styles.content}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeInUp} className={styles.badge}>
            <span className={styles.dot} />
            {about?.heroBadge ?? 'Disponível para novos desafios'}
          </motion.span>

          <motion.h1 variants={fadeInUp} className={styles.name}>
            {SITE.name}
          </motion.h1>

          <motion.div variants={fadeInUp} className={styles.typewriter}>
            <span className="gradient-text">{typed}</span>
            <span className={styles.caret} aria-hidden="true" />
          </motion.div>

          <motion.p variants={fadeInUp} className={styles.subtitle}>
            {about?.subheadline ??
              'Construindo plataformas corporativas escaláveis, arquiteturas de dados e soluções de autenticação centralizada.'}
          </motion.p>

          <motion.div variants={fadeInUp} className={styles.actions}>
            <Button onClick={() => scrollToSection('projects')}>
              {t.viewProjects}
              <Icon name="arrow-right" size={16} />
            </Button>
            <Button
              as="a"
              href={SITE.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <Icon name="download" size={16} />
              {t.downloadCv}
            </Button>
            <Button onClick={() => scrollToSection('contact')} variant="ghost">
              {t.contact}
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className={styles.social}
              >
                <Icon name={s.icon as IconName} size={20} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.avatarWrap}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <Avatar src={about?.avatar} alt={`Foto de ${SITE.name}`} initials="GR" />
        </motion.div>
      </div>

      <motion.button
        className={styles.scrollHint}
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label={t.scrollToAbout}
      >
        <span className={styles.mouse}>
          <span className={styles.wheel} />
        </span>
      </motion.button>
    </section>
  );
}
