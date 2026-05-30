interface AuthSocialButtonProps {
  label: string;
}

const AuthSocialButton = ({ label }: AuthSocialButtonProps) => (
  <button type="button" className="auth-social-btn" disabled>
    <span className="auth-social-icon" aria-hidden="true">G</span>
    <span>{label}</span>
  </button>
);

export default AuthSocialButton;
