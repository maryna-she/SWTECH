import useAuthLanguage from '../hooks/useAuthLanguage';
import HomeHeader from './HomeHeader';
import HomeTripPanel from './HomeTripPanel';
import { homeCopy } from './homeCopy';
import './HomePage.css';

const HomePage = () => {
  // Verbindet Startseite, Sprache und übersetzte Inhalte.
  const { language, changeLanguage } = useAuthLanguage();
  const copy = homeCopy[language];

  return (
    <main className="home-shell">
      <HomeHeader copy={copy} language={language} onLanguageChange={changeLanguage} />

      {/* Einstieg mit Angebot und Link zur Registrierung. */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <p className="home-kicker">{copy.kicker}</p>
          <h1 id="home-title">{copy.title}</h1>
          <p className="home-intro">{copy.intro}</p>
        </div>

        <HomeTripPanel copy={copy} />
      </section>
    </main>
  );
};

export default HomePage;
