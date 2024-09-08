import { Wine, WineCreate, WineEdit, WinePaginated } from '../models/wine';
import { BaseApi } from './baseApi';

const WINES_PREFIX = '/wines';

async function getSingle(id: string) {
  return BaseApi.getSingle<Wine>(`${WINES_PREFIX}/${id}`);
}

async function getAllPaginated({
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
}: WinePaginated) {
  return BaseApi.getAllPaginated<Wine>(WINES_PREFIX, {
    params: {
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
    },
  });
}

async function createSingle(values: WineCreate) {
  return BaseApi.postSingle<Wine>(WINES_PREFIX, values);
}

async function editSingle(id: string, values: WineEdit) {
  return BaseApi.putSingle<Wine>(`${WINES_PREFIX}/${id}`, values);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Wine>(`${WINES_PREFIX}/${id}`);
}

export const winesApi = {
  getSingle,
  getAllPaginated,
  createSingle,
  editSingle,
  deleteSingle,
};
