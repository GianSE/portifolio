import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AboutContent, SkillCategory } from '@/types/content';
import { fadeInUp, staggerContainer, viewportOnce } from '@/animations/variants';
import { Section } from '@/components/Section/Section';
import { Icon, type IconName } from '@/components/Icon/Icon';
import styles from './Skills.module.css';

const FALLBACK_SKILLS: SkillCategory[] = [
  { name: 'Desenvolvimento', icon: 'code',     items: [{ name:'JavaScript' },{ name:'TypeScript' },{ name:'React' },{ name:'Node.js' },{ name:'HTML' },{ name:'CSS' },{ name:'Kotlin' },{ name:'APIs REST' }] },
  { name: 'Dados',          icon: 'database',  items: [{ name:'SQL' },{ name:'PostgreSQL' },{ name:'ETL' },{ name:'Data Lake' },{ name:'Data Warehouse' },{ name:'Power BI' }] },
  { name: 'DevOps',         icon: 'server',    items: [{ name:'Docker' },{ name:'Linux' },{ name:'GitHub Actions' },{ name:'CI/CD' },{ name:'Nginx' },{ name:'Cloudflare' }] },
  { name: 'Segurança',      icon: 'shield',    items: [{ name:'Authentik' },{ name:'OAuth2' },{ name:'OpenID Connect' },{ name:'SSO' },{ name:'Infisical' }] },
];

interface SkillTagProps { name: string; delay: number; }

function SkillTag({ name, delay }: SkillTagProps) {
  return (
    <motion.span
      className={styles.tag}
      variants={fadeInUp}
      custom={delay}
      whileHover={{ y: -3, scale: 1.04 }}
      transition={{ duration: 0.2 }}
    >
      {name}
    </motion.span>
  );
}

interface CategoryCardProps { category: SkillCategory; index: number; active: boolean; onClick: () => void; }

function CategoryCard({ category, index, active, onClick }: CategoryCardProps) {
  return (
    <motion.div
      className={[styles.card, active ? styles.cardActive : ''].join(' ')}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      onClick={onClick}
    >
      <div className={styles.cardHeader}>
        <span className={styles.icon}>
          <Icon name={(category.icon ?? 'code') as IconName} size={20} />
        </span>
        <h3 className={styles.cardTitle}>{category.name}</h3>
        <span className={styles.count}>{category.items.length}</span>
      </div>

      <motion.div
        className={styles.tags}
        variants={staggerContainer(0.04, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {category.items.map((item, i) => (
          <SkillTag key={item.name} name={item.name} delay={i * 0.04} />
        ))}
      </motion.div>

      {/* Barra de atividade */}
      <div className={styles.barRow}>
        {category.items.slice(0, 6).map((item) => (
          <motion.div
            key={item.name}
            className={styles.bar}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: (item.level ?? 80) / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
            title={`${item.name}: ${item.level ?? 80}%`}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SkillsProps { about?: AboutContent; }

export function Skills({ about }: SkillsProps) {
  const categories = about?.skills?.length ? about.skills : FALLBACK_SKILLS;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <Section
      id="skills"
      eyebrow="// competências"
      title="Stack técnica"
      subtitle="Tecnologias e ferramentas que uso no dia a dia para construir, escalar e entregar."
    >
      <motion.div
        className={styles.grid}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.name}
            category={cat}
            index={i}
            active={activeIdx === i}
            onClick={() => setActiveIdx(activeIdx === i ? null : i)}
          />
        ))}
      </motion.div>
    </Section>
  );
}
