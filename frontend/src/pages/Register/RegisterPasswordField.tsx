import EyeIcon from '../components/EyeIcon';
import type { RegisterText } from './register.en';

interface RegisterPasswordFieldProps {
  text: RegisterText;
  password: string;
  showPassword: boolean;
  passwordScore: number;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
}

// Zeigt Passwortfeld, Auge-Button und Stärke-Anzeige.
const RegisterPasswordField = ({
  text,
  password,
  showPassword,
  passwordScore,
  onPasswordChange,
  onTogglePassword,
}: RegisterPasswordFieldProps) => {
  const passwordLabel = text.register.passwordLabels[passwordScore];

  return (
    <div className="auth-field">
      <label htmlFor="password">{text.common.password}</label>
      <div className="password-control">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder={text.common.passwordPlaceholder}
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          required
          autoComplete="new-password"
        />
        <button
          type="button"
          className="ghost-btn"
          onClick={onTogglePassword}
          aria-label={showPassword ? text.common.passwordHideLabel : text.common.passwordShowLabel}
        >
          <EyeIcon hidden={showPassword} />
        </button>
      </div>
      <div className="password-meter" aria-label={`${text.register.meterLabel}: ${passwordLabel}`}>
        {[1, 2, 3, 4].map((score) => (
          <span key={score} className={passwordScore >= score ? 'is-active' : ''} />
        ))}
      </div>
      <p className="field-hint">{passwordLabel}</p>
    </div>
  );
};

export default RegisterPasswordField;
