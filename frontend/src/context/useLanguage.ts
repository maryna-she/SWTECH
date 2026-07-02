import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
export type { Language } from './LanguageContext';

const useLanguage = () => useContext(LanguageContext);

export default useLanguage;
