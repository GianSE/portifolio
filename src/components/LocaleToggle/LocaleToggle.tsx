import { useLocale } from '@/hooks/useLocale';
import styles from './LocaleToggle.module.css';

export function LocaleToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLocale}
      aria-label={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      title={locale === 'pt' ? 'Switch to English' : 'Mudar para Português'}
    >
      <span className={[styles.option, locale === 'pt' ? styles.active : ''].join(' ')}>PT</span>
      <span className={styles.divider}>/</span>
      <span className={[styles.option, locale === 'en' ? styles.active : ''].join(' ')}>EN</span>
    </button>
  );
}
