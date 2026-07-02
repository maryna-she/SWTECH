import { Link } from 'react-router-dom';
import landscapeLogo from '../../assets/layered-landscape-logo.svg';
import useLanguage from '../../context/useLanguage.ts';
import { footerEn } from './footer.en.ts';
import { footerDe } from './footer.de.ts';
import './SiteFooter.css';

const SiteFooter = () => {
  const { language } = useLanguage();
  const text = language === 'de' ? footerDe : footerEn;

  return (
    <footer className="site-footer">

      {/* Compact stats row */}
      <div className="site-footer__stats" aria-hidden="true">
        {text.stats.map(s => (
          <div key={s.label} className="site-footer__stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Main footer body */}
      <div className="site-footer__inner">

        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo">
            <img src={landscapeLogo} alt="" aria-hidden="true" />
            <span>Roamly</span>
          </Link>
          <p className="site-footer__tagline">{text.tagline}</p>
        </div>

        <nav className="site-footer__nav" aria-label={text.navLabel}>

          <div className="site-footer__col">
            <h3>{text.exploreHeading}</h3>
            <ul>
              <li><Link to="/products">{text.allProducts}</Link></li>
              <li><Link to="/products?category=hiking">Hiking</Link></li>
              <li><Link to="/products?category=camping">Camping</Link></li>
              <li><Link to="/products?category=surfing">Surfing</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>{text.companyHeading}</h3>
            <ul>
              <li><Link to="/about">{text.about}</Link></li>
              <li><Link to="/contacts">{text.contacts}</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h3>{text.accountHeading}</h3>
            <ul>
              <li><Link to="/login">{text.signIn}</Link></li>
              <li><Link to="/register">{text.register}</Link></li>
              <li><Link to="/cart">{text.cart}</Link></li>
            </ul>
          </div>

        </nav>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Roamly. {text.copyright}</p>
        <div className="site-footer__bottom-links">
          <span>{text.privacy}</span>
          <span>{text.imprint}</span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
