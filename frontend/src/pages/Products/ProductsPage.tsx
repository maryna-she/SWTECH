import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useLanguage from '../../context/useLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import ProductCard from './ProductCard';
import ProductFilters, { type ViewMode } from './ProductFilters';
import ProductSidebar from './ProductSidebar';
import {
  filterProducts,
  PRICE_MAX,
  type ProductCategoryFilter,
  type ProductSort,
} from './productCatalogFilters';
import { readCategoryFromUrl } from './productCategoryUrl';
import { productsDe } from './products.de';
import { productsEn } from './products.en';
import { useProductCatalog } from './useProductCatalog';
import './ProductsPage.css';

const ProductsPage = () => {
  const { language, changeLanguage } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<ProductCategoryFilter>(() =>
    readCategoryFromUrl(searchParams.get('category')),
  );
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [sort, setSort] = useState<ProductSort>('featured');
  const [priceMax, setPriceMax] = useState(PRICE_MAX);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const { products, isLoading } = useProductCatalog();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? productsDe : productsEn;

  const collectionCounts = useMemo(
    () => ({
      all: products.length,
      hiking: products.filter((p) => p.category === 'hiking').length,
      camping: products.filter((p) => p.category === 'camping').length,
      surfing: products.filter((p) => p.category === 'surfing').length,
    }),
    [products],
  );

  const visibleProducts = useMemo(
    () => filterProducts(products, { category, query, sort, priceMax, minRating }, language),
    [category, language, products, query, sort, priceMax, minRating],
  );

  useEffect(() => {
    setCategory(readCategoryFromUrl(searchParams.get('category')));
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const changeCategory = (nextCategory: ProductCategoryFilter) => {
    setCategory(nextCategory);
    setSearchParams(nextCategory === 'all' ? {} : { category: nextCategory });
  };

  const handleReset = () => {
    setCategory('all');
    setSearchParams({});
    setPriceMax(PRICE_MAX);
    setMinRating(0);
  };

  return (
    <main className="home-shell products-shell">
      <HomeHeader text={headerText} language={language} onLanguageChange={changeLanguage} />

      <div className="products-layout">
        <div className="products-sidebar-area">
          <ProductSidebar
            text={text}
            activeCategory={category}
            counts={collectionCounts}
            priceMax={priceMax}
            minRating={minRating}
            onCategoryChange={changeCategory}
            onPriceMaxChange={setPriceMax}
            onMinRatingChange={setMinRating}
            onReset={handleReset}
          />
        </div>

        <div className="products-content">
          <ProductFilters
            text={text}
            query={query}
            sort={sort}
            viewMode={viewMode}
            resultCount={visibleProducts.length}
            onQueryChange={setQuery}
            onSortChange={setSort}
            onViewChange={setViewMode}
          />

          {(category !== 'all' || priceMax < PRICE_MAX || minRating > 0) && (
            <div className="products-chips" role="list" aria-label="Active filters">
              {category !== 'all' && (
                <span className="products-chip" role="listitem">
                  {text.categories[category as keyof typeof text.categories]}
                  <button type="button" onClick={() => changeCategory('all')} aria-label="Remove category filter">×</button>
                </span>
              )}
              {priceMax < PRICE_MAX && (
                <span className="products-chip" role="listitem">
                  {text.priceUpTo(priceMax)}
                  <button type="button" onClick={() => setPriceMax(PRICE_MAX)} aria-label="Remove price filter">×</button>
                </span>
              )}
              {minRating > 0 && (
                <span className="products-chip" role="listitem">
                  ★ {minRating}+
                  <button type="button" onClick={() => setMinRating(0)} aria-label="Remove rating filter">×</button>
                </span>
              )}
            </div>
          )}

          {isLoading ? (
            <section className="products-grid" aria-label={text.allProducts} aria-busy="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-card product-card--skeleton" aria-hidden="true">
                  <div className="product-card__skeleton-visual" />
                  <div className="product-card__body">
                    <div className="skeleton-line skeleton-line--short" />
                    <div className="skeleton-line skeleton-line--title" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line skeleton-line--short" />
                  </div>
                </div>
              ))}
            </section>
          ) : visibleProducts.length > 0 ? (
            <section className={`products-grid${viewMode === 'list' ? ' products-grid--list' : ''}`} aria-label={text.allProducts}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} text={text} language={language} product={product} />
              ))}
            </section>
          ) : (
            <div className="products-empty">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <p>{text.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
