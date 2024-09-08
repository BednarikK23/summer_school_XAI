import { BaseModelId, BaseModelTimestamps } from './base';
import { RequestPagination } from './request';

export type Winery = BaseModelId &
  BaseModelTimestamps & {
    name: string;
    ownerId: string;
    ico: string;
    phone: string;
    email: string;
    location: string;
    openingTime: string;
    closingTime: string;
    description: string;
    address: string;
  };

export type WineryEdit = Omit<Winery, 'id' | 'createdAt' | 'updatedAt'>;

export type WineryCreate = Omit<Winery, 'id' | 'createdAt' | 'updatedAt'>;

export type WineryPaginated = RequestPagination & {
  location?: string;
  openingTime?: string;
  closingTime?: string;
  wineType?: string;
  orderOpen?: string;
  orderClose?: string;
};
