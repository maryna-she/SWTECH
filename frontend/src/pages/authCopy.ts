import { deAuthCopy } from './copy/authCopy.de';
import { enAuthCopy } from './copy/authCopy.en';

export type AuthLanguage = 'de' | 'en';

// Schlüssel für die gespeicherte Sprachwahl.
export const LANGUAGE_STORAGE_KEY = 'roamlyLanguage';

export const getInitialLanguage = (): AuthLanguage => {
  if (typeof window === 'undefined') return 'en';
  return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'de' ? 'de' : 'en';
};

export const saveLanguage = (language: AuthLanguage) => {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const authCopy = {
  de: deAuthCopy,
  en: enAuthCopy,
} as const;

export type AuthCopy = (typeof authCopy)[AuthLanguage];
