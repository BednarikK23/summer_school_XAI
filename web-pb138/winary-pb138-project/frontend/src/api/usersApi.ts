import { RequestPagination } from '../models/request';
import { User, UserCreate, UserEdit } from '../models/user';
import { BaseApi } from './baseApi';

const USERS_PREFIX = '/users';

async function getSingle(id: string) {
  return BaseApi.getSingle<User>(`${USERS_PREFIX}/${id}`);
}

async function getAllPaginated({ page, query }: RequestPagination) {
  return BaseApi.getAllPaginated<User>(USERS_PREFIX, {
    params: {
      page,
      query,
    },
  });
}

async function createSingle(values: UserCreate) {
  return BaseApi.postSingle<User>(USERS_PREFIX, values);
}

async function editSingle(id: string, values: UserEdit) {
  return BaseApi.putSingle<User>(`${USERS_PREFIX}/${id}`, values);
}

async function deleteSingle(id: string) {
  return BaseApi.deleteSingle<User>(`${USERS_PREFIX}/${id}`);
}

export const usersApi = {
  getSingle,
  getAllPaginated,
  createSingle,
  editSingle,
  deleteSingle,
};
