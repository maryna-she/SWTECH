import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useWishlist } from '../../context/useWishlist';
import useLanguage from '../../context/useLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import ProductCard from './ProductCard';
import ProductGallery from './ProductGallery';
import ProductReviews from './ProductReviews';
import { productsDe } from './products.de';
import { productsEn } from './products.en';
import { useProductCatalog } from './useProductCatalog';
import './ProductDetailPage.css';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ReturnIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { language, changeLanguage } = useLanguage();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? productsDe : productsEn;
  const { products, isLoading } = useProductCatalog();
  const product = products.find((c) => c.id === productId);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product && !isLoading) {
    return (
      <main className="home-shell products-shell">
        <HomeHeader text={headerText} language={language} onLanguageChange={changeLanguage} />
        <section className="product-not-found">
          <p className="home-kicker">{text.kicker}</p>
          <h1>{text.notFoundTitle}</h1>
          <p>{text.notFoundText}</p>
          <Link to="/products">{text.backToProducts}</Link>
        </section>
      </main>
    );
  }

  if (!product) return null;

  const saved = isInWishlist(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const starFillWidth = `${(parseFloat(product.rating) / 5) * 100}%`;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product.id);
  };

  return (
    <main className="home-shell products-shell">
      <HomeHeader text={headerText} language={language} onLanguageChange={changeLanguage} />

      <div className="pd-wrapper">

        {/* ── Main 2-column section ── */}
        <div className="pd-grid">

          {/* LEFT: sticky image */}
          <div className="pd-image-col">
            <div className="pd-image-sticky">
              <ProductGallery product={product} />
            </div>
          </div>

          {/* RIGHT: product info */}
          <div className="pd-info-col">

            {/* Breadcrumb */}
            <nav className="pd-breadcrumb" aria-label="Breadcrumb">
              <Link to="/products">{text.allProducts}</Link>
              <span aria-hidden="true">›</span>
              <Link to={`/products?category=${product.category}`}>
                {text.categories[product.category]}
              </Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{product.title[language]}</span>
            </nav>

            <h1 className="pd-title" id="product-title">{product.title[language]}</h1>

            {/* Price */}
            <div className="pd-price">{product.price}</div>

            {/* Star rating — links to reviews section */}
            <a href="#reviews" className="pd-rating-row" aria-label="See all reviews">
              <span className="pd-stars" aria-hidden="true">
                <span className="pd-stars__bg">★★★★★</span>
                <span className="pd-stars__fill" style={{ width: starFillWidth }}>★★★★★</span>
              </span>
              <span className="pd-rating-num">{product.rating}</span>
            </a>

            <hr className="pd-divider" />

            {/* Description */}
            <p className="pd-description">{product.description[language]}</p>

            <hr className="pd-divider" />

            {/* Quantity selector */}
            <div className="pd-qty-row">
              <span className="pd-qty-label">{text.quantityLabel}</span>
              <div className="pd-qty-control">
                <button
                  type="button"
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={qty <= 1}
                >
                  −
                </button>
                <span className="pd-qty-value">{qty}</span>
                <button
                  type="button"
                  className="pd-qty-btn"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  disabled={qty >= 10}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pd-actions">
              <button type="button" className="pd-cart-btn" onClick={handleAddToCart}>
                {text.addToCart}
              </button>
              <button
                type="button"
                className={`pd-wish-btn${saved ? ' is-saved' : ''}`}
                aria-label={saved ? text.savedToWishlist : text.saveToWishlist}
                onClick={() => toggleItem(product.id)}
              >
                <HeartIcon filled={saved} />
              </button>
            </div>

            <hr className="pd-divider" />

            {/* Specifications */}
            <details className="pd-specs" open>
              <summary className="pd-specs__summary">
                <span>{text.detailsLabel}</span>
                <svg className="pd-specs__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </summary>
              <ul className="pd-specs__list">
                {product.details[language].map((detail) => (
                  <li key={detail}>
                    <CheckIcon />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </details>

            <hr className="pd-divider" />

            {/* Trust badges */}
            <div className="pd-trust">
              <div className="pd-trust__item">
                <TruckIcon />
                <span>{text.trustShipping}</span>
              </div>
              <div className="pd-trust__item">
                <ReturnIcon />
                <span>{text.trustReturns}</span>
              </div>
              <div className="pd-trust__item">
                <ShieldIcon />
                <span>{text.trustWarranty}</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── Reviews ── */}
        <ProductReviews productId={product.id} text={text} />

        {/* ── Related products ── */}
        {related.length > 0 && (
          <section className="pd-related" aria-labelledby="related-title">
            <h2 id="related-title" className="pd-related__heading">{text.relatedLabel}</h2>
            <div className="pd-related__grid">
              {related.map((p) => (
                <ProductCard key={p.id} text={text} language={language} product={p} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
};

export default ProductDetailPage;
