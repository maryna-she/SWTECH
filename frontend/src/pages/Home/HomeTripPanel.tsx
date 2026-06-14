import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';
import { travelPhotos } from '../../assets/travelPhotos';
import { createCategoryLink, homeCategoryLinks } from './homeCategoryLinks';

interface HomeTripPanelProps {
  text: HomeText;
}

// Rendert die visuellen Karten der Reise-Kategorien.
const HomeTripPanel = ({ text }: HomeTripPanelProps) => (
  <div className="home-trip-panel" aria-label={text.tripCategoriesLabel}>
    {text.cards.map((card, index) => {
      const category = homeCategoryLinks[index];

      return (
        <Link
          key={card.category}
          to={createCategoryLink(category)}
          className={index === 0 ? 'home-map-card home-map-card--large' : 'home-map-card'}
          style={{
            '--trip-photo': `url(${
              index === 0 ? travelPhotos.hiking : index === 1 ? travelPhotos.camping : travelPhotos.surfing
            })`,
          } as CSSProperties}
        >
          <span className="home-map-card__image" aria-hidden="true" />
          <span className="home-map-card__category">{card.category}</span>
          <strong>{card.title}</strong>
        </Link>
      );
    })}
  </div>
);

export default HomeTripPanel;
