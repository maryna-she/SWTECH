import { createContext } from 'react';

export interface WishlistItem {
  productId: string;
}

export interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
