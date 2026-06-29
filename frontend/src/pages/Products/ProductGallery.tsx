import { useState } from 'react';
import type { Product } from './products';
import ProductVisual from './ProductVisual';

interface ProductGalleryProps {
  product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
  const [active, setActive] = useState(0);
  const { images } = product;
  const total = images.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <div className="pd-gallery">
      <div className="pd-gallery__main">
        <ProductVisual product={product} size="hero" imageUrl={images[active]} />

        {total > 1 && (
          <>
            <button
              type="button"
              className="pd-gallery__arrow pd-gallery__arrow--prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <button
              type="button"
              className="pd-gallery__arrow pd-gallery__arrow--next"
              onClick={next}
              aria-label="Next image"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <div className="pd-gallery__dots" aria-hidden="true">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`pd-gallery__dot${i === active ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
