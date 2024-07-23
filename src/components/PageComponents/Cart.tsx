import React, { useState, useEffect } from "react";
import { useInitializeCart } from "../../hooks/useInitializeCart";
import Loader from "../GlobalComponents/Loader";
import { CartDetails } from "../../types/cart";
import { getCartDetails, updateCartItem } from "../../api/cart";
import GlobalLayout from "../GlobalComponents/GlobalLayout";
import { useDebounce } from "../../hooks/useDebounce";
import { Link } from "react-router-dom";

const CartComponent: React.FC = () => {
  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);
  const {
    initializeCart,
    loading: initLoading,
    error: initError,
  } = useInitializeCart();

  const cartId: any = localStorage.getItem("cartId");

  useEffect(() => {
    const initializeUserCart = async () => {
      await initializeCart();
    };
    initializeUserCart();
  }, [initializeCart]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      if (cartId) {
        const details = await getCartDetails(cartId);
        setCartDetails(details);
      }
    };

    fetchCartDetails();
  }, [cartId]);

  const handleUpdateCartItem = async (itemId: string, newQuantity: number) => {
    if (cartId && newQuantity > 0) {
      await updateCartItem(cartId, itemId, newQuantity);
      const updatedDetails = await getCartDetails(cartId);
      setCartDetails(updatedDetails);
    }
  };

  const debouncedUpdateCartItem = useDebounce(handleUpdateCartItem, 300);

  if (initLoading || !cartDetails) return <Loader />;
  if (initError) return <div>Error initializing cart: {initError}</div>;

  return (
    <GlobalLayout>
      <div className="container flex flex-col gap-8 mx-auto py-4 my-16">
        <h2 className="text-2xl font-semibold mt-6">Cart Details</h2>
        <div className="border p-4 rounded-md shadow-sm grid grid-cols-1 md:grid-cols-4 gap-8 font-semibold bg-secondaryBackground">
          <div>Order Status: {cartDetails.orderStatus}</div>
          <div>Payment Method: {cartDetails.paymentMethod}</div>
          <div>Sub Total: {cartDetails.subTotal}</div>
          <div>Total Amount: {cartDetails.totalAmount}</div>
          <div>Voucher Amount: {cartDetails.voucherAmount}</div>
          <div>
            Voucher Code:{" "}
            {cartDetails.voucherCode === "" ? "-" : cartDetails.voucherCode}
          </div>
          <div>Delivery Charge: {cartDetails.deliveryCharge}</div>
          <div>
            Delivery Address:{" "}
            {cartDetails.deliveryAddress === ""
              ? "-"
              : cartDetails.deliveryAddress}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-6">Items In Cart</h2>

        {cartDetails.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cartDetails.items.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-md shadow-md flex md:flex-row flex-col items-center gap-8"
              >
                <Link to={`/products/${item.product.slug}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="flex-1 w-auto h-[40vh] object-cover mb-2"
                  />
                </Link>
                <div
                  className="flex-1 flex flex-col gap-2 font-semibold
"
                >
                  <h3 className="text-lg ">
                    Product Name: {item.product.title}
                  </h3>
                  <p className="text-greenColor ">Price: ${item.price}</p>
                  <p className=" ">Off: {item.offPercent}%</p>

                  <div className="flex items-center gap-2">
                    <div>Quantity: </div>
                    <button
                      onClick={() =>
                        debouncedUpdateCartItem(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="bg-customGray-200 px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        debouncedUpdateCartItem(item._id, item.quantity + 1)
                      }
                      className="bg-customGray-200 px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-center justify-center">
            <img
              alt="empty-cart"
              src="/empty_cart.webp"
              className="rounded-md h-[30vh] md:h-[50vh]"
            />
            <div className="text-xl font-semibold text-red-500">
              Opps! Cart Is Empty.
            </div>
            <Link
              to="/"
              className="font-semibold text-blueColor border px-2 py-3 rounded-md"
            >
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </GlobalLayout>
  );
};

export default CartComponent;
