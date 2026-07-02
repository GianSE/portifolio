import { SITE, SOCIAL_LINKS, NAV_LINKS } from '@/data/site';
import { useLocale } from '@/hooks/useLocale';
import { STRINGS } from '@/i18n/strings';
import { Icon, type IconName } from '@/components/Icon/Icon';
import { scrollToSection } from '@/utils/scroll';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useLocale();
  const t = STRINGS[locale];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandCol}>
          <span className={styles.brand}>
            <span className={styles.mark}>G</span> Gian Pedro Rodrigues
          </span>
          <p className={styles.tagline}>{SITE.title}</p>
          <div className={styles.socials}>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className={styles.social}
              >
                <Icon name={s.icon as IconName} size={18} />
              </a>
            ))}
          </div>
        </div>

        <nav className={styles.nav} aria-label={t.footer.ariaNav}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              className={styles.navLink}
              onClick={() => scrollToSection(link.id)}
            >
              {t.nav[link.id as keyof typeof t.nav]}
            </button>
          ))}
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} Gian Pedro Rodrigues. {t.footer.rights}</span>
        <span className={styles.built}>{t.footer.builtWith}</span>
      </div>
    </footer>
  );
}
