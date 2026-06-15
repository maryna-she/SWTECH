import { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';

export type Language = 'de' | 'en';

const LANGUAGE_KEY = 'roamlyLanguage';

const getInitialLanguage = (): Language =>
  localStorage.getItem(LANGUAGE_KEY) === 'de' ? 'de' : 'en';

interface LanguageContextValue {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  changeLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = (lang: Language) => {
    localStorage.setItem(LANGUAGE_KEY, lang);
    setLanguage(lang);
  };

  const value = useMemo(() => ({ language, changeLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
