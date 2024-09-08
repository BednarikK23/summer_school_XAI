import { BaseModelId, BaseModelTimestamps } from './base';
import { RequestPagination } from './request';

export type Wine = BaseModelId &
  BaseModelTimestamps & {
    name: string;
    price: string;
    wineryId: string;
    alcoholPercentage: number;
    attribution: string;
    description: string;
    glycerolGramsPerLiter: number;
    pH: number;
    sugarGramsPerLiter: number;
    totalAcidityGramsPerLiter: number;
    type: string;
    year: string;
  };

export type WineEdit = Omit<
  Wine,
  'id' | 'createdAt' | 'wineryId' | 'updatedAt'
>;

export type WineCreate = Omit<Wine, 'id' | 'createdAt' | 'updatedAt'>;

export type WinePaginated = RequestPagination & {
  wineType?: string;
  alcoholMax?: string;
  sugarMax?: string;
  priceMax?: string;
  priceMin?: string;
  year?: string;
  sortPrice?: string;
  sortYear?: string;
};
