import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<AuthLanguage>(getInitialLanguage);

  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const copy = authCopy[language];

  const handleLanguageChange = (nextLanguage: AuthLanguage) => {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      loginUser(res.token, { email: res.email, name: res.name, role: res.role });
      navigate('/');
    } catch {
      setError(copy.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell auth-shell--login">
      <section className="auth-brand" aria-label={copy.login.ariaBrand}>
        <div className="brand-logo-slot">
          <img src={shopLogo} alt={copy.common.brand} className="brand-logo" />
        </div>
        <p className="auth-kicker">{copy.login.kicker}</p>
        <h1>{copy.login.title}</h1>
        <p>{copy.login.intro}</p>
      </section>

      <section className="auth-panel" aria-labelledby="login-title">
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
            <p className="auth-kicker">{copy.login.headerKicker}</p>
            <h2 id="login-title">{copy.login.heading}</h2>
            <p>{copy.login.description}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
                  autoComplete="current-password"
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
            </div>

            {error && <p className="auth-error" aria-live="polite">{error}</p>}

            <button type="submit" className="auth-submit" disabled={loading}>
              <span>{loading ? copy.login.loading : copy.login.submit}</span>
            </button>
          </form>

          <p className="auth-footer">
            {copy.login.footer}{' '}
            <Link to="/register">{copy.login.footerLink}</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
