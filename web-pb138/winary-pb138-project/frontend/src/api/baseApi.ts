import axios, { AxiosRequestConfig } from 'axios';
import {
  ResponseMulti,
  ResponseMultiPaginated,
  ResponseSingle,
} from '../models/response';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function getSingle<T>(path: string) {
  const response = await axiosInstance.get<ResponseSingle<T>>(path);
  return response.data;
}

async function getAll<T>(path: string) {
  const response = await axiosInstance.get<ResponseMulti<T>>(path);
  return response.data;
}

async function getAllPaginated<T>(path: string, config: AxiosRequestConfig) {
  const response = await axiosInstance.get<ResponseMultiPaginated<T>>(
    path,
    config,
  );
  return response.data;
}

async function postSingle<T>(path: string, values: unknown) {
  const response = await axiosInstance.post<ResponseSingle<T>>(path, values);
  return response.data;
}

async function putSingle<T>(path: string, values: unknown) {
  const response = await axiosInstance.put<ResponseSingle<T>>(path, values);
  return response.data;
}

async function deleteSingle<T>(path: string, body?: unknown) {
  const response = await axiosInstance.delete<ResponseSingle<T>>(path, {
    data: body,
  });
  return response.data;
}

export const BaseApi = {
  getSingle,
  getAll,
  getAllPaginated,
  postSingle,
  putSingle,
  deleteSingle,
};
