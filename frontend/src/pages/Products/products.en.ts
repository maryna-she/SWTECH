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
  saveToWishlist: string;
  savedToWishlist: string;
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
  quantityLabel: string;
  relatedLabel: string;
  trustShipping: string;
  trustReturns: string;
  trustWarranty: string;
  reviewsTitle: string;
  reviewsCount: (n: number) => string;
  reviewsEmpty: string;
  writeReviewTitle: string;
  reviewNameLabel: string;
  reviewNamePlaceholder: string;
  reviewTextLabel: string;
  reviewTextPlaceholder: string;
  reviewSubmit: string;
  reviewThanks: string;
  reviewRatingLabel: string;
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
  saveToWishlist: 'Save to wishlist',
  savedToWishlist: 'Remove from wishlist',
  categoryLabel: 'Category',
  priceLabel: 'Price',
  priceUpTo: (max) => `Up to ${max} EUR`,
  priceAny: 'Any price',
  ratingLabel: 'Rating',
  ratingAny: 'Any rating',
  resetFilters: 'Reset filters',
  detailsLabel: 'Specifications',
  backToProducts: 'Back to products',
  notFoundTitle: 'Product not found',
  notFoundText: 'This product is no longer in the assortment.',
  quantityLabel: 'Quantity',
  relatedLabel: 'More from this category',
  trustShipping: 'Free shipping on orders over 80 EUR',
  trustReturns: 'Free returns within 30 days',
  trustWarranty: '2-year warranty on all products',
  reviewsTitle: 'Customer reviews',
  reviewsCount: (n) => `${n} ${n === 1 ? 'review' : 'reviews'}`,
  reviewsEmpty: 'No reviews yet — be the first!',
  writeReviewTitle: 'Write a review',
  reviewNameLabel: 'Your name',
  reviewNamePlaceholder: 'e.g. Anna M.',
  reviewTextLabel: 'Your review',
  reviewTextPlaceholder: 'What did you think about this product?',
  reviewSubmit: 'Submit review',
  reviewThanks: 'Thank you for your review!',
  reviewRatingLabel: 'Your rating',
  categories: {
    hiking: 'Hiking',
    camping: 'Camping',
    surfing: 'Surfing',
  },
};
