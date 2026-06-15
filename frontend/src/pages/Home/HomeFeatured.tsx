import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import type { Language } from '../../context/useLanguage';
import type { HomeText } from './home.en';
import { products } from '../Products/products';
import { productsEn } from '../Products/products.en';
import { productsDe } from '../Products/products.de';
import ProductVisual from '../Products/ProductVisual';

interface HomeFeaturedProps {
  language: Language;
  homeText: HomeText;
}

const featuredIds = ['trailhead-pack-38', 'ultralight-tent-2p', 'funshape-62'];
const featured = featuredIds.map(id => products.find(p => p.id === id)!);

const HomeFeatured = ({ language, homeText }: HomeFeaturedProps) => {
  const { addItem } = useCart();
  const text = language === 'de' ? productsDe : productsEn;

  return (
    <section className="home-featured" aria-labelledby="home-featured-title">
      <div className="home-featured__header home-section-heading">
        <p>{homeText.featuredKicker}</p>
        <h2 id="home-featured-title">{homeText.featuredTitle}</h2>
      </div>

      <div className="home-featured__grid">
        {featured.map(product => (
          <article key={product.id} className="home-feat-card">
            <Link to={`/products/${product.id}`} className="home-feat-card__visual" tabIndex={-1} aria-hidden="true">
              <ProductVisual product={product} />
            </Link>

            <div className="home-feat-card__body">
              <div className="home-feat-card__meta">
                <span className="home-feat-card__category">
                  {text.categories[product.category]}
                </span>
                <span className="home-feat-card__rating">★ {product.rating}</span>
              </div>

              <Link to={`/products/${product.id}`} className="home-feat-card__title-link">
                <h3>{product.title[language]}</h3>
              </Link>

              <p className="home-feat-card__desc">{product.shortText[language]}</p>

              <div className="home-feat-card__footer">
                <strong className="home-feat-card__price">{product.price}</strong>
                <button
                  type="button"
                  className="home-feat-card__cart"
                  onClick={() => addItem(product.id)}
                >
                  {text.addToCart}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeFeatured;
