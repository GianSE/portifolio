import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getDashboards } from '@/services/content.service';
import type { Dashboard } from '@/types/content';
import { scaleIn, staggerContainer, viewportOnce } from '@/animations/variants';
import { Section } from '@/components/Section/Section';
import { Tag } from '@/components/Tag/Tag';
import { Icon } from '@/components/Icon/Icon';
import styles from './Dashboards.module.css';

/* ---- Modal fullscreen ---- */
interface ModalProps {
  dashboard: Dashboard;
  imgIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Modal({ dashboard, imgIndex, onClose, onPrev, onNext }: ModalProps) {
  const images = dashboard.images?.length ? dashboard.images : [dashboard.cover];
  const src = images[imgIndex];
  const total = images.length;
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <h3 className={styles.modalTitle}>{dashboard.title}</h3>
            {total > 1 && <span className={styles.modalCount}>{imgIndex + 1} / {total}</span>}
          </div>
          <div className={styles.modalActions}>
            <button
              className={styles.modalBtn}
              onClick={() => setZoom((z) => !z)}
              title={zoom ? 'Zoom normal' : 'Zoom'}
            >
              <Icon name={zoom ? 'close' : 'external'} size={18} />
            </button>
            <button className={styles.modalBtn} onClick={onClose} title="Fechar (Esc)">
              <Icon name="close" size={18} />
            </button>
          </div>
        </div>

        {/* Imagem */}
        <div className={[styles.imgWrap, zoom ? styles.zoomed : ''].join(' ')}>
          <img src={src} alt={dashboard.title} className={styles.modalImg} />
        </div>

        {/* Navegação */}
        {total > 1 && (
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={onPrev} disabled={imgIndex === 0}>
              ← Anterior
            </button>
            <div className={styles.dots}>
              {images.map((_, i) => (
                <span key={i} className={[styles.dot, i === imgIndex ? styles.dotActive : ''].join(' ')} />
              ))}
            </div>
            <button className={styles.navBtn} onClick={onNext} disabled={imgIndex === total - 1}>
              Próximo →
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---- Card de dashboard ---- */
interface CardProps { dashboard: Dashboard; onOpen: () => void; }

function DashboardCard({ dashboard, onOpen }: CardProps) {
  return (
    <motion.div
      className={styles.card}
      variants={scaleIn}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      aria-label={`Abrir ${dashboard.title}`}
    >
      <div className={styles.thumb}>
        {dashboard.cover ? (
          <img src={dashboard.cover} alt={dashboard.title} className={styles.thumbImg} loading="lazy" />
        ) : (
          <div className={styles.thumbFallback}>
            <span>{dashboard.title[0]}</span>
          </div>
        )}
        <div className={styles.thumbOverlay}>
          <Icon name="external" size={28} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <h3 className={styles.cardTitle}>{dashboard.title}</h3>
          <Tag variant="accent">{dashboard.tool}</Tag>
        </div>
        <p className={styles.cardDesc}>{dashboard.description}</p>
        {dashboard.tags?.length > 0 && (
          <div className={styles.tags}>
            {dashboard.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---- Seção principal ---- */
export function Dashboards() {
  const dashboards = getDashboards();
  const [active, setActive] = useState<{ dash: Dashboard; imgIdx: number } | null>(null);

  const open = useCallback((dash: Dashboard) => setActive({ dash, imgIdx: 0 }), []);
  const close = useCallback(() => setActive(null), []);

  const navigate = useCallback((dir: -1 | 1) => {
    setActive((prev) => {
      if (!prev) return prev;
      const images = prev.dash.images?.length ? prev.dash.images : [prev.dash.cover];
      const next = prev.imgIdx + dir;
      if (next < 0 || next >= images.length) return prev;
      return { ...prev, imgIdx: next };
    });
  }, []);

  // Trava scroll quando modal aberto
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [active]);

  return (
    <Section
      id="dashboards"
      eyebrow="// dashboards"
      title="Business Intelligence"
      subtitle="Painéis analíticos construídos para suportar decisão de negócio."
    >
      <motion.div
        className={styles.grid}
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {dashboards.map((d) => (
          <DashboardCard key={d.slug} dashboard={d} onOpen={() => open(d)} />
        ))}
      </motion.div>

      <AnimatePresence>
        {active && (
          <Modal
            dashboard={active.dash}
            imgIndex={active.imgIdx}
            onClose={close}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}
