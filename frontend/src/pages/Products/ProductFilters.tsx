import type { ProductText } from './products.en';
import type { ProductSort } from './productCatalogFilters';

interface ProductFiltersProps {
  text: ProductText;
  query: string;
  sort: ProductSort;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: ProductSort) => void;
}

const sortOptions: ProductSort[] = ['featured', 'priceAsc', 'ratingDesc'];

const ProductFilters = ({
  text,
  query,
  sort,
  resultCount,
  onQueryChange,
  onSortChange,
}: ProductFiltersProps) => (
  <section className="product-filters" aria-label={text.filtersLabel}>
    <div className="product-filters__search">
      <label htmlFor="product-search">{text.searchLabel}</label>
      <input
        id="product-search"
        type="search"
        value={query}
        placeholder={text.searchPlaceholder}
        onChange={(event) => onQueryChange(event.target.value)}
      />
    </div>

    <div className="product-filters__sort">
      <label htmlFor="product-sort">{text.sortLabel}</label>
      <select
        id="product-sort"
        value={sort}
        onChange={(event) => onSortChange(event.target.value as ProductSort)}
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {text.sortOptions[option]}
          </option>
        ))}
      </select>
    </div>

    <p className="product-filters__count" aria-live="polite">
      {text.resultsCount(resultCount)}
    </p>
  </section>
);

export default ProductFilters;
