import { useState } from 'react';

export type Language = 'de' | 'en';

const LANGUAGE_STORAGE_KEY = 'roamlyLanguage';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'de' ? 'de' : 'en';
};

const saveLanguage = (language: Language) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

const useAuthLanguage = (onChange?: () => void) => {
  // Lädt, speichert und wechselt die Sprache der Seiten.
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    onChange?.();
  };

  return { language, changeLanguage };
};

export default useAuthLanguage;
