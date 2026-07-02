import type { CSSProperties } from 'react';
import useLanguage from '../../context/useLanguage';
import { travelPhotos } from '../../assets/travelPhotos';
import HomeHeader from './HomeHeader';
import HomeHeroActions from './HomeHeroActions';
import HomeManifesto from './HomeManifesto';
import HomeTripPanel from './HomeTripPanel';
import HomeFeatured from './HomeFeatured';
import HomeReviews from './HomeReviews';
import { homeDe } from './home.de';
import { homeEn } from './home.en';
import './HomePage.css';

const HomePage = () => {
  const { language, changeLanguage } = useLanguage();
  const text = language === 'de' ? homeDe : homeEn;

  return (
    <main className="home-shell home-page-shell">
      <HomeHeader
        text={text}
        language={language}
        onLanguageChange={changeLanguage}
      />

      {/* ── Full-screen hero ── */}
      <div
        className="home-viewport"
        style={{ '--home-hero-photo': `url(${travelPhotos.heroTrail})` } as CSSProperties}
      >
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-hero-content">
            <h1 id="home-title">{text.title}</h1>
            <p className="home-intro">{text.intro}</p>
            <HomeHeroActions text={text} />
          </div>

          <div className="home-hero-scroll" aria-hidden="true">
            <span />
          </div>
        </section>
      </div>

      {/* ── Brand manifesto ── */}
      <HomeManifesto />

      {/* ── Category tiles ── */}
      <section className="home-categories" aria-labelledby="home-categories-title">
        <div className="home-section-heading">
          <p>{text.tripCategoriesLabel}</p>
          <h2 id="home-categories-title">{text.categories}</h2>
        </div>
        <HomeTripPanel text={text} />
      </section>

      {/* ── Featured products ── */}
      <HomeFeatured language={language} homeText={text} />

      {/* ── Customer reviews ── */}
      <HomeReviews text={text} />

    </main>
  );
};

export default HomePage;
