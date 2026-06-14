import type { HomeText } from './home.en';

interface HomeHighlightsProps {
  text: HomeText;
}

const HomeHighlights = ({ text }: HomeHighlightsProps) => (
  <section className="home-highlights" aria-label={text.highlightsLabel}>
    <div className="home-highlights__intro">
      <span>{text.kicker}</span>
      <h2>{text.highlightsLabel}</h2>
    </div>

    <div className="home-highlights__grid">
      {text.highlights.map((highlight, index) => (
        <article key={highlight.title} className="home-highlight">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <h3>{highlight.title}</h3>
          <p>{highlight.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default HomeHighlights;
