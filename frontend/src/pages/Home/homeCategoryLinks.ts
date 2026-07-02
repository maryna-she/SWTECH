import type { ProductCategory } from '../Products/products';

export const homeCategoryLinks: ProductCategory[] = ['hiking', 'camping', 'surfing'];

export const createCategoryLink = (category: ProductCategory) =>
  `/products?category=${category}`;
