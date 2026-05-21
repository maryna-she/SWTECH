import type { AuthLanguage } from '../authCopy';

interface HomeLanguageSelectProps {
  language: AuthLanguage;
  label: string;
  onChange: (language: AuthLanguage) => void;
}

// Auswahlfeld für die Sprache der Startseite.
const HomeLanguageSelect = ({ language, label, onChange }: HomeLanguageSelectProps) => (
  <label className="home-language-select">
    <span>{label}</span>
    <select
      value={language}
      aria-label={label}
      onChange={(event) => onChange(event.target.value as AuthLanguage)}
    >
      <option value="de">DE</option>
      <option value="en">EN</option>
    </select>
  </label>
);

export default HomeLanguageSelect;
