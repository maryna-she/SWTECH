import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import HomeLanguageSelect from '../Home/HomeLanguageSelect';
import type { Language } from '../../context/useLanguage';
import AuthBrand from './AuthBrand';

interface AuthPageLayoutProps {
  variant: 'login' | 'register';
  brand: {
    ariaLabel: string;
    imageSrc?: string;
  };
  header: {
    kicker: string;
    title: string;
    description: string;
  };
  language: Language;
  titleId: string;
  children: ReactNode;
  onLanguageChange: (language: Language) => void;
}

// Baut die gemeinsame Huelle fuer Login und Registrierung.
const AuthPageLayout = ({
  variant,
  brand,
  header,
  language,
  titleId,
  children,
  onLanguageChange,
}: AuthPageLayoutProps) => (
  <main className={`auth-shell auth-shell--${variant}`}>
    <section className="auth-content" aria-labelledby={titleId}>
      <Link to="/" className="auth-close" aria-label={language === 'de' ? 'Schliessen' : 'Close'}>
        <span aria-hidden="true" />
      </Link>

      <AuthBrand ariaLabel={brand.ariaLabel} imageSrc={brand.imageSrc} />

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-modal-top">
            <div className="auth-tabs" aria-label={language === 'de' ? 'Auth navigation' : 'Auth navigation'}>
              <Link to="/login" className={variant === 'login' ? 'is-active' : ''}>
                {language === 'de' ? 'Anmelden' : 'Sign in'}
              </Link>
              <Link to="/register" className={variant === 'register' ? 'is-active' : ''}>
                {language === 'de' ? 'Registrieren' : 'Register'}
              </Link>
            </div>
            <HomeLanguageSelect
              language={language}
              label={language === 'de' ? 'Sprache wählen' : 'Choose language'}
              onChange={onLanguageChange}
            />
          </div>

          <div className="auth-form-box">
            <div className="auth-card-header">
              <p className="auth-kicker">{header.kicker}</p>
              <h2 id={titleId}>{header.title}</h2>
              <p>{header.description}</p>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AuthPageLayout;
