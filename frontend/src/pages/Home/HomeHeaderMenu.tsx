import { NavLink } from 'react-router-dom';
import type { HomeText } from './home.en';

interface HomeHeaderMenuProps {
  text: HomeText;
}

const HomeHeaderMenu = ({ text }: HomeHeaderMenuProps) => (
  <div className="home-menu">
    <NavLink to="/" end>{text.home}</NavLink>
    <NavLink to="/products">{text.shop}</NavLink>
    <NavLink to="/about">{text.about}</NavLink>
    <NavLink to="/contacts">{text.contacts}</NavLink>
  </div>
);

export default HomeHeaderMenu;
