import type { Product, ProductCategory } from './products';

export type ProductCategoryFilter = ProductCategory | 'all';
export type ProductSort = 'featured' | 'priceAsc' | 'ratingDesc';

export interface ProductFilterState {
  category: ProductCategoryFilter;
  query: string;
  sort: ProductSort;
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

      return matchesCategory && (!query || searchable.includes(query));
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
