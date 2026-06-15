import type { CSSProperties } from 'react';
import type { Product } from './products';
import { travelPhotos } from '../../assets/travelPhotos';

interface ProductVisualProps {
  product: Product;
  size?: 'card' | 'hero';
}

const categoryFallback = {
  hiking: travelPhotos.hiking,
  camping: travelPhotos.camping,
  surfing: travelPhotos.surfing,
};

const ProductVisual = ({ product, size = 'card' }: ProductVisualProps) => (
  <div
    className={`product-visual product-visual--${size}`}
    style={{ '--product-accent': product.accent } as CSSProperties}
    aria-hidden="true"
  >
    <img
      src={product.image}
      alt=""
      className="product-visual__photo"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = categoryFallback[product.category];
      }}
      loading="lazy"
    />
  </div>
);

export default ProductVisual;
