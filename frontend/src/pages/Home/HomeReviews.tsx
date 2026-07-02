import { Link } from 'react-router-dom';
import type { HomeText } from './home.en';

interface HomeReviewsProps {
  text: HomeText;
}

const HomeReviews = ({ text }: HomeReviewsProps) => {
  return (
    <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="home-reviews__inner">
        <div className="home-section-heading">
          <p>{text.reviewsKicker}</p>
          <h2 id="home-reviews-title">{text.reviewsTitle}</h2>
        </div>

        <div className="home-reviews__grid">
          {text.reviews.map((r) => (
            <article key={r.name} className="home-review-card">
              <span className="home-review-card__quote" aria-hidden="true">"</span>
              <p className="home-review-card__text">{r.text}</p>
              <div className="home-review-card__stars" aria-label="5 out of 5 stars">
                {'★★★★★'}
              </div>
              <footer className="home-review-card__footer">
                <span className="home-review-card__name">{r.name}</span>
                <Link
                  to={`/products/${r.productId}`}
                  className="home-review-card__product"
                >
                  {r.productLabel}
                </Link>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeReviews;
