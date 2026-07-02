import { motion } from 'framer-motion';
import type { AboutContent } from '@/types/content';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from '@/animations/variants';
import { useCounter } from '@/hooks/useCounter';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Section } from '@/components/Section/Section';
import styles from './About.module.css';

const FALLBACK_EXPERTISE = [
  'Desenvolvimento Full Stack', 'Sistemas Corporativos', 'Engenharia de Dados',
  'Arquitetura Empresarial', 'Business Intelligence', 'DevOps', 'Segurança e SSO',
];

const FALLBACK_PARAGRAPHS = [
  'Atuo no desenho e na construção de plataformas corporativas de ponta a ponta — da modelagem de dados à interface, passando por integração de sistemas, automação e segurança.',
  'Tenho foco em arquiteturas escaláveis, pipelines de dados confiáveis e camadas analíticas que transformam dados brutos em decisão de negócio.',
  'Na frente de segurança, trabalho com autenticação centralizada (SSO), OAuth2 e OpenID Connect, garantindo acesso unificado e auditável.',
];

const FALLBACK_STATS = [
  { label: 'Projetos desenvolvidos', value: 24, suffix: '+' },
  { label: 'Dashboards criados', value: 18, suffix: '+' },
  { label: 'Sistemas integrados', value: 12, suffix: '' },
  { label: 'Usuários impactados', value: 5000, suffix: '+' },
];

interface StatItemProps { value: number; suffix?: string; label: string; locale: 'pt' | 'en'; }

function StatItem({ value, suffix = '', label, locale }: StatItemProps) {
  const [count, ref] = useCounter(value);
  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.statValue}>
        {count.toLocaleString(locale === 'en' ? 'en-US' : 'pt-BR')}{suffix}
      </span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

interface AboutProps { about?: AboutContent; }

export function About({ about }: AboutProps) {
  const { locale } = useLocale();
  const t = STRINGS[locale].about;
  const paragraphs = about?.paragraphs?.length ? about.paragraphs : FALLBACK_PARAGRAPHS;
  const expertise  = about?.expertise?.length  ? about.expertise  : FALLBACK_EXPERTISE;
  const stats      = about?.stats?.length      ? about.stats      : FALLBACK_STATS;

  return (
    <Section id="about" eyebrow={t.eyebrow} title={t.title}>
      <div className={styles.grid}>
        {/* Texto + expertise */}
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className={styles.prose}>
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className={styles.expertise}>
            <h3 className={styles.expertiseTitle}>{t.expertiseTitle}</h3>
            <motion.ul
              className={styles.expertiseList}
              variants={staggerContainer(0.07)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {expertise.map((item) => (
                <motion.li key={item} variants={fadeInUp} className={styles.expertiseItem}>
                  <span className={styles.expertiseDot} aria-hidden="true" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.statsWrap}
          variants={slideInRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <StatItem key={s.label} value={s.value} suffix={s.suffix} label={s.label} locale={locale} />
            ))}
          </div>

          {/* Card decorativo */}
          <motion.div
            className={styles.card}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            <span className={styles.cardLabel}>{t.techFocusLabel}</span>
            <p className={styles.cardText}>
              {t.techFocus[0]}<br />
              {t.techFocus[1]}<br />
              {t.techFocus[2]}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
