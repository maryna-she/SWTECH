import { useMemo, useState } from 'react';
import useAuthLanguage from '../hooks/useAuthLanguage';
import HomeHeader from '../Home/HomeHeader';
import { homeDe } from '../Home/home.de';
import { homeEn } from '../Home/home.en';
import ProductCard from './ProductCard';
import ProductCollectionRail from './ProductCollectionRail';
import ProductFilters from './ProductFilters';
import {
  filterProducts,
  type ProductCategoryFilter,
  type ProductSort,
} from './productCatalogFilters';
import { productsDe } from './products.de';
import { productsEn } from './products.en';
import { useProductCatalog } from './useProductCatalog';
import './ProductsPage.css';

const ProductsPage = () => {
  const { language, changeLanguage } = useAuthLanguage();
  const [category, setCategory] = useState<ProductCategoryFilter>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<ProductSort>('featured');
  const { products, isLoading } = useProductCatalog();
  const headerText = language === 'de' ? homeDe : homeEn;
  const text = language === 'de' ? productsDe : productsEn;
  const collectionCounts = useMemo(
    () => ({
      all: products.length,
      hiking: products.filter((product) => product.category === 'hiking').length,
      camping: products.filter((product) => product.category === 'camping').length,
      surfing: products.filter((product) => product.category === 'surfing').length,
    }),
    [products],
  );
  const visibleProducts = useMemo(
    () => filterProducts(products, { category, query, sort }, language),
    [category, language, products, query, sort],
  );

  return (
    <main className="home-shell products-shell">
      <HomeHeader
        text={headerText}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <ProductCollectionRail
        text={text}
        activeCategory={category}
        counts={collectionCounts}
        onCategoryChange={setCategory}
      />

      <ProductFilters
        text={text}
        query={query}
        sort={sort}
        resultCount={visibleProducts.length}
        onQueryChange={setQuery}
        onSortChange={setSort}
      />

      {visibleProducts.length > 0 ? (
        <section className="products-grid" aria-label={text.allProducts}>
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              text={text}
              language={language}
              product={product}
            />
          ))}
        </section>
      ) : !isLoading ? (
        <p className="products-empty">{text.noResults}</p>
      ) : null}
    </main>
  );
};

export default ProductsPage;
