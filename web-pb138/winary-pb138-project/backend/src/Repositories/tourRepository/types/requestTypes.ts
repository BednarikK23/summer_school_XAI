export interface CreateTourRequest {
  tour: {
    location: string;
    name: string;
    address: string;
    time: string;
    status: string;
    description: string;
  };
}

export interface DeleteWinerFromTourRequest {
  tourId: string;
  winerId: string;
}

export interface AddWinerToTourRequest {
  tourId: string;
  winerId: string;
}

export interface DeleteTourRequest {
  tourId: string;
}

export interface GetTourByIdRequest {
  tourId: string;
}

export interface ModifyTourRequest {
  tourId: string;
  tour: {
    name: string | undefined;
    status: string | undefined;
    time: string | undefined;
    location: string | undefined;
    address: string | undefined;
    participants: string[] | undefined;
    desription: string | undefined;
  };
}
export interface TourPaginatedRequest {
  query?: string;
  page: number;
  happensAfter?: string | undefined;
  happensBefore?: string | undefined;
  location?: string | undefined;
  status?: string | undefined;
  winery?: string | undefined;
  orderDate?: 'asc' | 'desc' | undefined;
}
