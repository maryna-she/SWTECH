import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { useWishlist } from '../../context/useWishlist';
import { useCart } from '../../context/useCart';
import useLanguage from '../../context/useLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import ProductVisual from '../Products/ProductVisual';
import { useProductCatalog } from '../Products/useProductCatalog';
import { wishlistDe } from './wishlist.de';
import { wishlistEn } from './wishlist.en';
import './WishlistPage.css';

const WishlistPage = () => {
  const { isAuthenticated } = useAuth();
  const { language, changeLanguage } = useLanguage();
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { products } = useProductCatalog();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? wishlistDe : wishlistEn;

  const savedProducts = items
    .map(({ productId }) => products.find((p) => p.id === productId))
    .filter(Boolean) as NonNullable<(typeof products)[number]>[];

  return (
    <main className="home-shell wishlist-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="wishlist-page" aria-labelledby="wishlist-title">
        <div className="wishlist-page__header">
          <p className="home-kicker">{text.kicker}</p>
          <h1 id="wishlist-title">{text.title}</h1>
          <p>{text.intro}</p>
        </div>

        {!isAuthenticated && (
          <div className="wishlist-banner" role="status">
            <div className="wishlist-banner__body">
              <strong>{text.bannerTitle}</strong>
              <p>{text.bannerText}</p>
            </div>
            <div className="wishlist-banner__actions">
              <Link to="/register" className="wishlist-banner__register">
                {text.bannerRegister}
              </Link>
              <span className="wishlist-banner__login-row">
                {text.bannerLoginPrefix}{' '}
                <Link to="/login" className="wishlist-banner__login">
                  {text.bannerLogin}
                </Link>
              </span>
            </div>
          </div>
        )}

        {savedProducts.length === 0 ? (
          <div className="wishlist-empty">
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyText}</p>
            <Link to="/products">{text.backToProducts}</Link>
          </div>
        ) : (
          <>
            <div className="wishlist-toolbar">
              <span className="wishlist-count">{text.itemCount(savedProducts.length)}</span>
              <button type="button" className="wishlist-clear" onClick={clearWishlist}>
                {text.clearAll}
              </button>
            </div>

            <ul className="wishlist-items" aria-label={text.kicker}>
              {savedProducts.map((product) => (
                <li className="wishlist-item" key={product.id}>
                  <Link
                    to={`/products/${product.id}`}
                    className="wishlist-item__visual"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <ProductVisual product={product} />
                  </Link>
                  <div className="wishlist-item__content">
                    <div>
                      <Link to={`/products/${product.id}`} className="wishlist-item__name-link">
                        <p>{product.title[language]}</p>
                      </Link>
                      <span>{product.shortText[language]}</span>
                    </div>
                    <strong className="wishlist-item__price">{product.price}</strong>
                  </div>
                  <div className="wishlist-item__actions">
                    <button
                      type="button"
                      className="wishlist-item__cart-btn"
                      onClick={() => { addToCart(product.id); removeItem(product.id); }}
                    >
                      {text.addToCart}
                    </button>
                    <button
                      type="button"
                      className="wishlist-item__remove-btn"
                      onClick={() => removeItem(product.id)}
                    >
                      {text.remove}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
};

export default WishlistPage;
