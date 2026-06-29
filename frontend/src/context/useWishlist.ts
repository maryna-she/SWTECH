import { useContext } from 'react';
import { WishlistContext } from './wishlistContextCore';

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
