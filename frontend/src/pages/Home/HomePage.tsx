import useAuthLanguage from '../hooks/useAuthLanguage';
import HomeHeader from './HomeHeader';
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

      {/* Einstieg mit Angebot und Link zur Registrierung. */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-text">
          <p className="home-kicker">{text.kicker}</p>
          <h1 id="home-title">{text.title}</h1>
          <p className="home-intro">{text.intro}</p>
        </div>

        <HomeTripPanel text={text} />
      </section>
    </main>
  );
};

export default HomePage;
