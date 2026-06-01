import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { login } from '../../services/authService';
import AuthPageLayout from '../components/AuthPageLayout';
import useAuthLanguage from '../hooks/useAuthLanguage';
import { loginDe } from './login.de';
import { loginEn } from './login.en';
import LoginForm from './LoginForm';
import '../Auth/Auth.css';

const LoginPage = () => {
  // Verwaltet Eingaben, Sprache und Login-Status der Seite.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language, changeLanguage } = useAuthLanguage(() => setError(''));
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const text = language === 'de' ? loginDe : loginEn;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login({ email, password });
      loginUser(res.token, { email: res.email, name: res.name, role: res.role });
      navigate('/');
    } catch {
      setError(text.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout
      variant="login"
      brand={{ ariaLabel: text.login.ariaBrand }}
      header={{
        kicker: text.login.headerKicker,
        title: text.login.heading,
        description: text.login.description,
      }}
      language={language}
      titleId="login-title"
      onLanguageChange={changeLanguage}
    >
      <LoginForm
        text={text}
        email={email}
        password={password}
        showPassword={showPassword}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onTogglePassword={() => setShowPassword((current) => !current)}
        onSubmit={handleSubmit}
      />
    </AuthPageLayout>
  );
};

export default LoginPage;
