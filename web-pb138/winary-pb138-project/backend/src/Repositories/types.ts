export interface PaginatedResult<T> {
  data: T[];
  pages: number;
}

export interface PaginatedRequest {
  page: number;
  type?: string;
  query?: string | undefined;
  winery?: string | undefined;
  status?: string;
  filters?: {
    wineType: string | undefined;
    alcoholMax: number | undefined;
    sugarMax: number | undefined;
    priceMax: number | undefined;
    priceMin: number | undefined;
    year: string | undefined;
  };
  order?: {
    price: 'asc' | 'desc' | undefined;
    year: 'asc' | 'desc' | undefined;
  };
}

export interface PaginatedRequestOrder {
  page: number;
  type?: string;
  query?: string | undefined;
  winery?: string;
  status?: string;
}
