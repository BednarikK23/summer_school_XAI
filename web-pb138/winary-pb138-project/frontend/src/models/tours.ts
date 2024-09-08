import { BaseModelId, BaseModelTimestamps } from './base';
import { RequestPagination } from './request';
import { Winery } from './winery';

export type Tour = BaseModelId &
  BaseModelTimestamps & {
    location: string;
    address: string;
    time: string;
    status: string;
    name: string;
    participants: Winery[];
    description: string;
  };

export type TourCreate = Omit<
  Tour,
  'id' | 'createdAt' | 'updatedAt' | 'participants'
>;

export type TourEdit = {
  location: string;
  address: string;
  time: string;
  status: string;
  name: string;
  participants: Winery[];
  description: string;
};

export type TourAddWinery = {
  winerId: string;
};

export type TourPaginated = RequestPagination & {
  happensAfter?: string;
  happensBefore?: string;
  location?: string;
  status?: string;
  orderDate?: string;
};
