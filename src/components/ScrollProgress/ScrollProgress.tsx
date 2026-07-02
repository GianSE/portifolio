import { motion, useScroll, useSpring } from 'framer-motion';
import styles from './ScrollProgress.module.css';

/** Indicador de progresso de scroll fixo no topo da viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return <motion.div className={`no-print ${styles.bar}`} style={{ scaleX }} aria-hidden="true" />;
}
