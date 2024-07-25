import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-primaryBackground p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-primaryText text-xl font-semibold">
          XYZ E-COM
        </Link>
        <Link
          to="/cart"
          className="text-primaryText bg-primaryColor px-4 py-2 rounded-md"
        >
          My Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
