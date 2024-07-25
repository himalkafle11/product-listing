export interface Pagination {
  total: number;
  page: number;
  limit: number;
  previousPage: boolean;
  nextPage: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasPrevious: boolean;
  hasNext: boolean;
}
