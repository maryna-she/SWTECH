import type { FormEvent } from 'react';
import RegisterPasswordField from './RegisterPasswordField';
import type { RegisterText } from './register.en';

interface RegisterFormProps {
  text: RegisterText;
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
const RegisterForm = ({ text, values, state, setters, onTogglePassword, onSubmit }: RegisterFormProps) => (
  <form onSubmit={onSubmit} className="auth-form">
    <div className="auth-field">
      <label htmlFor="name">{text.common.name}</label>
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
      <label htmlFor="email">{text.common.email}</label>
      <input
        id="email"
        type="email"
        placeholder={text.common.emailPlaceholder}
        value={values.email}
        onChange={(event) => setters.setEmail(event.target.value)}
        required
        autoComplete="email"
      />
    </div>

    <RegisterPasswordField
      text={text}
      password={values.password}
      showPassword={state.showPassword}
      passwordScore={state.passwordScore}
      onPasswordChange={setters.setPassword}
      onTogglePassword={onTogglePassword}
    />

    <div className="auth-field">
      <label htmlFor="confirmPassword">{text.register.confirmPassword}</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder={text.register.confirmPlaceholder}
        value={values.confirmPassword}
        onChange={(event) => setters.setConfirmPassword(event.target.value)}
        required
        autoComplete="new-password"
        aria-invalid={!state.passwordsMatch}
      />
      {!state.passwordsMatch && (
        <p className="field-hint field-hint--danger">{text.register.mismatchHint}</p>
      )}
    </div>

    {state.error && <p className="auth-error" aria-live="polite">{state.error}</p>}

    <button type="submit" className="auth-submit" disabled={state.loading}>
      <span>{state.loading ? text.register.loading : text.register.submit}</span>
    </button>
  </form>
);

export default RegisterForm;
