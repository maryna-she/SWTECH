import type { AuthLanguage } from '../authCopy';
import { deHomeCopy } from './copy/homeCopy.de';
import { enHomeCopy } from './copy/homeCopy.en';

// Bündelt die Startseiten-Texte nach Sprache.
export const homeCopy = {
  de: deHomeCopy,
  en: enHomeCopy,
} as const;

export type HomeCopy = (typeof homeCopy)[AuthLanguage];
