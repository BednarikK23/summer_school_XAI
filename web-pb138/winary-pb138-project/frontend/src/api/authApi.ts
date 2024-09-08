import { User, loginUser, registerUser } from '../models/user';
import { BaseApi } from './baseApi';

const AUTH_PREFIX = '/auth';

async function getLogoutCode() {
  return BaseApi.getSingle<string>(`${AUTH_PREFIX}/logout`);
}

async function getWhoAmI() {
  return BaseApi.getSingle<User>(`${AUTH_PREFIX}/whoami`);
}

async function createSingle(path: string, values: registerUser | loginUser) {
  return BaseApi.postSingle(`${AUTH_PREFIX}/${path}`, values);
}

export const authApi = {
  getLogoutCode,
  getWhoAmI,
  createSingle,
};
