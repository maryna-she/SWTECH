export interface HomeText {
  navLabel: string;
  homeLabel: string;
  home: string;
  shop: string;
  wishlistLabel: string;
  cartLabel: string;
  products: string;
  categories: string;
  discounts: string;
  about: string;
  contacts: string;
  categoryItems: string[];
  accountLabel: string;
  logout: string;
  kicker: string;
  title: string;
  intro: string;
  createAccount: string;
  existingAccount: string;
  tripCategoriesLabel: string;
  highlightsLabel: string;
  cards: { category: string; title: string }[];
  highlights: { title: string; text: string }[];
}

export const homeEn: HomeText = {
  navLabel: 'Main navigation',
  homeLabel: 'Roamly home',
  home: 'Home',
  shop: 'Shop',
  wishlistLabel: 'Open wishlist',
  cartLabel: 'Open cart',
  products: 'All products',
  categories: 'Categories',
  discounts: 'Discounts',
  about: 'About us',
  contacts: 'Contacts',
  categoryItems: ['Hiking', 'Camping', 'Surfing'],
  accountLabel: 'Open account page',
  logout: 'Log out',
  kicker: 'Travel shop for every route',
  title: 'Plan your next outdoor trip with Roamly.',
  intro: 'Gear up. Head out. Don\'t look back.',
  createAccount: 'Create account',
  existingAccount: 'I already have an account',
  tripCategoriesLabel: 'Featured travel categories',
  highlightsLabel: 'Roamly highlights',
  cards: [
    { category: 'Hiking', title: 'Mountain gear' },
    { category: 'Camping', title: 'Night setup' },
    { category: 'Surfing', title: 'Coast kit' },
  ],
  highlights: [
    { title: 'Choose a category', text: 'Browse products grouped around the way you travel.' },
    { title: 'Save your cart', text: 'Register once and come back to your trip plan later.' },
    { title: 'Track orders', text: 'Keep your account and future purchases in one simple place.' },
  ],
};
