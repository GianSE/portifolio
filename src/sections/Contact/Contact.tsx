import { motion } from 'framer-motion';
import { SITE, SOCIAL_LINKS } from '@/data/site';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { Section } from '@/components/Section/Section';
import { Icon, type IconName } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="// contato"
      title="Vamos conversar"
      subtitle="Aberto a projetos, oportunidades e colaborações técnicas."
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
          <h3 className={styles.cardTitle}>Entre em contato</h3>
          <p className={styles.cardText}>
            Prefira o e-mail para propostas de projeto ou oportunidades.
            Respondo em até 48h.
          </p>

          <Button
            as="a"
            href={`mailto:${SITE.email}`}
            className={styles.emailBtn}
          >
            <Icon name="mail" size={18} />
            {SITE.email}
          </Button>

          <div className={styles.divider}>
            <span>ou conecte-se</span>
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
          <span className={styles.label}>// currículo</span>
          <h3 className={styles.cardTitle}>Ver meu CV</h3>
          <p className={styles.cardText}>
            Formação, trajetória completa e projetos acadêmicos disponíveis no
            currículo publicado.
          </p>
          <Button
            as="a"
            href={SITE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <Icon name="download" size={16} />
            Abrir currículo
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
