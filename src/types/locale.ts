export type Locale = 'pt' | 'en';

export interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}
