import axios from "axios";

const API_URL = "https://eyebrowapi.softbenz.com.np/api/order";

export const createNewCart = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/user/new-cart`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error creating new cart:", error);
    throw error;
  }
};

export const getCartDetails = async (cartId: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/cart-details/${cartId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching cart details:", error);
    throw error;
  }
};

export const addItemToCart = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-item/${cartId}`,
      {
        product: productId,
        quantity,
        variantType: "None",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const updateCartItem = async (
  cartId: string,
  itemId: string,
  quantity: number
) => {
  try {
    const response = await axios.put(
      `${API_URL}/update-item/${cartId}/${itemId}`,
      { quantity }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};
