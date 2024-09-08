import { Prisma } from '@prisma/client';

export interface GetUserByIdRequest {
  userId: string;
}

export interface CreateUserRequest {
  user: Prisma.UserCreateInput;
}

export interface ModifyUserRequest {
  userId: string;

  user: Prisma.UserCreateInput;
}

export interface DeleteUserRequest {
  userId: string;
}
