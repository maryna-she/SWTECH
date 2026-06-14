import type { ProductCategory } from './products';

const productCategories: ProductCategory[] = ['hiking', 'camping', 'surfing'];

export const readCategoryFromUrl = (value: string | null): ProductCategory | 'all' =>
  productCategories.includes(value as ProductCategory)
    ? (value as ProductCategory)
    : 'all';
