import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';
import { travelPhotos } from '../../assets/travelPhotos';
import { createCategoryLink, homeCategoryLinks } from './homeCategoryLinks';

interface HomeTripPanelProps {
  text: HomeText;
}

const categoryPhotos = [travelPhotos.hiking, travelPhotos.camping, travelPhotos.surfing];

const HomeTripPanel = ({ text }: HomeTripPanelProps) => (
  <div className="home-trip-panel" aria-label={text.tripCategoriesLabel}>
    {text.cards.map((card, index) => {
      const category = homeCategoryLinks[index];

      return (
        <Link
          key={card.category}
          to={createCategoryLink(category)}
          className="home-trip-card"
          style={{ '--trip-photo': `url(${categoryPhotos[index]})` } as CSSProperties}
        >
          <div className="home-trip-card__overlay" aria-hidden="true" />
          <div className="home-trip-card__content">
            <span className="home-trip-card__label">{card.category}</span>
            <strong className="home-trip-card__title">{card.title}</strong>
            <span className="home-trip-card__arrow">→</span>
          </div>
        </Link>
      );
    })}
  </div>
);

export default HomeTripPanel;
