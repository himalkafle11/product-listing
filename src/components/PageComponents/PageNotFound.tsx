import React from "react";
import GlobalLayout from "../GlobalComponents/GlobalLayout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <GlobalLayout>
      <div className="flex flex-col gap-8 items-center justify-center">
        <img
          alt="page-not-found"
          src="/page_not_found.webp"
          className="rounded-md h-[50vh]"
        />
        <div className="text-xl font-semibold text-red-500">
          Opps! Page Not Found.
        </div>
        <Link
          to="/"
          className="font-semibold text-blueColor border px-2 py-3 rounded-md"
        >
          Go To Home Page
        </Link>
      </div>
    </GlobalLayout>
  );
};

export default PageNotFound;
