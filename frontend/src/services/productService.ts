import type { Product } from '../pages/Products/products';
import { PUBLIC_API } from './apiClient';

interface BackendProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

const accents = ['#2f6f4f', '#58715f', '#bf6f33', '#d4a340', '#347b88', '#1f5362'];

const pickCategory = (name: string): Product['category'] => {
  const normalized = name.toLowerCase();

  if (normalized.includes('tent') || normalized.includes('camp') || normalized.includes('laterne')) {
    return 'camping';
  }

  if (normalized.includes('surf') || normalized.includes('board') || normalized.includes('wetsuit')) {
    return 'surfing';
  }

  return 'hiking';
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

const toProduct = (product: BackendProduct, index: number): Product => {
  const description = product.description || product.name;

  return {
    id: product.id,
    category: pickCategory(product.name),
    price: formatPrice(product.price),
    rating: product.stockQuantity > 0 ? '4.6' : '4.0',
    accent: accents[index % accents.length],
    title: {
      de: product.name,
      en: product.name,
    },
    shortText: {
      de: description,
      en: description,
    },
    description: {
      de: description,
      en: description,
    },
    details: {
      de: [`${product.stockQuantity} Stück verfügbar`],
      en: [`${product.stockQuantity} items available`],
    },
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await PUBLIC_API.get<BackendProduct[]>('/products');
  return response.data.map(toProduct);
};
