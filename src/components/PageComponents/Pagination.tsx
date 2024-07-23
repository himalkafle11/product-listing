import React from "react";
import { PaginationProps } from "../../types/pagination";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  hasPrevious,
  hasNext,
}) => {
  return (
    <div className="flex justify-start items-center gap-2 md:gap-4 mt-12 md:p-0 ">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
        className="md:text-md text-sm px-2 py-1 bg-secondaryBackground text-customGray-800 border border-primaryColor rounded cursor-pointer"
      >
        Previous
      </button>
      <span className="md:text-md text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
        className="md:text-md text-sm px-2 py-1 bg-secondaryBackground text-customGray-800 rounded border border-primaryColor cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
