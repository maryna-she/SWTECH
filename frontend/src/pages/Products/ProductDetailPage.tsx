import { Link, useParams } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import useAuthLanguage from '../hooks/useAuthLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import { productsDe } from './products.de';
import { productsEn } from './products.en';
import ProductVisual from './ProductVisual';
import { useProductCatalog } from './useProductCatalog';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { language, changeLanguage } = useAuthLanguage();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? productsDe : productsEn;
  const { products, isLoading } = useProductCatalog();
  const product = products.find((candidate) => candidate.id === productId);
  const { addItem } = useCart();

  if (!product && !isLoading) {
    return (
      <main className="home-shell products-shell">
        <HomeHeader
          text={headerText}
          language={language}
          onLanguageChange={changeLanguage}
        />
        <section className="product-not-found">
          <p className="home-kicker">{text.kicker}</p>
          <h1>{text.notFoundTitle}</h1>
          <p>{text.notFoundText}</p>
          <Link to="/products">{text.backToProducts}</Link>
        </section>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <main className="home-shell products-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="product-detail" aria-labelledby="product-title">
        <ProductVisual product={product} size="hero" />

        <div className="product-detail__content">
          <Link to="/products" className="product-detail__back">
            {text.backToProducts}
          </Link>
          <p className="home-kicker">{text.categories[product.category]}</p>
          <h1 id="product-title">{product.title[language]}</h1>
          <p className="product-detail__description">{product.description[language]}</p>

          <dl className="product-detail__facts">
            <div>
              <dt>{text.priceLabel}</dt>
              <dd>{product.price}</dd>
            </div>
            <div>
              <dt>{text.ratingLabel}</dt>
              <dd>{product.rating}</dd>
            </div>
            <div>
              <dt>{text.categoryLabel}</dt>
              <dd>{text.categories[product.category]}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="product-detail__cart"
            onClick={() => addItem(product.id)}
          >
            {text.addToCart}
          </button>

          <section className="product-detail__details" aria-labelledby="details-title">
            <h2 id="details-title">{text.detailsLabel}</h2>
            <ul>
              {product.details[language].map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
