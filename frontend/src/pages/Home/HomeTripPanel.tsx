import type { CSSProperties } from 'react';
import type { HomeText } from './home.en';
import { travelPhotos } from '../../assets/travelPhotos';

interface HomeTripPanelProps {
  text: HomeText;
}

// Rendert die visuellen Karten der Reise-Kategorien.
const HomeTripPanel = ({ text }: HomeTripPanelProps) => (
  <div className="home-trip-panel" aria-label={text.tripCategoriesLabel}>
    {text.cards.map((card, index) => (
      <div
        key={card.category}
        className={index === 0 ? 'home-map-card home-map-card--large' : 'home-map-card'}
        style={{
          '--trip-photo': `url(${
            index === 0 ? travelPhotos.hiking : index === 1 ? travelPhotos.camping : travelPhotos.surfing
          })`,
        } as CSSProperties}
      >
        <span>{card.category}</span>
        <strong>{card.title}</strong>
      </div>
    ))}
  </div>
);

export default HomeTripPanel;
