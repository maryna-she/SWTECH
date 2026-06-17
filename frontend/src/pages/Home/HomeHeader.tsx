import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useWishlist } from '../../context/useWishlist';
import { useAuth } from '../../context/useAuth';
import landscapeLogo from '../../assets/layered-landscape-logo.svg';
import type { Language } from '../../context/useLanguage';
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

const HomeHeader = ({ text, language, onLanguageChange }: HomeHeaderProps) => {
  const { isAuthenticated } = useAuth();
  const { totalItems } = useCart();
  const { totalItems: wishlistTotal } = useWishlist();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsScrolled(current > 80);

      if (!isSearchOpen) {
        if (current < 80) {
          setIsHidden(false);
        } else if (current > lastScrollY.current + 4) {
          setIsHidden(true);
        } else if (current < lastScrollY.current - 4) {
          setIsHidden(false);
        }
      }

      lastScrollY.current = current;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsHidden(false);
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 0);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) navigate(`/products?q=${encodeURIComponent(q)}`);
    closeSearch();
  };

  const variant = (isHome && !isScrolled) ? 'home-header--hero' : 'home-header--solid';
  const hiddenClass = isHidden ? 'is-hidden' : '';

  return (
    <header className={`home-header ${variant} ${hiddenClass}`}>
      <Link to="/" className="home-brand" aria-label={text.homeLabel}>
        <img src={landscapeLogo} alt="" aria-hidden="true" />
        <span>Roamly</span>
      </Link>

      <nav className="home-nav" aria-label={text.navLabel}>
        {isSearchOpen ? (
          <form className="home-search-form" onSubmit={handleSearchSubmit}>
            <input
              ref={searchInputRef}
              type="search"
              className="home-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={text.searchPlaceholder}
              onKeyDown={(e) => e.key === 'Escape' && closeSearch()}
            />
          </form>
        ) : (
          <HomeHeaderMenu text={text} />
        )}

        <div className="home-header-actions">
          <HomeLanguageSelect
            language={language}
            label={text.navLabel}
            onChange={onLanguageChange}
          />
          <button
            type="button"
            className="home-icon-button"
            aria-label={isSearchOpen ? text.closeSearchLabel : text.searchLabel}
            onClick={isSearchOpen ? closeSearch : openSearch}
          >
            <HomeHeaderIcon name={isSearchOpen ? 'close' : 'search'} />
          </button>
          <Link
            to="/wishlist"
            className="home-icon-button home-cart-link"
            aria-label={text.wishlistLabel}
          >
            <HomeHeaderIcon name="heart" />
            {wishlistTotal > 0 && <span>{wishlistTotal}</span>}
          </Link>
          <Link to="/cart" className="home-icon-button home-cart-link" aria-label={text.cartLabel}>
            <HomeHeaderIcon name="bag" />
            {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
          <Link
            to={isAuthenticated ? '/account' : '/login'}
            className="home-account-link"
            aria-label={text.accountLabel}
          >
            <AccountIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
