import {
  Tour,
  TourAddWinery,
  TourCreate,
  TourEdit,
  TourPaginated,
} from '../models/tours';
import { BaseApi } from './baseApi';

const TOURS_PREFIX = '/tours';

async function getSingle(id: string) {
  return BaseApi.getSingle<Tour>(`${TOURS_PREFIX}/${id}`);
}

async function getAllPaginated({
  page,
  query,
  happensAfter,
  happensBefore,
  location,
  status,
  orderDate,
}: TourPaginated) {
  return BaseApi.getAllPaginated<Tour>(TOURS_PREFIX, {
    params: {
      page,
      query,
      happensAfter,
      happensBefore,
      location,
      status,
      orderDate,
    },
  });
}

async function createSingle(values: TourCreate) {
  return BaseApi.postSingle<Tour>(TOURS_PREFIX, values);
}

async function editSingle(id: string, values: TourEdit) {
  return BaseApi.putSingle<Tour>(`${TOURS_PREFIX}/${id}`, values);
}

async function addWineryToTour(id: string, values: TourAddWinery) {
  return BaseApi.putSingle<Tour>(`${TOURS_PREFIX}/${id}/addwiner`, values);
}

async function removeWineryFromTour(id: string, values: TourAddWinery) {
  return BaseApi.deleteSingle<Tour>(
    `${TOURS_PREFIX}/${id}/removewiner`,
    values,
  );
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Tour>(`${TOURS_PREFIX}/${id}`);
}

export const toursApi = {
  getSingle,
  getAllPaginated,
  createSingle,
  editSingle,
  deleteSingle,
  addWineryToTour,
  removeWineryFromTour,
};
