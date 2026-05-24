import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthPageLayout from '../components/AuthPageLayout';
import useAuthLanguage from '../hooks/useAuthLanguage';
import { registerDe } from './register.de';
import { registerEn } from './register.en';
import RegisterForm from './RegisterForm';
import useRegisterForm from './useRegisterForm';
import '../Auth/Auth.css';

const RegisterPage = () => {
  // Verbindet Uebersetzung, Layout und Registrierungsformular.
  const { language, changeLanguage } = useAuthLanguage();
  const text = language === 'de' ? registerDe : registerEn;
  const form = useRegisterForm(text);

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
      brand={{ ariaLabel: text.register.ariaBrand }}
      header={{
        kicker: text.register.headerKicker,
        title: text.register.heading,
        description: text.register.description,
      }}
      language={language}
      titleId="register-title"
      onLanguageChange={handleLanguageChange}
      footer={
        <>
          {text.register.footer} <Link to="/login">{text.register.footerLink}</Link>
        </>
      }
    >
      <RegisterForm
        text={text}
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
