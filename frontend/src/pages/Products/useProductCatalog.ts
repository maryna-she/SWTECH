import { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import { products as staticProducts, type Product } from './products';

export const useProductCatalog = () => {
  const [catalog, setCatalog] = useState<Product[]>(staticProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((backendProducts) => {
        if (!isMounted) return;

        // Merge backend UUIDs into the static product list so cart operations
        // use the correct server-side IDs. Static data is always the display source.
        const merged = staticProducts.map((staticProduct) => {
          const backendMatch = backendProducts.find(
            (b) => b.title.en === staticProduct.title.en,
          );
          return backendMatch
            ? { ...staticProduct, id: backendMatch.id }
            : staticProduct;
        });

        setCatalog(merged);
      })
      .catch(() => {
        /* keep static fallback already in state */
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { products: catalog, isLoading };
};
