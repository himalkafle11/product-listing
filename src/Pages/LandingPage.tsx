import React from "react";
import { useProducts } from "../hooks/useProduct";
import ProductCard from "../components/PageComponents/ProductCard";
import Pagination from "../components/PageComponents/Pagination";
import GlobalLayout from "../components/GlobalComponents/GlobalLayout";
import Loader from "../components/GlobalComponents/Loader";

const LandingPage: React.FC = () => {
  const { products = [], loading, pagination, setPage } = useProducts();
  const { page, total, limit, previousPage, nextPage } = pagination;

  if (loading) return <Loader />;

  const totalPages = Math.ceil(total / limit);

  return (
    <GlobalLayout>
      <div className="container mx-auto py-4 my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          hasPrevious={previousPage}
          hasNext={nextPage}
        />
      </div>
    </GlobalLayout>
  );
};

export default LandingPage;
