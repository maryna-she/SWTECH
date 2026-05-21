import type { FormEvent } from 'react';
import type { AuthCopy } from '../authCopy';
import RegisterPasswordField from './RegisterPasswordField';

interface RegisterFormProps {
  copy: AuthCopy;
  values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  state: {
    showPassword: boolean;
    error: string;
    loading: boolean;
    passwordScore: number;
    passwordsMatch: boolean;
  };
  setters: {
    setName: (value: string) => void;
    setEmail: (value: string) => void;
    setPassword: (value: string) => void;
    setConfirmPassword: (value: string) => void;
  };
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

// Rendert alle Felder für die Konto-Erstellung.
const RegisterForm = ({ copy, values, state, setters, onTogglePassword, onSubmit }: RegisterFormProps) => (
  <form onSubmit={onSubmit} className="auth-form">
    <div className="auth-field">
      <label htmlFor="name">{copy.common.name}</label>
      <input
        id="name"
        type="text"
        placeholder="Max Mustermann"
        value={values.name}
        onChange={(event) => setters.setName(event.target.value)}
        required
        autoComplete="name"
      />
    </div>

    <div className="auth-field">
      <label htmlFor="email">{copy.common.email}</label>
      <input
        id="email"
        type="email"
        placeholder={copy.common.emailPlaceholder}
        value={values.email}
        onChange={(event) => setters.setEmail(event.target.value)}
        required
        autoComplete="email"
      />
    </div>

    <RegisterPasswordField
      copy={copy}
      password={values.password}
      showPassword={state.showPassword}
      passwordScore={state.passwordScore}
      onPasswordChange={setters.setPassword}
      onTogglePassword={onTogglePassword}
    />

    <div className="auth-field">
      <label htmlFor="confirmPassword">{copy.register.confirmPassword}</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder={copy.register.confirmPlaceholder}
        value={values.confirmPassword}
        onChange={(event) => setters.setConfirmPassword(event.target.value)}
        required
        autoComplete="new-password"
        aria-invalid={!state.passwordsMatch}
      />
      {!state.passwordsMatch && (
        <p className="field-hint field-hint--danger">{copy.register.mismatchHint}</p>
      )}
    </div>

    {state.error && <p className="auth-error" aria-live="polite">{state.error}</p>}

    <button type="submit" className="auth-submit" disabled={state.loading}>
      <span>{state.loading ? copy.register.loading : copy.register.submit}</span>
    </button>
  </form>
);

export default RegisterForm;
