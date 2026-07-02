import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSeo } from '@/hooks/useSeo';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { locale } = useLocale();
  const t = STRINGS[locale].notFound;
  useSeo({ title: t.seoTitle, path: '/404' });

  return (
    <section className={styles.wrap}>
      <motion.div
        className="container"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeInUp} className={styles.code}>
          404
        </motion.p>
        <motion.h1 variants={fadeInUp} className={styles.title}>
          {t.title}
        </motion.h1>
        <motion.p variants={fadeInUp} className={styles.text}>
          {t.text}
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link to="/" className={styles.link}>
            {t.back}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
