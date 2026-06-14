import type { HomeText } from './home.en';

interface HomeHighlightsProps {
  text: HomeText;
}

const HomeHighlights = ({ text }: HomeHighlightsProps) => (
  <section className="home-highlights" aria-label={text.highlightsLabel}>
    <div className="home-highlights__label">
      <span>{text.kicker}</span>
      <h2>{text.highlightsLabel}</h2>
    </div>

    <div className="home-highlights__grid">
      {text.highlights.map((highlight, index) => (
        <article key={highlight.title} className="home-highlight">
          <span className="home-highlight__num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="home-highlight__body">
            <h3>{highlight.title}</h3>
            <p>{highlight.text}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default HomeHighlights;
