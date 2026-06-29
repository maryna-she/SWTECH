import { Link } from 'react-router-dom';
import { useCart } from '../../context/useCart';
import { useWishlist } from '../../context/useWishlist';
import type { Language } from '../../context/useLanguage';
import type { Product } from './products';
import type { ProductText } from './products.en';
import ProductVisual from './ProductVisual';

interface ProductCardProps {
  text: ProductText;
  language: Language;
  product: Product;
}

const CartIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
  </svg>
);

const ProductCard = ({ text, language, product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__visual" tabIndex={-1} aria-hidden="true">
        <ProductVisual product={product} />
        <span className="product-card__cat-badge">{text.categories[product.category]}</span>
        <span className="product-card__view-hint">{text.viewProduct} →</span>
      </Link>
      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__rating">★ {product.rating}</span>
          <button
            type="button"
            className={`product-card__wishlist-btn${saved ? ' is-saved' : ''}`}
            aria-label={saved ? text.savedToWishlist : text.saveToWishlist}
            onClick={() => toggleItem(product.id)}
          >
            <HeartIcon filled={saved} />
          </button>
        </div>
        <Link to={`/products/${product.id}`} className="product-card__name-link">
          <h2 className="product-card__title">{product.title[language]}</h2>
        </Link>
        <p className="product-card__desc">{product.shortText[language]}</p>
        <div className="product-card__footer">
          <strong className="product-card__price">{product.price}</strong>
          <button
            type="button"
            className="product-card__cart"
            onClick={() => addItem(product.id)}
          >
            <CartIcon />
            {text.addToCart}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
