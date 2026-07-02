import type { ProductText } from './products.en';
import type { ProductSort } from './productCatalogFilters';

export type ViewMode = 'grid' | 'list';

interface ProductFiltersProps {
  text: ProductText;
  query: string;
  sort: ProductSort;
  viewMode: ViewMode;
  resultCount: number;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: ProductSort) => void;
  onViewChange: (mode: ViewMode) => void;
}

const sortOptions: ProductSort[] = ['featured', 'priceAsc', 'ratingDesc'];

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

const ListIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="8" y1="6" x2="21" y2="6"/>
    <line x1="8" y1="12" x2="21" y2="12"/>
    <line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/>
    <line x1="3" y1="12" x2="3.01" y2="12"/>
    <line x1="3" y1="18" x2="3.01" y2="18"/>
  </svg>
);

const ProductFilters = ({
  text,
  query,
  sort,
  viewMode,
  resultCount,
  onQueryChange,
  onSortChange,
  onViewChange,
}: ProductFiltersProps) => (
  <div className="products-toolbar" aria-label={text.filtersLabel}>
    <div className="products-toolbar__search">
      <svg
        className="products-toolbar__search-icon"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        type="search"
        value={query}
        placeholder={text.searchPlaceholder}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label={text.searchLabel}
      />
    </div>

    <div className="sort-pills" role="group" aria-label={text.sortLabel}>
      {sortOptions.map((option) => (
        <button
          key={option}
          type="button"
          className={`sort-pill${sort === option ? ' is-active' : ''}`}
          onClick={() => onSortChange(option)}
          aria-pressed={sort === option}
        >
          {text.sortOptions[option]}
        </button>
      ))}
    </div>

    <div className="view-toggle" role="group" aria-label="View mode">
      <button
        type="button"
        className={`view-btn${viewMode === 'grid' ? ' is-active' : ''}`}
        onClick={() => onViewChange('grid')}
        aria-pressed={viewMode === 'grid'}
        title="Grid view"
      >
        <GridIcon />
      </button>
      <button
        type="button"
        className={`view-btn${viewMode === 'list' ? ' is-active' : ''}`}
        onClick={() => onViewChange('list')}
        aria-pressed={viewMode === 'list'}
        title="List view"
      >
        <ListIcon />
      </button>
    </div>

    <p className="products-toolbar__count" aria-live="polite">
      {text.resultsCount(resultCount)}
    </p>
  </div>
);

export default ProductFilters;
