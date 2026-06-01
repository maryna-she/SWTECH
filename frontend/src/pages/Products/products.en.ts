export interface ProductText {
  navLabel: string;
  kicker: string;
  title: string;
  intro: string;
  allProducts: string;
  viewProduct: string;
  categoryLabel: string;
  priceLabel: string;
  ratingLabel: string;
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
  viewProduct: 'View product',
  categoryLabel: 'Category',
  priceLabel: 'Price',
  ratingLabel: 'Rating',
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
