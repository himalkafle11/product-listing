import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://eyebrowapi.softbenz.com.np/api/order";

export const useInitializeCart = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const initializeCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    const existingCartId = localStorage.getItem("cartId");
    if (existingCartId) {
     
      console.log("Cart is already initialized.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/user/new-cart`, {});
      const { data } = response.data;
      if (data && data._id) {
        localStorage.setItem("cartId", data._id);
        console.log("New cart initialized:", data);
      } else {
        throw new Error("Failed to create a new cart.");
      }
    } catch (error) {
      setError("Error initializing cart.");
      console.error("Error initializing cart:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { initializeCart, loading, error };
};
