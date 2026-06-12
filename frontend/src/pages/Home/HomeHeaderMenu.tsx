import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';

interface HomeHeaderMenuProps {
  text: HomeText;
}

const HomeHeaderMenu = ({ text }: HomeHeaderMenuProps) => (
  <div className="home-menu">
    <Link to="/">{text.home}</Link>
    <Link to="/products">{text.shop}</Link>
    <Link to="/about">{text.about}</Link>
    <Link to="/contacts">{text.contacts}</Link>
  </div>
);

export default HomeHeaderMenu;
