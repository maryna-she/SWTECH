import authMountain from '../../assets/auth-mountain.jpg';

interface AuthBrandProps {
  ariaLabel: string;
}

// Zeigt auf Auth-Seiten ein ruhiges Outdoor-Bild statt grossem Text.
const AuthBrand = ({ ariaLabel }: AuthBrandProps) => (
  <section className="auth-brand" aria-label={ariaLabel}>
    <img src={authMountain} alt="" aria-hidden="true" />
  </section>
);

export default AuthBrand;
