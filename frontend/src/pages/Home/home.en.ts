export interface HomeText {
  navLabel: string;
  homeLabel: string;
  home: string;
  shop: string;
  searchLabel: string;
  searchPlaceholder: string;
  closeSearchLabel: string;
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
  title: string;
  intro: string;
  createAccount: string;
  existingAccount: string;
  tripCategoriesLabel: string;
  cards: { category: string; title: string }[];
  featuredKicker: string;
  featuredTitle: string;
  reviewsKicker: string;
  reviewsTitle: string;
  reviews: { text: string; name: string; productLabel: string; productId: string }[];
}

export const homeEn: HomeText = {
  navLabel: 'Main navigation',
  homeLabel: 'Roamly home',
  home: 'Home',
  shop: 'Shop',
  searchLabel: 'Search products',
  searchPlaceholder: 'Search…',
  closeSearchLabel: 'Close search',
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
  title: 'Plan your next outdoor trip with Roamly.',
  intro: 'Gear up. Head out. Don\'t look back.',
  createAccount: 'Create account',
  existingAccount: 'I already have an account',
  tripCategoriesLabel: 'Featured travel categories',
  cards: [
    { category: 'Hiking', title: 'Mountain gear' },
    { category: 'Camping', title: 'Night setup' },
    { category: 'Surfing', title: 'Coast kit' },
  ],
  featuredKicker: 'Our top picks',
  featuredTitle: 'Popular this week',
  reviewsKicker: 'Customer reviews',
  reviewsTitle: 'What people say',
  reviews: [
    {
      text: 'Packed this for a three-day loop in the Dolomites. Zero regrets — it carried everything and the hip belt never slipped.',
      name: 'Sarah M.',
      productLabel: 'Trailhead 38L Backpack',
      productId: 'trailhead-pack-38',
    },
    {
      text: 'Tent was up in under ten minutes in the rain. Solid kit — I\'ve used cheaper tents and this one is worth every euro.',
      name: 'Tom K.',
      productLabel: 'Ultralight 2-Person Tent',
      productId: 'ultralight-tent-2p',
    },
    {
      text: 'Keeps me warm in the Baltic in late October. Genuinely surprised how flexible and easy to get into it is.',
      name: 'Lena W.',
      productLabel: '4/3 Steamer Wetsuit',
      productId: 'steamer-43-wetsuit',
    },
  ],
};
