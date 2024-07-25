import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import Cart from "./components/PageComponents/Cart";
import LandingPage from "./Pages/LandingPage";
import PageNotFound from "./components/PageComponents/PageNotFound";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products/:slug" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
