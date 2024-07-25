import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductDetails } from "../hooks/useProductDetails";
import GlobalLayout from "../components/GlobalComponents/GlobalLayout";
import Loader from "../components/GlobalComponents/Loader";
import PageNotFound from "../components/PageComponents/PageNotFound";
import { useInitializeCart } from "../hooks/useInitializeCart";
import { addItemToCart, getCartDetails } from "../api/cart";
import { useDebounce } from "../hooks/useDebounce";

const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProductDetails(slug ?? "");
  const { initializeCart } = useInitializeCart();
  const navigate = useNavigate();
  const [cartProductIds, setCartProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (!slug) {
      navigate("/");
    }
  }, [slug, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      const cartId: any = localStorage.getItem("cartId");
      if (cartId) {
        const cartDetails = await getCartDetails(cartId);
        const productIds = cartDetails.items.map(
          (item: any) => item.product._id
        );
        setCartProductIds(productIds);
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async () => {
    if (product) {
      try {
        await initializeCart();
        const cartId: any = localStorage.getItem("cartId");
        await addItemToCart(cartId, product._id, 1);
        setCartProductIds((prevIds) => [...prevIds, product._id]);
      } catch (error) {
        console.error("Error adding product to cart:", error);
      }
    }
  };

  const debouncedAddToCart = useDebounce(handleAddToCart, 200);

  if (loading) return <Loader />;
  if (!product) return <PageNotFound />;

  const isProductInCart = cartProductIds.includes(product._id);

  return (
    <GlobalLayout>
      <div className="container mx-auto py-4 flex flex-col gap-8 my-16">
        <div className="flex  flex-col md:flex-row items-start md:items-center justify-start gap-8">
          <div className="rounded-md ">
            <div className="relative">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="rounded-md h-[40vh] bg-cover w-auto"
                />
              ) : (
                <div>No image available</div>
              )}

              {product.isBestSeller && (
                <div className="absolute top-0 left-0 bg-greenColor text-primaryText text-xs font-semibold px-2 py-1 rounded-md">
                  Best Seller
                </div>
              )}
            </div>
          </div>
          <div className="text-lg flex flex-col items-start gap-2 font-medium">
            <div>
              <span>Product Name: </span>
              <span>{product.title}</span>
            </div>
            <div>
              <span>Brand: </span>
              <span>{product.brand.name}</span>
            </div>
            <div>
              <span>Price: </span>
              <span>${product.price}</span>
            </div>
            <div>
              <span>Strike Price: </span>
              <span>${product.strikePrice}</span>
            </div>

            <div>
              <span>Off: </span>
              <span>{product.offPercent}%</span>
            </div>
            {product.status ? (
              isProductInCart ? (
                <div className="bg-secondaryColor px-3 py-2 mt-4 rounded-md text-white cursor-not-allowed">
                  Product Added to Cart
                </div>
              ) : (
                <button
                  onClick={debouncedAddToCart}
                  className="bg-blueColor hover:bg-lightBlueColor text-white px-4 py-2 mt-4 rounded-md"
                >
                  Add to Cart
                </button>
              )
            ) : (
              <div className="border border-primaryColor bg-secondaryBackground px-4 py-2 mt-4 rounded-md text-gray-500 cursor-not-allowed">
                Out Of Stock
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Description</div>
          <div
            className="text-customGray-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">Ingredient</div>
          <div
            className="text-customGray-700"
            dangerouslySetInnerHTML={{ __html: product.ingredient }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-2xl font-semibold">How To Use?</div>
          <div
            className="text-customGray-700"
            dangerouslySetInnerHTML={{ __html: product.howToUse }}
          />
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ProductDetailsPage;
