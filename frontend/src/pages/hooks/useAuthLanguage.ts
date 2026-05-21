import { useState } from 'react';
import { getInitialLanguage, saveLanguage } from '../authCopy';
import type { AuthLanguage } from '../authCopy';

const useAuthLanguage = (onChange?: () => void) => {
  // Lädt, speichert und wechselt die Sprache der Seiten.
  const [language, setLanguage] = useState<AuthLanguage>(getInitialLanguage);

  const changeLanguage = (nextLanguage: AuthLanguage) => {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    onChange?.();
  };

  return { language, changeLanguage };
};

export default useAuthLanguage;
