import type { Product } from '../pages/Products/products';
import { products as staticProducts } from '../pages/Products/products';
import { PUBLIC_API } from './apiClient';

interface BackendProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

const toProduct = (backend: BackendProduct): Product => {
  const matched = staticProducts.find(
    (p) => p.title.en === backend.name || p.title.de === backend.name,
  );

  if (matched) {
    return {
      ...matched,
      id: backend.id,
      price: formatPrice(backend.price),
    };
  }

  // fallback for unrecognised backend products
  return {
    id: backend.id,
    category: 'hiking',
    price: formatPrice(backend.price),
    rating: '4.5',
    accent: '#2f6f4f',
    title: { de: backend.name, en: backend.name },
    shortText: { de: backend.description, en: backend.description },
    description: { de: backend.description, en: backend.description },
    details: {
      de: [`${backend.stockQuantity} Stück verfügbar`],
      en: [`${backend.stockQuantity} items available`],
    },
  };
};

export const getProducts = async (): Promise<Product[]> => {
  const response = await PUBLIC_API.get<BackendProduct[]>('/products', { params: { pageSize: 100 } });
  return response.data.map(toProduct);
};
