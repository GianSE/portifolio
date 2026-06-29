import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS, SITE } from '@/data/site';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useScrolled } from '@/hooks/useScrolled';
import { scrollToSection } from '@/utils/scroll';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import { Icon } from '@/components/Icon/Icon';
import { Button } from '@/components/Button/Button';
import styles from './Navbar.module.css';

const NAV_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const scrolled = useScrolled(24);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeId = useScrollSpy(isHome ? NAV_IDS : []);
  const [menuOpen, setMenuOpen] = useState(false);

  // Trava o scroll do body quando o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      scrollToSection(id);
      history.replaceState(null, '', id === 'hero' ? '/' : `/#${id}`);
    } else {
      navigate(`/#${id}`);
      // após navegar para a home, rola até a seção
      requestAnimationFrame(() => setTimeout(() => scrollToSection(id), 80));
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={[styles.header, scrolled ? styles.scrolled : ''].join(' ')}
    >
      <nav className={`container ${styles.nav}`} aria-label="Navegação principal">
        <button className={styles.brand} onClick={() => go('hero')}>
          <span className={styles.brandMark}>G</span>
          <span className={styles.brandName}>Gian Rodrigues</span>
        </button>

        {/* Desktop */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={[
                  styles.link,
                  isHome && activeId === link.id ? styles.linkActive : '',
                ].join(' ')}
                onClick={() => go(link.id)}
                aria-current={isHome && activeId === link.id ? 'true' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <Button
            as="a"
            href={SITE.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className={styles.cvBtn}
          >
            <Icon name="download" size={16} />
            CV
          </Button>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobile}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className={styles.mobileLinks} role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    className={[
                      styles.mobileLink,
                      isHome && activeId === link.id ? styles.linkActive : '',
                    ].join(' ')}
                    onClick={() => go(link.id)}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
