import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  addCartItem,
  getCart,
  removeCartItem,
  setCartItemQuantity,
} from '../services/cartService';
import { useAuth } from './useAuth';
import { CartContext, type CartItem } from './cartContextCore';

const CART_STORAGE_KEY = 'cart';

const readStoredCart = (): CartItem[] => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as CartItem[];
  } catch {
    return [];
  }
};

const persistCart = (items: CartItem[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;

  const saveItems = useCallback((nextItems: CartItem[]) => {
    setItems(nextItems);
    persistCart(nextItems);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      return;
    }

    let isMounted = true;

    getCart(userId)
      .then((backendItems) => {
        if (isMounted) {
          saveItems(backendItems);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems(readStoredCart());
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, saveItems, userId]);

  const addItem = useCallback((productId: string) => {
    if (isAuthenticated && userId) {
      addCartItem(userId, productId)
        .then(saveItems)
        .catch(() => undefined);
      return;
    }

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.productId === productId);
      const nextItems = existing
        ? currentItems.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...currentItems, { productId, quantity: 1 }];

      persistCart(nextItems);
      return nextItems;
    });
  }, [isAuthenticated, saveItems, userId]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const safeQuantity = Math.max(0, Math.floor(quantity));

    if (isAuthenticated && userId) {
      const request = safeQuantity === 0
        ? removeCartItem(userId, productId)
        : setCartItemQuantity(userId, productId, safeQuantity);

      request
        .then(saveItems)
        .catch(() => undefined);
      return;
    }

    setItems((currentItems) => {
      const nextItems = safeQuantity === 0
        ? currentItems.filter((item) => item.productId !== productId)
        : currentItems.map((item) =>
            item.productId === productId ? { ...item, quantity: safeQuantity } : item,
          );

      persistCart(nextItems);
      return nextItems;
    });
  }, [isAuthenticated, saveItems, userId]);

  const removeItem = useCallback((productId: string) => {
    if (isAuthenticated && userId) {
      removeCartItem(userId, productId)
        .then(saveItems)
        .catch(() => undefined);
      return;
    }

    setItems((currentItems) => {
      const nextItems = currentItems.filter((item) => item.productId !== productId);
      persistCart(nextItems);
      return nextItems;
    });
  }, [isAuthenticated, saveItems, userId]);

  const clearCart = useCallback(() => {
    if (isAuthenticated && userId) {
      Promise.all(items.map((item) => removeCartItem(userId, item.productId)))
        .then(() => saveItems([]))
        .catch(() => undefined);
      return;
    }

    saveItems([]);
  }, [isAuthenticated, items, saveItems, userId]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items, totalItems, addItem, updateQuantity, removeItem, clearCart }),
    [addItem, clearCart, items, removeItem, totalItems, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
