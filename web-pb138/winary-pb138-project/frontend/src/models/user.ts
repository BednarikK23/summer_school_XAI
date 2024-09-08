import { BaseModelId, BaseModelTimestamps } from './base';
import { Winery } from './winery';

export type User = BaseModelId &
  BaseModelTimestamps & {
    name: string;
    password: string;
    email: string;
    isAdmin: boolean;
    vinery: Winery[];
  };

export type registerUser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginUser = {
  email: string;
  password: string;
};

export type UserCreate = {
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
};

export type UserEdit = {
  name: string;
  password: string;
  email: string;
  isAdmin: boolean;
};
