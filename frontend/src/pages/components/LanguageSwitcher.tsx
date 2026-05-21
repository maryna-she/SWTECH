import type { AuthLanguage } from '../authCopy';

interface LanguageSwitcherProps {
  language: AuthLanguage;
  label: string;
  onChange: (language: AuthLanguage) => void;
}

// Schaltet zwischen Deutsch und Englisch um.
const LanguageSwitcher = ({ language, label, onChange }: LanguageSwitcherProps) => (
  <div className="language-switcher" aria-label={label}>
    <button
      type="button"
      className={language === 'de' ? 'is-active' : ''}
      onClick={() => onChange('de')}
      aria-pressed={language === 'de'}
    >
      DE
    </button>
    <button
      type="button"
      className={language === 'en' ? 'is-active' : ''}
      onClick={() => onChange('en')}
      aria-pressed={language === 'en'}
    >
      EN
    </button>
  </div>
);

export default LanguageSwitcher;
