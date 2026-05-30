import { Link } from 'react-router-dom';
import notFoundImage from '../../assets/not-found.svg';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-page" aria-labelledby="not-found-title">
      <section className="not-found-content">
        <img
          className="not-found-image"
          src={notFoundImage}
          alt="404 page not found"
        />

        <div className="not-found-text">
          <p className="not-found-kicker">Error 404</p>
          <h1 id="not-found-title">Page not found</h1>
          <p>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link className="not-found-action" to="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
