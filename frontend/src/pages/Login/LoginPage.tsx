import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { login } from '../../services/authService';
import { authCopy } from '../authCopy';
import AuthPageLayout from '../components/AuthPageLayout';
import useAuthLanguage from '../hooks/useAuthLanguage';
import LoginForm from './LoginForm';
import '../Auth.css';

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
  const copy = authCopy[language];

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
      setError(copy.login.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPageLayout
      variant="login"
      brand={{ ...copy.login, name: copy.common.brand, ariaLabel: copy.login.ariaBrand }}
      header={{
        kicker: copy.login.headerKicker,
        title: copy.login.heading,
        description: copy.login.description,
      }}
      language={language}
      languageLabel={copy.common.languageLabel}
      titleId="login-title"
      onLanguageChange={changeLanguage}
      footer={<>{copy.login.footer} <Link to="/register">{copy.login.footerLink}</Link></>}
    >
      <LoginForm
        copy={copy}
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
