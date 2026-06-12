import type { CartItem } from '../context/cartContextCore';
import { BACKEND_API } from './apiClient';

interface BackendCart {
  id: string | null;
  userId: string;
  items: BackendCartItem[];
}

interface BackendCartItem {
  id: string;
  productId: string;
  quantity: number;
}

const toCartItems = (cart: BackendCart): CartItem[] =>
  cart.items.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
  }));

export const getCart = (userId: string): Promise<CartItem[]> =>
  BACKEND_API.get<BackendCart>(`/users/${userId}/cart`).then((res) => toCartItems(res.data));

export const addCartItem = (
  userId: string,
  productId: string,
  quantity = 1,
): Promise<CartItem[]> =>
  BACKEND_API.post<BackendCart>(`/users/${userId}/cart/items`, null, {
    params: { productId, quantity },
  }).then((res) => toCartItems(res.data));

export const setCartItemQuantity = (
  userId: string,
  productId: string,
  quantity: number,
): Promise<CartItem[]> =>
  BACKEND_API.put<BackendCart>(`/users/${userId}/cart/items/${productId}`, null, {
    params: { quantity },
  }).then((res) => toCartItems(res.data));

export const removeCartItem = (userId: string, productId: string): Promise<CartItem[]> =>
  BACKEND_API.delete<BackendCart>(`/users/${userId}/cart/items/${productId}`)
    .then((res) => toCartItems(res.data));
