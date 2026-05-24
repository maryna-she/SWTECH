import EyeIcon from '../components/EyeIcon';
import type { FormEvent } from 'react';
import type { LoginText } from './login.en';

interface LoginFormProps {
  text: LoginText;
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
  text,
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
      <label htmlFor="email">{text.common.email}</label>
      <input
        id="email"
        type="email"
        placeholder={text.common.emailPlaceholder}
        value={email}
        onChange={(event) => onEmailChange(event.target.value)}
        required
        autoComplete="email"
      />
    </div>

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
          autoComplete="current-password"
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
    </div>

    {error && <p className="auth-error" aria-live="polite">{error}</p>}

    <button type="submit" className="auth-submit" disabled={loading}>
      <span>{loading ? text.login.loading : text.login.submit}</span>
    </button>
  </form>
);

export default LoginForm;
