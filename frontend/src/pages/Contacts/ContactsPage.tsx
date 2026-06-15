import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import useLanguage from '../../context/useLanguage';
import ContactForm from './ContactForm';
import { contactsDe } from './contacts.de';
import { contactsEn } from './contacts.en';
import './ContactsPage.css';

const contactPhoto =
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80';

const ContactsPage = () => {
  const { language, changeLanguage } = useLanguage();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? contactsDe : contactsEn;

  return (
    <main className="home-shell contacts-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="contacts-page" aria-labelledby="contacts-title">
        <div className="contacts-hero">
          <div className="contacts-hero__content">
            <p className="contacts-kicker">{text.kicker}</p>
            <h1 id="contacts-title">{text.title}</h1>
            <p>{text.intro}</p>
          </div>
          <img src={contactPhoto} alt="" />
        </div>

        <section className="contacts-info" aria-label={text.kicker}>
          <article>
            <span>{text.emailLabel}</span>
            <a href="mailto:hello@roamly.example">hello@roamly.example</a>
          </article>
          <article>
            <span>{text.phoneLabel}</span>
            <a href="tel:+493012345678">+49 30 12345678</a>
          </article>
          <article>
            <span>{text.addressLabel}</span>
            <p>{text.address}</p>
          </article>
          <article>
            <span>{text.hoursLabel}</span>
            {text.hours.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </article>
        </section>

        <div className="contacts-main">
          <ContactForm text={text} />

          <aside className="contacts-support">
            <h2>{text.supportTitle}</h2>
            {text.supportItems.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContactsPage;
