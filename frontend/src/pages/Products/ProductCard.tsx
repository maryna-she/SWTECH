import { Link } from 'react-router-dom';
import type { Language } from '../hooks/useAuthLanguage';
import type { Product, ProductCategory } from './products';
import type { ProductText } from './products.en';
import ProductVisual from './ProductVisual';

interface ProductCardProps {
  text: ProductText;
  language: Language;
  product: Product;
}

const categoryClass: Record<ProductCategory, string> = {
  hiking: 'product-card--hiking',
  camping: 'product-card--camping',
  surfing: 'product-card--surfing',
};

const ProductCard = ({ text, language, product }: ProductCardProps) => (
  <article className={`product-card ${categoryClass[product.category]}`}>
    <ProductVisual product={product} />
    <div className="product-card__body">
      <div className="product-card__meta">
        <span>{text.categories[product.category]}</span>
        <span>{product.rating}</span>
      </div>
      <h2>{product.title[language]}</h2>
      <p>{product.shortText[language]}</p>
      <div className="product-card__footer">
        <strong>{product.price}</strong>
        <Link to={`/products/${product.id}`}>{text.viewProduct}</Link>
      </div>
    </div>
  </article>
);

export default ProductCard;
