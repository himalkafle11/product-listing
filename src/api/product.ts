import axios from "axios";

const API_URL = "https://eyebrowapi.softbenz.com.np/api/product";

export const getProductList = async (page: number, limit: number) => {
  try {
    const response = await axios.get(`${API_URL}/latest`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const getProductDetails = async (slug: string) => {
  try {
    const response = await axios.get(`${API_URL}/for-public/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
