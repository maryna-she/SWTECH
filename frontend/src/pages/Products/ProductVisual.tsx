import type { CSSProperties } from 'react';
import type { Product } from './products';

interface ProductVisualProps {
  product: Product;
  size?: 'card' | 'hero';
}

const ProductVisual = ({ product, size = 'card' }: ProductVisualProps) => (
  <div
    className={`product-visual product-visual--${size} product-visual--${product.category}`}
    style={{ '--product-accent': product.accent } as CSSProperties}
    aria-hidden="true"
  >
    <span className="product-visual__sun" />
    <span className="product-visual__ridge product-visual__ridge--back" />
    <span className="product-visual__ridge product-visual__ridge--front" />
    <span className="product-visual__item" />
  </div>
);

export default ProductVisual;
