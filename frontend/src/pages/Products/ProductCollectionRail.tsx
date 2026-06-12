import type { CSSProperties } from 'react';
import type { ProductText } from './products.en';
import type { ProductCategoryFilter } from './productCatalogFilters';
import { travelPhotos } from '../../assets/travelPhotos';

interface ProductCollectionRailProps {
  text: ProductText;
  activeCategory: ProductCategoryFilter;
  counts: Record<ProductCategoryFilter, number>;
  onCategoryChange: (category: ProductCategoryFilter) => void;
}

const collections: ProductCategoryFilter[] = ['all', 'hiking', 'camping', 'surfing'];

const collectionPhotos: Record<ProductCategoryFilter, string> = {
  all: travelPhotos.homeHero,
  hiking: travelPhotos.hiking,
  camping: travelPhotos.camping,
  surfing: travelPhotos.surfing,
};

const ProductCollectionRail = ({
  text,
  activeCategory,
  counts,
  onCategoryChange,
}: ProductCollectionRailProps) => (
  <section className="product-collections" aria-label={text.categoryFilterLabel}>
    {collections.map((category) => {
      const label = category === 'all' ? text.allCategories : text.categories[category];

      return (
        <button
          key={category}
          type="button"
          className={`product-collection product-collection--${category} ${
            activeCategory === category ? 'is-active' : ''
          }`}
          style={{ '--collection-photo': `url(${collectionPhotos[category]})` } as CSSProperties}
          onClick={() => onCategoryChange(category)}
        >
          <span className="product-collection__art" aria-hidden="true" />
          <span className="product-collection__text">
            <strong>{label}</strong>
            <span>{text.collectionDescriptions[category]}</span>
          </span>
          <span className="product-collection__count">{counts[category]}</span>
        </button>
      );
    })}
  </section>
);

export default ProductCollectionRail;
