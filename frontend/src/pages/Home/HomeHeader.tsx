import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import landscapeLogo from '../../assets/layered-landscape-logo.svg';
import type { Language } from '../hooks/useAuthLanguage';
import AccountIcon from './AccountIcon';
import HomeHeaderIcon from './HomeHeaderIcon';
import HomeHeaderMenu from './HomeHeaderMenu';
import HomeLanguageSelect from './HomeLanguageSelect';
import type { HomeText } from './home.en';

interface HomeHeaderProps {
  text: HomeText;
  language: Language;
  onLanguageChange: (language: Language) => void;
}

// Zeigt Logo, Sprache und Konto-Aktionen.
const HomeHeader = ({ text, language, onLanguageChange }: HomeHeaderProps) => {
  const { isAuthenticated, user, logoutUser } = useAuth();

  return (
    <header className="home-header">
      <Link to="/" className="home-brand" aria-label={text.homeLabel}>
        <img src={landscapeLogo} alt="" aria-hidden="true" />
        <span>Roamly</span>
      </Link>

      <nav className="home-nav" aria-label={text.navLabel}>
        <HomeHeaderMenu text={text} />
        <div className="home-header-actions">
          <HomeLanguageSelect
            language={language}
            label={text.navLabel}
            onChange={onLanguageChange}
          />
          <button type="button" className="home-icon-button" aria-label={text.wishlistLabel}>
            <HomeHeaderIcon name="heart" />
          </button>
          <button type="button" className="home-icon-button" aria-label={text.cartLabel}>
            <HomeHeaderIcon name="bag" />
          </button>
          {isAuthenticated ? (
            <>
              <span className="home-user">{user?.name ?? user?.email}</span>
              <button type="button" className="home-link-button" onClick={logoutUser}>
                {text.logout}
              </button>
            </>
          ) : (
            <Link to="/login" className="home-account-link" aria-label={text.accountLabel}>
              <AccountIcon />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
