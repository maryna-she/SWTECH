import type { HomeCopy } from './homeCopy';

interface HomeTripPanelProps {
  copy: HomeCopy;
}

// Rendert die visuellen Karten der Reise-Kategorien.
const HomeTripPanel = ({ copy }: HomeTripPanelProps) => (
  <div className="home-trip-panel" aria-label={copy.tripCategoriesLabel}>
    {copy.cards.map((card, index) => (
      <div
        key={card.category}
        className={index === 0 ? 'home-map-card home-map-card--large' : 'home-map-card'}
      >
        <span>{card.category}</span>
        <strong>{card.title}</strong>
      </div>
    ))}
  </div>
);

export default HomeTripPanel;
