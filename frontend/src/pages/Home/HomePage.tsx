import type { CSSProperties } from 'react';
import useAuthLanguage from '../hooks/useAuthLanguage';
import { travelPhotos } from '../../assets/travelPhotos';
import HomeHeader from './HomeHeader';
import HomeHeroActions from './HomeHeroActions';
import HomeHighlights from './HomeHighlights';
import HomeTripPanel from './HomeTripPanel';
import { homeDe } from './home.de';
import { homeEn } from './home.en';
import './HomePage.css';

const HomePage = () => {
  const { language, changeLanguage } = useAuthLanguage();
  const text = language === 'de' ? homeDe : homeEn;

  return (
    <main className="home-shell">

      {/* ── Full-screen hero with header overlaid ── */}
      <div
        className="home-viewport"
        style={{ '--home-hero-photo': `url(${travelPhotos.heroTrail})` } as CSSProperties}
      >
        <HomeHeader
          text={text}
          language={language}
          onLanguageChange={changeLanguage}
        />

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

      {/* ── Stats strip ── */}
      <div className="home-stats-strip" aria-hidden="true">
        <div><strong>2 000+</strong><span>{language === 'de' ? 'Produkte' : 'Products'}</span></div>
        <div><strong>50+</strong><span>{language === 'de' ? 'Marken' : 'Brands'}</span></div>
        <div><strong>120+</strong><span>{language === 'de' ? 'Länder beliefert' : 'Countries shipped'}</span></div>
        <div><strong>4.9★</strong><span>{language === 'de' ? 'Kundenbewertung' : 'Customer rating'}</span></div>
      </div>

      {/* ── Category tiles ── */}
      <section className="home-categories" aria-labelledby="home-categories-title">
        <div className="home-section-heading">
          <p>{text.tripCategoriesLabel}</p>
          <h2 id="home-categories-title">{text.categories}</h2>
        </div>
        <HomeTripPanel text={text} />
      </section>

      {/* ── Feature highlights ── */}
      <HomeHighlights text={text} />

    </main>
  );
};

export default HomePage;
