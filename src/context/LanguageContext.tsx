'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from '@/data/i18n/en.json';
import ur from '@/data/i18n/ur.json';
import { Language } from '@/types/i18n';

export type Dictionaries = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  t: (keyPath: string) => any;
  dict: Dictionaries;
}

const dictionaries: Record<Language, Dictionaries> = {
  en,
  ur,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('echoes_lang') as Language;
    if (savedLang === 'en' || savedLang === 'ur') {
      setLanguageState(savedLang);
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'ur' ? 'rtl' : 'ltr';
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('echoes_lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    }
  };

  const currentDict = dictionaries[language] || dictionaries.en;
  const dir = language === 'ur' ? 'rtl' : 'ltr';

  const t = (keyPath: string): any => {
    const keys = keyPath.split('.');
    let current: any = currentDict;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary if key missing in Urdu
        let fallback: any = dictionaries.en;
        for (const k of keys) {
          if (fallback && typeof fallback === 'object' && k in fallback) {
            fallback = fallback[k];
          } else {
            return keyPath;
          }
        }
        return fallback;
      }
    }

    return current;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        t,
        dict: currentDict,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
