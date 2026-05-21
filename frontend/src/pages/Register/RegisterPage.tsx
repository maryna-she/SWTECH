import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authCopy } from '../authCopy';
import AuthPageLayout from '../components/AuthPageLayout';
import useAuthLanguage from '../hooks/useAuthLanguage';
import RegisterForm from './RegisterForm';
import useRegisterForm from './useRegisterForm';
import '../Auth.css';

const RegisterPage = () => {
  // Verbindet Übersetzung, Layout und Registrierungsformular.
  const { language, changeLanguage } = useAuthLanguage();
  const copy = authCopy[language];
  const form = useRegisterForm(copy);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const handleLanguageChange = (nextLanguage: typeof language) => {
    form.setters.setError('');
    changeLanguage(nextLanguage);
  };

  return (
    <AuthPageLayout
      variant="register"
      brand={{ ...copy.register, name: copy.common.brand, ariaLabel: copy.register.ariaBrand }}
      header={{
        kicker: copy.register.headerKicker,
        title: copy.register.heading,
        description: copy.register.description,
      }}
      language={language}
      languageLabel={copy.common.languageLabel}
      titleId="register-title"
      onLanguageChange={handleLanguageChange}
      footer={<>{copy.register.footer} <Link to="/login">{copy.register.footerLink}</Link></>}
    >
      <RegisterForm
        copy={copy}
        values={form.values}
        state={form.state}
        setters={form.setters}
        onTogglePassword={() => form.actions.setShowPassword((current) => !current)}
        onSubmit={form.actions.handleSubmit}
      />
    </AuthPageLayout>
  );
};

export default RegisterPage;
