import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/not-found.svg';
import useLanguage from '../../context/useLanguage';
import { notFoundEn } from './notFound.en';
import { notFoundDe } from './notFound.de';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { language } = useLanguage();
  const text = language === 'de' ? notFoundDe : notFoundEn;

  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <section className="not-found-content">
        <img
          className="not-found-image"
          src={notFoundImage}
          alt={text.imageAlt}
        />

        <div className="not-found-text">
          <p className="not-found-kicker">{text.kicker}</p>
          <h1 id="not-found-title">{text.title}</h1>
          <p>{text.text}</p>
          <Link className="not-found-action" to="/">
            {text.backHome}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
