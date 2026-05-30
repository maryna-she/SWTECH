import { Link } from 'react-router-dom';
import logo from '../../assets/layered-landscape-logo.svg';
import authMountain from '../../assets/auth-mountain.jpg';

interface AuthBrandProps {
  ariaLabel: string;
}

// Zeigt auf Auth-Seiten ein ruhiges Outdoor-Bild statt grossem Text.
const AuthBrand = ({ ariaLabel }: AuthBrandProps) => (
  <section className="auth-brand" aria-label={ariaLabel}>
    <Link to="/" className="auth-logo" aria-label={ariaLabel}>
      <img src={logo} alt="" aria-hidden="true" />
      <span>Roamly</span>
    </Link>
    <img src={authMountain} alt="" aria-hidden="true" />
  </section>
);

export default AuthBrand;
