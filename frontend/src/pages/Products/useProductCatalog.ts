import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { products as fallbackProducts, type Product } from './products';

export const useProductCatalog = () => {
  const [catalog, setCatalog] = useState<Product[]>(fallbackProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((backendProducts) => {
        if (isMounted && backendProducts.length > 0) {
          setCatalog(backendProducts);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCatalog(fallbackProducts);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products: catalog, isLoading };
};
