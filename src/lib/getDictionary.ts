import { Language } from '@/i18n/config';

type Dictionary = Record<string, any>;

const dictionaries: Record<Language, () => Promise<Dictionary>> = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  de: () => import('@/dictionaries/de.json').then((module) => module.default),
  sq: () => import('@/dictionaries/sq.json').then((module) => module.default),
};

export async function getDictionary(language: Language): Promise<Dictionary> {
  return dictionaries[language]();
}

// For client-side usage, we'll also create a synchronous version using require
export const dictionaryCache: Record<Language, Dictionary> = {
  en: require('@/dictionaries/en.json'),
  de: require('@/dictionaries/de.json'),
  sq: require('@/dictionaries/sq.json'),
};

export function getDictionarySync(language: Language): Dictionary {
  return dictionaryCache[language];
}
