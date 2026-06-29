import { forwardRef, type ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  /** rótulo curto exibido acima do título (eyebrow) */
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  /** remove o padding vertical padrão (ex.: Hero gerencia o seu) */
  bare?: boolean;
}

/**
 * Wrapper semântico de seção, com cabeçalho opcional padronizado.
 * Garante o âncora de scroll-spy via id e scroll-margin para a navbar fixa.
 */
export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  { id, eyebrow, title, subtitle, children, className, bare = false },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      className={[styles.section, bare ? '' : styles.padded, className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="container">
        {(eyebrow || title || subtitle) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
});
