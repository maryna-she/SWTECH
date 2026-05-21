import EyeIcon from '../components/EyeIcon';
import type { FormEvent } from 'react';
import type { AuthCopy } from '../authCopy';

interface LoginFormProps {
  copy: AuthCopy;
  email: string;
  password: string;
  showPassword: boolean;
  error: string;
  loading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

// Rendert das Login-Formular mit E-Mail und Passwort.
const LoginForm = ({
  copy,
  email,
  password,
  showPassword,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) => (
  <form onSubmit={onSubmit} className="auth-form">
    <div className="auth-field">
      <label htmlFor="email">{copy.common.email}</label>
      <input
        id="email"
        type="email"
        placeholder={copy.common.emailPlaceholder}
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        required
        autoComplete="email"
      />
    </div>

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
          autoComplete="current-password"
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
    </div>

    {error && <p className="auth-error" aria-live="polite">{error}</p>}

    <button type="submit" className="auth-submit" disabled={loading}>
      <span>{loading ? copy.login.loading : copy.login.submit}</span>
    </button>
  </form>
);

export default LoginForm;
