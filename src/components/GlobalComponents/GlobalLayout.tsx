import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const GlobalLayout = ({ children }: any) => {
  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <div className="p-4">{children}</div>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
