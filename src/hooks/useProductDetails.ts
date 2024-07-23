import { useState, useEffect } from "react";
import { getProductDetails } from "../api/product";
import { Product } from "../types/product";

export const useProductDetails = (slug: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await getProductDetails(slug);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      }
      setLoading(false);
    };
    if (slug) fetchProductDetails();
  }, [slug]);

  return { product, loading };
};
