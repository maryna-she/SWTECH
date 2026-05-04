import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/registerService';
import { useAuth } from '../../context/AuthContext';
import { authCopy, getInitialLanguage, saveLanguage } from '../authCopy';
import type { AuthLanguage } from '../authCopy';
import shopLogo from '../../assets/shop-logo.svg';
import '../Auth.css';

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
    <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12s-3.5 6.25-9.75 6.25S2.25 12 2.25 12Z" />
    <circle cx="12" cy="12" r="2.7" />
    {hidden && <path className="eye-slash" d="M4.5 4.5 19.5 19.5" />}
  </svg>
);

const getPasswordScore = (password: string) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return checks.filter(Boolean).length;
};

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<AuthLanguage>(getInitialLanguage);

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const copy = authCopy[language];
  const passwordScore = getPasswordScore(password);
  const passwordLabel = copy.register.passwordLabels[passwordScore];
  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;

  const handleLanguageChange = (nextLanguage: AuthLanguage) => {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(copy.register.mismatchError);
      return;
    }

    if (password.length < 8) {
      setError(copy.register.shortPasswordError);
      return;
    }

    setLoading(true);
    try {
      const res = await register({ name, email, password });
      loginUser(res.token, { email: res.email, name: res.name, role: res.role });
      navigate('/');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { status?: number } }).response?.status === 'number' &&
        (err as { response: { status: number } }).response.status === 409
      ) {
        setError(copy.register.conflictError);
      } else {
        setError(copy.register.defaultError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell auth-shell--register">
      <section className="auth-brand" aria-label={copy.register.ariaBrand}>
        <div className="brand-logo-slot">
          <img src={shopLogo} alt={copy.common.brand} className="brand-logo" />
        </div>
        <p className="auth-kicker">{copy.register.kicker}</p>
        <h1>{copy.register.title}</h1>
        <p>{copy.register.intro}</p>
      </section>

      <section className="auth-panel" aria-labelledby="register-title">
        <div className="auth-card">
          <div className="language-switcher" aria-label={copy.common.languageLabel}>
            <button
              type="button"
              className={language === 'de' ? 'is-active' : ''}
              onClick={() => handleLanguageChange('de')}
              aria-pressed={language === 'de'}
            >
              DE
            </button>
            <button
              type="button"
              className={language === 'en' ? 'is-active' : ''}
              onClick={() => handleLanguageChange('en')}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
          </div>

          <div className="auth-card-header">
            <p className="auth-kicker">{copy.register.headerKicker}</p>
            <h2 id="register-title">{copy.register.heading}</h2>
            <p>{copy.register.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="name">{copy.common.name}</label>
              <input
                id="name"
                type="text"
                placeholder="Max Mustermann"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? copy.common.passwordHideLabel : copy.common.passwordShowLabel}
                >
                  <EyeIcon hidden={showPassword} />
                </button>
              </div>
              <div className="password-meter" aria-label={`${copy.register.meterLabel}: ${passwordLabel}`}>
                <span className={passwordScore >= 1 ? 'is-active' : ''} />
                <span className={passwordScore >= 2 ? 'is-active' : ''} />
                <span className={passwordScore >= 3 ? 'is-active' : ''} />
                <span className={passwordScore >= 4 ? 'is-active' : ''} />
              </div>
              <p className="field-hint">{passwordLabel}</p>
            </div>

            <div className="auth-field">
              <label htmlFor="confirmPassword">{copy.register.confirmPassword}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder={copy.register.confirmPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                aria-invalid={!passwordsMatch}
              />
              {!passwordsMatch && (
                <p className="field-hint field-hint--danger">{copy.register.mismatchHint}</p>
              )}
            </div>

            {error && <p className="auth-error" aria-live="polite">{error}</p>}

            <button type="submit" className="auth-submit" disabled={loading}>
              <span>{loading ? copy.register.loading : copy.register.submit}</span>
            </button>
          </form>

          <p className="auth-footer">
            {copy.register.footer}{' '}
            <Link to="/login">{copy.register.footerLink}</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
