import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import useLanguage from '../../context/useLanguage';
import ProductVisual from '../Products/ProductVisual';
import { useProductCatalog } from '../Products/useProductCatalog';
import { cartDe } from './cart.de';
import { cartEn } from './cart.en';
import { createCartLines, formatEuro } from './cartTotals';
import './CartPage.css';

const SHIPPING_PRICE = 8;

const CartPage = () => {
  const { language, changeLanguage } = useLanguage();
  const { items, updateQuantity, removeItem, clearCart } = useCart();
  const { products } = useProductCatalog();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? cartDe : cartEn;
  const lines = createCartLines(items, products);
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = subtotal > 0 ? SHIPPING_PRICE : 0;
  const total = subtotal + shipping;

  return (
    <main className="home-shell cart-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <section className="cart-page" aria-labelledby="cart-title">
        <div className="cart-page__header">
          <p className="home-kicker">{text.kicker}</p>
          <h1 id="cart-title">{text.title}</h1>
          <p>{text.intro}</p>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <h2>{text.emptyTitle}</h2>
            <p>{text.emptyText}</p>
            <Link to="/products">{text.backToProducts}</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <section className="cart-items" aria-label={text.title}>
              {lines.map(({ product, quantity, lineTotal }) => (
                <article className="cart-item" key={product.id}>
                  <ProductVisual product={product} />
                  <div className="cart-item__content">
                    <div>
                      <p>{product.title[language]}</p>
                      <span>{product.shortText[language]}</span>
                    </div>
                    <strong>{formatEuro(lineTotal)}</strong>
                  </div>
                  <div className="cart-item__actions">
                    <label>
                      {text.quantityLabel}
                      <input
                        min="1"
                        type="number"
                        value={quantity}
                        onChange={(event) =>
                          updateQuantity(product.id, Number(event.target.value))
                        }
                      />
                    </label>
                    <button type="button" onClick={() => removeItem(product.id)}>
                      {text.remove}
                    </button>
                  </div>
                </article>
              ))}
            </section>

            <aside className="cart-summary" aria-label={text.total}>
              <dl>
                <div>
                  <dt>{text.subtotal}</dt>
                  <dd>{formatEuro(subtotal)}</dd>
                </div>
                <div>
                  <dt>{text.shipping}</dt>
                  <dd>{formatEuro(shipping)}</dd>
                </div>
                <div className="cart-summary__total">
                  <dt>{text.total}</dt>
                  <dd>{formatEuro(total)}</dd>
                </div>
              </dl>
              <button type="button" className="cart-summary__checkout">
                {text.checkout}
              </button>
              <button type="button" className="cart-summary__clear" onClick={clearCart}>
                {text.clear}
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default CartPage;
