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
  // Verbindet Startseite, Sprache und übersetzte Inhalte.
  const { language, changeLanguage } = useAuthLanguage();
  const text = language === 'de' ? homeDe : homeEn;

  return (
    <main className="home-shell">
      <HomeHeader
        text={text}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section
        className="home-hero"
        aria-labelledby="home-title"
        style={{ '--home-hero-photo': `url(${travelPhotos.homeHero})` } as CSSProperties}
      >
        <div className="home-hero-text">
          <h1 id="home-title">{text.title}</h1>
          <p className="home-intro">{text.intro}</p>
          <HomeHeroActions text={text} />
        </div>

        <div className="home-hero-gallery" aria-hidden="true">
          <img className="home-hero-gallery__main" src={travelPhotos.heroTrail} alt="" />
        </div>
      </section>

      <section className="home-category-section" aria-labelledby="home-categories-title">
        <div className="home-section-heading">
          <p>{text.tripCategoriesLabel}</p>
          <h2 id="home-categories-title">{text.categories}</h2>
        </div>
        <HomeTripPanel text={text} />
      </section>

      <HomeHighlights text={text} />
    </main>
  );
};

export default HomePage;
