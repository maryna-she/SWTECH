import landscapeLogo from '../../assets/layered-landscape-logo.svg';

interface AuthBrandProps {
  ariaLabel: string;
  brand: string;
  kicker: string;
  title: string;
  intro: string;
}

// Zeigt Logo, Marke und kurzen Einführungstext.
const AuthBrand = ({ ariaLabel, brand, kicker, title, intro }: AuthBrandProps) => (
  <section className="auth-brand" aria-label={ariaLabel}>
    <div className="brand-lockup">
      <img src={landscapeLogo} alt="" className="brand-logo" aria-hidden="true" />
      <span>{brand}</span>
    </div>
    <p className="auth-kicker">{kicker}</p>
    <h1>{title}</h1>
    <p>{intro}</p>
  </section>
);

export default AuthBrand;
