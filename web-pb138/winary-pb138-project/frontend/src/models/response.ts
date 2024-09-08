export type ResponseMulti<T> = {
  items: T[];
};

export type ResponseSingle<T> = {
  item: T;
};

export type ResponseMultiPaginated<T> = ResponseMulti<T> & {
  pagination: Pagination;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
};
