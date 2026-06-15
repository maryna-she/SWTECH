export interface ProductText {
  navLabel: string;
  kicker: string;
  title: string;
  intro: string;
  allProducts: string;
  allCategories: string;
  categoryFilterLabel: string;
  collectionDescriptions: {
    all: string;
    hiking: string;
    camping: string;
    surfing: string;
  };
  filtersLabel: string;
  noResults: string;
  resultsCount: (count: number) => string;
  searchLabel: string;
  searchPlaceholder: string;
  sortLabel: string;
  sortOptions: {
    featured: string;
    priceAsc: string;
    ratingDesc: string;
  };
  viewProduct: string;
  addToCart: string;
  categoryLabel: string;
  priceLabel: string;
  priceUpTo: (max: number) => string;
  priceAny: string;
  ratingLabel: string;
  ratingAny: string;
  resetFilters: string;
  detailsLabel: string;
  backToProducts: string;
  notFoundTitle: string;
  notFoundText: string;
  categories: {
    hiking: string;
    camping: string;
    surfing: string;
  };
}

export const productsEn: ProductText = {
  navLabel: 'Product navigation',
  kicker: 'Roamly Shop',
  title: 'Gear for hiking, camping, and surfing.',
  intro: 'Pick outdoor essentials for your next route.',
  allProducts: 'All products',
  allCategories: 'All',
  categoryFilterLabel: 'Category',
  collectionDescriptions: {
    all: 'Everything for the route',
    hiking: 'Light layers and packs',
    camping: 'Shelter, light, and comfort',
    surfing: 'Water-ready essentials',
  },
  filtersLabel: 'Product filters',
  noResults: 'No products match these filters.',
  resultsCount: (count) => `${count} ${count === 1 ? 'product' : 'products'} found`,
  searchLabel: 'Search',
  searchPlaceholder: 'Search gear…',
  sortLabel: 'Sort by',
  sortOptions: {
    featured: 'Featured',
    priceAsc: 'Lowest price',
    ratingDesc: 'Top rating',
  },
  viewProduct: 'View',
  addToCart: 'Add to cart',
  categoryLabel: 'Category',
  priceLabel: 'Price',
  priceUpTo: (max) => `Up to ${max} EUR`,
  priceAny: 'Any price',
  ratingLabel: 'Rating',
  ratingAny: 'Any rating',
  resetFilters: 'Reset filters',
  detailsLabel: 'Details',
  backToProducts: 'Back to products',
  notFoundTitle: 'Product not found',
  notFoundText: 'This product is no longer in the assortment.',
  categories: {
    hiking: 'Hiking',
    camping: 'Camping',
    surfing: 'Surfing',
  },
};
