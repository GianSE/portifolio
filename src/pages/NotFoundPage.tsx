import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSeo } from '@/hooks/useSeo';
import { fadeInUp, staggerContainer } from '@/animations/variants';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  useSeo({ title: 'Página não encontrada', path: '/404' });

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
          Esta rota não foi encontrada
        </motion.h1>
        <motion.p variants={fadeInUp} className={styles.text}>
          O endereço acessado não existe ou foi movido.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <Link to="/" className={styles.link}>
            ← Voltar ao início
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
