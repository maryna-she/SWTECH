import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import landscapeLogo from '../../assets/layered-landscape-logo.svg';
import type { AuthLanguage } from '../authCopy';
import AccountIcon from './AccountIcon';
import HomeLanguageSelect from './HomeLanguageSelect';
import type { HomeCopy } from './homeCopy';

interface HomeHeaderProps {
  copy: HomeCopy;
  language: AuthLanguage;
  onLanguageChange: (language: AuthLanguage) => void;
}

// Zeigt Logo, Sprache und Konto-Aktionen.
const HomeHeader = ({ copy, language, onLanguageChange }: HomeHeaderProps) => {
  const { isAuthenticated, user, logoutUser } = useAuth();

  return (
    <header className="home-header">
      <Link to="/" className="home-brand" aria-label={copy.homeLabel}>
        <img src={landscapeLogo} alt="" aria-hidden="true" />
        <span>Roamly</span>
      </Link>

      <nav className="home-nav" aria-label={copy.navLabel}>
        <HomeLanguageSelect
          language={language}
          label={copy.navLabel}
          onChange={onLanguageChange}
        />
        {isAuthenticated ? (
          <>
            <span className="home-user">{user?.name ?? user?.email}</span>
            <button type="button" className="home-link-button" onClick={logoutUser}>
              {copy.logout}
            </button>
          </>
        ) : (
          <Link to="/login" className="home-account-link" aria-label={copy.accountLabel}>
            <AccountIcon />
          </Link>
        )}
      </nav>
    </header>
  );
};

export default HomeHeader;
