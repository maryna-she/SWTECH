import type { Product, ProductCategory } from './products';

export type ProductCategoryFilter = ProductCategory | 'all';
export type ProductSort = 'featured' | 'priceAsc' | 'ratingDesc';

export const PRICE_MAX = 800;

export interface ProductFilterState {
  category: ProductCategoryFilter;
  query: string;
  sort: ProductSort;
  priceMax: number;
  minRating: number;
}

const readPrice = (price: string) => Number.parseFloat(price.replace(',', '.'));
const readRating = (rating: string) => Number.parseFloat(rating.replace(',', '.'));

export const filterProducts = (
  products: Product[],
  filters: ProductFilterState,
  language: 'de' | 'en',
) => {
  const query = filters.query.trim().toLowerCase();

  return products
    .filter((product) => {
      const matchesCategory =
        filters.category === 'all' || product.category === filters.category;
      const searchable = [
        product.title[language],
        product.shortText[language],
        product.description[language],
      ]
        .join(' ')
        .toLowerCase();

      const price = readPrice(product.price);
      const matchesPrice = price <= filters.priceMax;

      const rating = readRating(product.rating);
      const matchesRating = rating >= filters.minRating;

      return matchesCategory && matchesPrice && matchesRating && (!query || searchable.includes(query));
    })
    .sort((left, right) => {
      if (filters.sort === 'priceAsc') {
        return readPrice(left.price) - readPrice(right.price);
      }

      if (filters.sort === 'ratingDesc') {
        return readRating(right.rating) - readRating(left.rating);
      }

      return products.indexOf(left) - products.indexOf(right);
    });
};
