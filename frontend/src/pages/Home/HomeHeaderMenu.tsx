import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';

interface HomeHeaderMenuProps {
  text: HomeText;
}

const HomeHeaderMenu = ({ text }: HomeHeaderMenuProps) => (
  <div className="home-menu">
    <Link to="/">{text.home}</Link>
    <Link to="/products">{text.shop}</Link>
    <button type="button">{text.about}</button>
    <button type="button">{text.contacts}</button>
  </div>
);

export default HomeHeaderMenu;
