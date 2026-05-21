import EyeIcon from '../components/EyeIcon';
import type { AuthCopy } from '../authCopy';

interface RegisterPasswordFieldProps {
  copy: AuthCopy;
  password: string;
  showPassword: boolean;
  passwordScore: number;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
}

// Zeigt Passwortfeld, Auge-Button und Stärke-Anzeige.
const RegisterPasswordField = ({
  copy,
  password,
  showPassword,
  passwordScore,
  onPasswordChange,
  onTogglePassword,
}: RegisterPasswordFieldProps) => {
  const passwordLabel = copy.register.passwordLabels[passwordScore];

  return (
    <div className="auth-field">
      <label htmlFor="password">{copy.common.password}</label>
      <div className="password-control">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          placeholder={copy.common.passwordPlaceholder}
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          required
          autoComplete="new-password"
        />
        <button
          type="button"
          className="ghost-btn"
          onClick={onTogglePassword}
          aria-label={showPassword ? copy.common.passwordHideLabel : copy.common.passwordShowLabel}
        >
          <EyeIcon hidden={showPassword} />
        </button>
      </div>
      <div className="password-meter" aria-label={`${copy.register.meterLabel}: ${passwordLabel}`}>
        {[1, 2, 3, 4].map((score) => (
          <span key={score} className={passwordScore >= score ? 'is-active' : ''} />
        ))}
      </div>
      <p className="field-hint">{passwordLabel}</p>
    </div>
  );
};

export default RegisterPasswordField;
