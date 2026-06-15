import type { CSSProperties } from 'react';
import { PRICE_MAX, type ProductCategoryFilter } from './productCatalogFilters';
import type { ProductText } from './products.en';
import './ProductSidebar.css';

interface ProductSidebarProps {
  text: ProductText;
  activeCategory: ProductCategoryFilter;
  counts: Record<ProductCategoryFilter, number>;
  priceMax: number;
  minRating: number;
  onCategoryChange: (cat: ProductCategoryFilter) => void;
  onPriceMaxChange: (max: number) => void;
  onMinRatingChange: (min: number) => void;
  onReset: () => void;
}

const collections: ProductCategoryFilter[] = ['all', 'hiking', 'camping', 'surfing'];

const RATING_OPTIONS = [0, 4.5, 4.7, 4.9] as const;

const AllIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/>
    <rect x="14" y="3" width="7" height="7" rx="1.5"/>
    <rect x="3" y="14" width="7" height="7" rx="1.5"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5"/>
  </svg>
);

const HikingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 2 20 22 20"/>
  </svg>
);

const CampingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3L2 21h20L12 3z"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
  </svg>
);

const SurfingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 18c2-2.5 4.5-3.5 7-2.5s4 2 6 1 4-2.5 7-2.5"/>
    <path d="M2 13c2-2.5 4.5-3.5 7-2.5s4 2 6 1 4-2.5 7-2.5"/>
  </svg>
);

const categoryIcons: Record<ProductCategoryFilter, () => JSX.Element> = {
  all: AllIcon,
  hiking: HikingIcon,
  camping: CampingIcon,
  surfing: SurfingIcon,
};

const ProductSidebar = ({
  text,
  activeCategory,
  counts,
  priceMax,
  minRating,
  onCategoryChange,
  onPriceMaxChange,
  onMinRatingChange,
  onReset,
}: ProductSidebarProps) => {
  const hasActiveFilters =
    activeCategory !== 'all' || priceMax < PRICE_MAX || minRating > 0;

  const trackPct = Math.round((priceMax / PRICE_MAX) * 100);
  const trackStyle: CSSProperties = {
    background: `linear-gradient(to right, var(--color-secondary) ${trackPct}%, var(--color-border) ${trackPct}%)`,
  };

  return (
    <aside className="sidebar-panel">
      {/* ── Categories ─────────────────── */}
      <div className="sidebar-section">
        <p className="sidebar-section__label">{text.categoryFilterLabel}</p>
        <ul className="sidebar-cat-list" role="list">
          {collections.map((cat) => {
            const label = cat === 'all' ? text.allCategories : text.categories[cat];
            const Icon = categoryIcons[cat];
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <button
                  type="button"
                  className={`sidebar-cat-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => onCategoryChange(cat)}
                  aria-pressed={isActive}
                >
                  <span className="sidebar-cat-btn__icon"><Icon /></span>
                  <span className="sidebar-cat-btn__label">{label}</span>
                  <span className="sidebar-cat-btn__count">{counts[cat]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Price range ─────────────────── */}
      <div className="sidebar-section">
        <p className="sidebar-section__label">{text.priceLabel}</p>
        <p className="sidebar-price-value">
          {priceMax >= PRICE_MAX ? text.priceAny : text.priceUpTo(priceMax)}
        </p>
        <input
          type="range"
          className="sidebar-range"
          min={0}
          max={PRICE_MAX}
          step={10}
          value={priceMax}
          style={trackStyle}
          onChange={(e) => onPriceMaxChange(Number(e.target.value))}
          aria-label={text.priceLabel}
        />
        <div className="sidebar-range-bounds">
          <span>0 EUR</span>
          <span>{PRICE_MAX} EUR</span>
        </div>
      </div>

      {/* ── Min rating ──────────────────── */}
      <div className="sidebar-section">
        <p className="sidebar-section__label">{text.ratingLabel}</p>
        <ul className="sidebar-rating-list" role="list">
          {RATING_OPTIONS.map((rating) => {
            const isActive = minRating === rating;
            const label = rating === 0 ? text.ratingAny : `★ ${rating}+`;
            return (
              <li key={rating}>
                <button
                  type="button"
                  className={`sidebar-rating-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => onMinRatingChange(rating)}
                  aria-pressed={isActive}
                >
                  <span className="sidebar-rating-btn__dot" />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Reset ───────────────────────── */}
      {hasActiveFilters && (
        <button type="button" className="sidebar-reset" onClick={onReset}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          {text.resetFilters}
        </button>
      )}
    </aside>
  );
};

export default ProductSidebar;
