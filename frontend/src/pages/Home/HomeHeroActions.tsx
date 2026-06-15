import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';

interface HomeHeroActionsProps {
  text: HomeText;
}

const HomeHeroActions = ({ text }: HomeHeroActionsProps) => (
  <div className="home-hero-actions">
    <Link to="/products" className="home-primary-action">
      {text.products}
    </Link>
  </div>
);

export default HomeHeroActions;
