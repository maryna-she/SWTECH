import { Link } from 'react-router-dom';
import logo from '../../assets/layered-landscape-logo.svg';
import welcomeImage from '../../assets/login.svg';

interface AuthBrandProps {
  ariaLabel: string;
  imageSrc?: string;
}

// Zeigt auf Auth-Seiten ein ruhiges Outdoor-Bild statt grossem Text.
const AuthBrand = ({ ariaLabel, imageSrc = welcomeImage }: AuthBrandProps) => (
  <section className="auth-brand" aria-label={ariaLabel}>
    <Link to="/" className="auth-logo" aria-label={ariaLabel}>
      <img src={logo} alt="" aria-hidden="true" />
      <span>Roamly</span>
    </Link>
    <img src={imageSrc} alt="" aria-hidden="true" />
  </section>
);

export default AuthBrand;
