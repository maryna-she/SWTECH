import { useState } from 'react';
import type { ProductText } from './products.en';
import { loadReviews, saveReview, type Review } from './reviewsData';

interface ProductReviewsProps {
  productId: string;
  text: ProductText;
}

const StarPicker = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  const display = hovered || value;

  return (
    <div className="rv-star-picker" role="group">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`rv-star-btn${display >= n ? ' is-on' : ''}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const RatingBar = ({ label, count, max }: { label: string; count: number; max: number }) => (
  <div className="rv-bar-row">
    <span className="rv-bar-label">{label} ★</span>
    <div className="rv-bar-track">
      <div className="rv-bar-fill" style={{ width: max > 0 ? `${(count / max) * 100}%` : '0%' }} />
    </div>
    <span className="rv-bar-count">{count}</span>
  </div>
);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

const ProductReviews = ({ productId, text }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(() => loadReviews(productId));
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—';

  const dist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;
    const newReview = saveReview(productId, {
      author: author.trim() || 'Anonymous',
      rating,
      text: reviewText.trim(),
    });
    setReviews((prev) => [...prev, newReview]);
    setRating(0);
    setAuthor('');
    setReviewText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="reviews" className="rv-section" aria-labelledby="reviews-heading">

      <div className="rv-header">
        <h2 id="reviews-heading" className="rv-title">{text.reviewsTitle}</h2>
        <span className="rv-count">{text.reviewsCount(reviews.length)}</span>
      </div>

      {/* ── Summary ── */}
      {reviews.length > 0 && (
        <div className="rv-summary">
          <div className="rv-avg">
            <span className="rv-avg__num">{avg}</span>
            <span className="rv-avg__stars">★★★★★</span>
          </div>
          <div className="rv-bars">
            {dist.map(({ star, count }) => (
              <RatingBar key={star} label={String(star)} count={count} max={reviews.length} />
            ))}
          </div>
        </div>
      )}

      {/* ── Review list ── */}
      {reviews.length === 0 ? (
        <p className="rv-empty">{text.reviewsEmpty}</p>
      ) : (
        <ul className="rv-list">
          {reviews.map((r) => (
            <li key={r.id} className="rv-card">
              <div className="rv-card__top">
                <div className="rv-card__avatar">{r.author.charAt(0).toUpperCase()}</div>
                <div className="rv-card__meta">
                  <span className="rv-card__author">{r.author}</span>
                  <span className="rv-card__date">{formatDate(r.date)}</span>
                </div>
                <div className="rv-card__stars">
                  {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
              </div>
              <p className="rv-card__text">{r.text}</p>
            </li>
          ))}
        </ul>
      )}

      {/* ── Write review form ── */}
      <div className="rv-form-wrap">
        <h3 className="rv-form-title">{text.writeReviewTitle}</h3>

        {submitted && (
          <div className="rv-thanks" role="status">{text.reviewThanks}</div>
        )}

        <form className="rv-form" onSubmit={handleSubmit} noValidate>
          <div className="rv-form__field">
            <label className="rv-form__label">{text.reviewRatingLabel}</label>
            <StarPicker value={rating} onChange={setRating} />
          </div>

          <div className="rv-form__field">
            <label className="rv-form__label" htmlFor="rv-name">{text.reviewNameLabel}</label>
            <input
              id="rv-name"
              type="text"
              className="rv-form__input"
              placeholder={text.reviewNamePlaceholder}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              maxLength={60}
            />
          </div>

          <div className="rv-form__field">
            <label className="rv-form__label" htmlFor="rv-text">{text.reviewTextLabel}</label>
            <textarea
              id="rv-text"
              className="rv-form__textarea"
              placeholder={text.reviewTextPlaceholder}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={4}
              maxLength={600}
              required
            />
          </div>

          <button
            type="submit"
            className="rv-form__submit"
            disabled={!rating || !reviewText.trim()}
          >
            {text.reviewSubmit}
          </button>
        </form>
      </div>

    </section>
  );
};

export default ProductReviews;
