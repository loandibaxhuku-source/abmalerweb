export const languages = {
  en: 'English',
  de: 'Deutsch',
  sq: 'Shqip',
};

export const defaultLanguage = 'en' as const;

export type Language = keyof typeof languages;
