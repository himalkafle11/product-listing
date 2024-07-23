import React from "react";
import { Product } from "../../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="border p-4 flex flex-col gap-2 hover:shadow-lg shadow-sm rounded-md"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-auto h-[30vh] md:h-[40vh] object-cover"
      />
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold rounded-md px-2 py-1 border border-secondaryColor">{product.offPercent} % off</div>{" "}
        <div className="border border-primaryColor text-sm font-semibold rounded-md px-2 py-1">Product By {product.brand.name}</div>
      </div>
      <p className="text-greenColor font-semibold text-2xl">${product.price}</p>
    </Link>
  );
};

export default ProductCard;
