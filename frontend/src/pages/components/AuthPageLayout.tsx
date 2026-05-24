import type { ReactNode } from 'react';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import HomeHeader from '../Home/HomeHeader';
import type { Language } from '../hooks/useAuthLanguage';
import AuthBrand from './AuthBrand';

interface AuthPageLayoutProps {
  variant: 'login' | 'register';
  brand: {
    ariaLabel: string;
  };
  header: {
    kicker: string;
    title: string;
    description: string;
  };
  language: Language;
  titleId: string;
  footer: ReactNode;
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
  footer,
  children,
  onLanguageChange,
}: AuthPageLayoutProps) => (
  <main className={`auth-shell auth-shell--${variant}`}>
    <HomeHeader
      text={language === 'de' ? homeDe : homeEn}
      language={language}
      onLanguageChange={onLanguageChange}
    />

    <div className="auth-content">
      <AuthBrand
        ariaLabel={brand.ariaLabel}
      />

      <section className="auth-panel" aria-labelledby={titleId}>
        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-kicker">{header.kicker}</p>
            <h2 id={titleId}>{header.title}</h2>
            <p>{header.description}</p>
          </div>

          {children}

          <p className="auth-footer">{footer}</p>
        </div>
      </section>
    </div>
  </main>
);

export default AuthPageLayout;
