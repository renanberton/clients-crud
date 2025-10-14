import type { Client, PaginationInfo } from '../types/Client';

export const paginate = (
  items: Client[],
  currentPage: number,
  itemsPerPage: number
): { paginatedItems: Client[]; paginationInfo: PaginationInfo } => {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return {
    paginatedItems,
    paginationInfo: {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages
    }
  };
};