export interface WishlistText {
  kicker: string;
  title: string;
  intro: string;
  emptyTitle: string;
  emptyText: string;
  backToProducts: string;
  remove: string;
  addToCart: string;
  clearAll: string;
  itemCount: (count: number) => string;
  bannerTitle: string;
  bannerText: string;
  bannerRegister: string;
  bannerLoginPrefix: string;
  bannerLogin: string;
}

export const wishlistEn: WishlistText = {
  kicker: 'Your wishlist',
  title: 'Saved for later.',
  intro: 'Products you want to come back to.',
  emptyTitle: 'Nothing saved yet',
  emptyText: 'Browse the shop and tap the heart on any product to save it here.',
  backToProducts: 'Browse products',
  remove: 'Remove',
  addToCart: 'Add to cart',
  clearAll: 'Clear all',
  itemCount: (count) => `${count} ${count === 1 ? 'item' : 'items'} saved`,
  bannerTitle: 'Save your wishlist',
  bannerText: 'Your saved items are stored in this browser only. Create an account to keep them across all your devices.',
  bannerRegister: 'Create account',
  bannerLoginPrefix: 'Already have an account?',
  bannerLogin: 'Sign in',
};
