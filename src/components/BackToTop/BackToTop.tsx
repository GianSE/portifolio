import { AnimatePresence, motion } from 'framer-motion';
import { useScrolled } from '@/hooks/useScrolled';
import { Icon } from '@/components/Icon/Icon';
import styles from './BackToTop.module.css';

/** Botão flutuante "voltar ao topo", visível após rolar a página. */
export function BackToTop() {
  const visible = useScrolled(600);

  const toTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className={`no-print ${styles.btn}`}
          onClick={toTop}
          aria-label="Voltar ao topo"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
        >
          <Icon name="arrow-up" size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
