import type { CartItem } from '../../context/cartContextCore';
import type { Product } from '../Products/products';

export interface CartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

export const parseEuroPrice = (price: string) => Number(price.replace(/[^\d.]/g, ''));

export const formatEuro = (value: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);

export const createCartLines = (items: CartItem[], products: Product[]): CartLine[] =>
  items
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        lineTotal: parseEuroPrice(product.price) * item.quantity,
      };
    })
    .filter((line): line is CartLine => line !== null);
