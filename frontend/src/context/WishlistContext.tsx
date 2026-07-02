import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { WishlistContext, type WishlistItem } from './wishlistContextCore';

const WISHLIST_KEY = 'wishlist';

const readStored = (): WishlistItem[] => {
  const stored = localStorage.getItem(WISHLIST_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored) as WishlistItem[];
  } catch {
    return [];
  }
};

const persist = (items: WishlistItem[]) => {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(readStored);

  const addItem = useCallback((productId: string) => {
    setItems((current) => {
      if (current.some((i) => i.productId === productId)) return current;
      const next = [...current, { productId }];
      persist(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => {
      const next = current.filter((i) => i.productId !== productId);
      persist(next);
      return next;
    });
  }, []);

  const toggleItem = useCallback((productId: string) => {
    setItems((current) => {
      const exists = current.some((i) => i.productId === productId);
      const next = exists
        ? current.filter((i) => i.productId !== productId)
        : [...current, { productId }];
      persist(next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items],
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    localStorage.removeItem(WISHLIST_KEY);
  }, []);

  const totalItems = items.length;

  const value = useMemo(
    () => ({ items, totalItems, addItem, removeItem, toggleItem, isInWishlist, clearWishlist }),
    [addItem, clearWishlist, isInWishlist, items, removeItem, toggleItem, totalItems],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
