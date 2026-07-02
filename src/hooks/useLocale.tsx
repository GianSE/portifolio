import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale, LocaleContextValue } from '@/types/locale';

const STORAGE_KEY = 'locale';
const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored === 'pt' || stored === 'en') return stored;
  return 'pt';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.setAttribute('lang', locale === 'pt' ? 'pt-BR' : 'en');
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === 'pt' ? 'en' : 'pt')),
    [],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, toggleLocale, setLocale }),
    [locale, toggleLocale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale deve ser usado dentro de <LocaleProvider>');
  return ctx;
}
