export interface Client {
  id: string;
  name: string;
  salary: number;
  companyValuation: number;
  selected?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}