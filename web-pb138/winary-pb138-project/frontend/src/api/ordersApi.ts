import { Order, OrderCreate, OrderEdit, OrderPaginated } from '../models/order';
import { BaseApi } from './baseApi';

const ORDERS_PREFIX = '/orders';

async function getSingle(id: string) {
  return BaseApi.getSingle<Order>(`${ORDERS_PREFIX}/${id}`);
}

async function getAllPaginated({
  page,
  query,
  winery,
  status,
}: OrderPaginated) {
  return BaseApi.getAllPaginated<Order>(ORDERS_PREFIX, {
    params: {
      page,
      query,
      winery,
      status,
    },
  });
}

async function getAll(id: string) {
  return BaseApi.getAll<Order>(`${ORDERS_PREFIX}/${id}`);
}

async function createSingle(values: OrderCreate) {
  return BaseApi.postSingle<Order>(ORDERS_PREFIX, values);
}

async function editSingle(id: string, values: OrderEdit) {
  return BaseApi.putSingle<Order>(`${ORDERS_PREFIX}/${id}`, values);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<Order>(`${ORDERS_PREFIX}/${id}`);
}

export const ordersApi = {
  getSingle,
  getAll,
  getAllPaginated,
  createSingle,
  editSingle,
  deleteSingle,
};
