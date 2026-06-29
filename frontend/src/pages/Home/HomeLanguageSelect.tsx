import type { Language } from '../../context/useLanguage';

interface HomeLanguageSelectProps {
  language: Language;
  label: string;
  onChange: (language: Language) => void;
}

// Auswahlfeld für die Sprache der Startseite.
const HomeLanguageSelect = ({ language, label, onChange }: HomeLanguageSelectProps) => (
  <div className="home-language-select" aria-label={label}>
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

export default HomeLanguageSelect;
