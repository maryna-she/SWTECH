import { Link } from 'react-router-dom';
import { travelPhotos } from '../../assets/travelPhotos';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import useAuthLanguage from '../hooks/useAuthLanguage';
import { aboutDe } from './about.de';
import { aboutEn } from './about.en';
import './AboutPage.css';

const AboutPage = () => {
  const { language, changeLanguage } = useAuthLanguage();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? aboutDe : aboutEn;

  return (
    <main className="home-shell about-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="about-page" aria-labelledby="about-title">
        <div className="about-top">
          <div className="about-top__content">
            <p className="about-kicker">{text.kicker}</p>
            <h1 id="about-title">{text.title}</h1>
            <p className="about-lead">{text.intro}</p>
            <p className="about-note">{text.note}</p>
          </div>

          <figure className="about-hero-photo">
            <img src={travelPhotos.homeHero} alt="" />
          </figure>
        </div>

        <section className="about-values" aria-label={text.valuesLabel}>
          {text.values.map((value) => (
            <article key={value.title}>
              <span>{value.title}</span>
              <p>{value.text}</p>
            </article>
          ))}
        </section>

        <section className="about-editorial" aria-labelledby="about-story-title">
          <div className="about-editorial__label">
            <span>{text.storyLabel}</span>
            <h2 id="about-story-title">{text.storyTitle}</h2>
          </div>

          <div className="about-editorial__copy">
            {text.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="about-editorial__image">
            <img src={travelPhotos.camping} alt="" />
            <div>
              <h3>{text.imageTitle}</h3>
              <p>{text.imageText}</p>
            </div>
          </aside>
        </section>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <p>{text.ctaKicker}</p>
        <h2 id="about-cta-title">{text.ctaTitle}</h2>
        <Link to="/products">{text.ctaLink}</Link>
      </section>
    </main>
  );
};

export default AboutPage;
