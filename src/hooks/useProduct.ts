import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { getProductList } from "../api/product";
import { Pagination } from "../types/pagination";

interface UseProductsResponse {
  products: Product[];
  loading: boolean;
  pagination: Pagination;
  setPage: (page: number) => void;
}

export const useProducts = (): UseProductsResponse => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    previousPage: false,
    nextPage: false,
  });

  const fetchProducts = async (page: number) => {
    setLoading(true);
    try {
      const response = await getProductList(page, pagination.limit);
      setProducts(response.data.docs);
      setPagination({
        total: response.data.pagination.total,
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        previousPage: response.data.pagination.previousPage,
        nextPage: response.data.pagination.nextPage,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page);
  },[]);

  const setPage = (page: number) => {
    if (page > 0 && page <= Math.ceil(pagination.total / pagination.limit)) {
      setPagination((prev) => ({ ...prev, page }));
    }
  };

  return { products, loading, pagination, setPage };
};
