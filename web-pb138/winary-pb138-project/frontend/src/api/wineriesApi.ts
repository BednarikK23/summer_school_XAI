import { Tour, TourPaginated } from '../models/tours';
import { Wine, WinePaginated } from '../models/wine';
import {
  Winery,
  WineryCreate,
  WineryEdit,
  WineryPaginated,
} from '../models/winery';
import { BaseApi } from './baseApi';

const WINERY_PREFIX = '/wineries';

async function getSingle(id: string) {
  return BaseApi.getSingle<Winery>(`${WINERY_PREFIX}/${id}`);
}

async function getAllPaginated({
  page,
  query,
  location,
  openingTime,
  closingTime,
  wineType,
  orderOpen,
  orderClose,
}: WineryPaginated) {
  return BaseApi.getAllPaginated<Winery>(WINERY_PREFIX, {
    params: {
      page,
      query,
      location,
      openingTime,
      closingTime,
      wineType,
      orderOpen,
      orderClose,
    },
  });
}

async function getAllWineryWinesPaginated(
  id: string,
  {
    page,
    query,
    wineType,
    alcoholMax,
    sugarMax,
    priceMax,
    priceMin,
    year,
    sortPrice,
    sortYear,
  }: WinePaginated,
) {
  return BaseApi.getAllPaginated<Wine>(`${WINERY_PREFIX}/${id}/wines`, {
    params: {
      page,
      query,
      alcoholMax,
      sugarMax,
      priceMax,
      priceMin,
      wineType,
      year,
      sortPrice,
      sortYear,
    },
  });
}

async function getAllWineryToursPaginated(
  id: string,
  { page, query, happensAfter, happensBefore, location, status, orderDate }: TourPaginated,
) {
  return BaseApi.getAllPaginated<Tour>(`${WINERY_PREFIX}/${id}/tours`, {
    params: {
      page,
      query,
      happensAfter,
      happensBefore,
      location,
      status,
      orderDate
    },
  });
}

async function createSingle(values: WineryCreate) {
  return BaseApi.postSingle<Winery>(WINERY_PREFIX, values);
}

async function editSingle(id: string, values: WineryEdit) {
  return BaseApi.putSingle<Winery>(`${WINERY_PREFIX}/${id}`, values);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Winery>(`${WINERY_PREFIX}/${id}`);
}

export const wineriesApi = {
  getSingle,
  getAllPaginated,
  createSingle,
  editSingle,
  deleteSingle,
  getAllWineryWinesPaginated,
  getAllWineryToursPaginated,
};
