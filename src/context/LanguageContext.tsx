'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, defaultLanguage } from '@/i18n/config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [mounted, setMounted] = useState(false);

  // Always use German as default, don't load from localStorage
  useEffect(() => {
    // Always set to German/default language, clearing any previous preference
    localStorage.removeItem('preferredLanguage');
    setLanguage(defaultLanguage);
    setMounted(true);
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return default language during SSR/build time
    return { language: defaultLanguage, setLanguage: () => {} };
  }
  return context;
}
