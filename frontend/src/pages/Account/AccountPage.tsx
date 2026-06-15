import { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useCart } from '../../context/useCart';
import { travelPhotos } from '../../assets/travelPhotos';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import useLanguage from '../../context/useLanguage';
import AccountActionCard from './AccountActionCard';
import AccountOrderList from './AccountOrderList';
import AccountStatCard from './AccountStatCard';
import { accountDe } from './account.de';
import { accountEn } from './account.en';
import { accountActions, accountStats } from './accountContent';
import './AccountPage.css';

const AccountPage = () => {
  const { language, changeLanguage } = useLanguage();
  const { user, isAuthenticated, logoutUser } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? accountDe : accountEn;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const profileName = user?.name || text.fallbackName;
  const initials = profileName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <main className="home-shell account-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="account-page" aria-labelledby="account-title">
        <div className="account-hero">
          <div className="account-page__header">
            <p className="account-kicker">{text.kicker}</p>
            <h1 id="account-title">{text.title}</h1>
            <p>{text.intro}</p>
          </div>

          <div className="account-identity">
            <div className="account-avatar" aria-hidden="true">
              {initials || 'R'}
            </div>
            <div>
              <strong>{profileName}</strong>
              <span>{user?.email || text.fallbackEmail}</span>
            </div>
          </div>
        </div>

        <section className="account-stats" aria-label={text.actionsLabel}>
          {accountStats.map((stat) => (
            <AccountStatCard key={stat.label} stat={stat} text={text} />
          ))}
          <article className="account-stat">
            <strong>{totalItems}</strong>
            <span>{text.cartTitle}</span>
          </article>
        </section>

        <div className="account-layout account-layout--main">
          <section className="account-profile" aria-label={text.profileLabel}>
            <dl>
              <div>
                <dt>{text.nameLabel}</dt>
                <dd>{profileName}</dd>
              </div>
              <div>
                <dt>{text.emailLabel}</dt>
                <dd>{user?.email || text.fallbackEmail}</dd>
              </div>
              <div>
                <dt>{text.roleLabel}</dt>
                <dd>{user?.role ?? 'CUSTOMER'}</dd>
              </div>
            </dl>
          </section>

          <section className="account-actions" aria-label={text.actionsLabel}>
            {accountActions.map((action) => (
              <AccountActionCard key={action.title} action={action} text={text} />
            ))}
            <button type="button" onClick={handleLogout}>
              {text.logout}
            </button>
          </section>
        </div>

        <section className="account-trip" aria-labelledby="account-trip-title">
          <img src={travelPhotos.hiking} alt="" />
          <div>
            <p>{text.tripKicker}</p>
            <h2 id="account-trip-title">{text.tripTitle}</h2>
            <span>{text.tripText}</span>
            <dl>
              <div>
                <dt>{text.tripDateLabel}</dt>
                <dd>{text.tripDate}</dd>
              </div>
              <div>
                <dt>{text.tripGearLabel}</dt>
                <dd>{text.tripGear}</dd>
              </div>
              <div>
                <dt>{text.tripRouteLabel}</dt>
                <dd>{text.tripRoute}</dd>
              </div>
            </dl>
            <Link to="/products">{text.shopLink}</Link>
          </div>
        </section>

        <AccountOrderList text={text} />
      </section>
    </main>
  );
};

export default AccountPage;
