import styles from './Loader.module.css';

/** Fallback de Suspense para rotas lazy. */
export function Loader() {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}
