import type { ReactNode } from 'react';
import type { AuthLanguage } from '../authCopy';
import AuthBrand from './AuthBrand';
import LanguageSwitcher from './LanguageSwitcher';

interface AuthPageLayoutProps {
  variant: 'login' | 'register';
  brand: {
    ariaLabel: string;
    name: string;
    kicker: string;
    title: string;
    intro: string;
  };
  header: {
    kicker: string;
    title: string;
    description: string;
  };
  language: AuthLanguage;
  languageLabel: string;
  titleId: string;
  footer: ReactNode;
  children: ReactNode;
  onLanguageChange: (language: AuthLanguage) => void;
}

// Baut die gemeinsame Hülle für Login und Registrierung.
const AuthPageLayout = ({
  variant,
  brand,
  header,
  language,
  languageLabel,
  titleId,
  footer,
  children,
  onLanguageChange,
}: AuthPageLayoutProps) => (
  <main className={`auth-shell auth-shell--${variant}`}>
    <AuthBrand
      ariaLabel={brand.ariaLabel}
      brand={brand.name}
      kicker={brand.kicker}
      title={brand.title}
      intro={brand.intro}
    />

    <section className="auth-panel" aria-labelledby={titleId}>
      <div className="auth-card">
        <LanguageSwitcher language={language} label={languageLabel} onChange={onLanguageChange} />

        <div className="auth-card-header">
          <p className="auth-kicker">{header.kicker}</p>
          <h2 id={titleId}>{header.title}</h2>
          <p>{header.description}</p>
        </div>

        {children}

        <p className="auth-footer">{footer}</p>
      </div>
    </section>
  </main>
);

export default AuthPageLayout;
