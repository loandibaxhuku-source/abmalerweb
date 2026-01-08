'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/i18n/config';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const FORCED_LANGUAGE: Language = 'de'; // Force German always

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(FORCED_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Force German on mount and ignore any preferences
  useEffect(() => {
    localStorage.clear(); // Clear all localStorage
    setLanguage(FORCED_LANGUAGE);
    setMounted(true);
  }, []);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    // Optionally store preference, but always start with German
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
    return { language: FORCED_LANGUAGE, setLanguage: () => {} };
  }
  return context;
}
