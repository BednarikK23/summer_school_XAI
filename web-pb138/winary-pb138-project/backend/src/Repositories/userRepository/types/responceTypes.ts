import { User } from '@prisma/client';
import { Result } from '../../../../node_modules/@badrap/result/src/index';
import { PaginatedResult } from '../../types';

export type GetAllUsersResult = Result<PaginatedResult<User>>;

export type CreateUserResult = Result<User>;

export type ModifyUserResult = Result<User>;

export type DeleteUserResult = Result<void>;

export type GetUserByIdResult = Result<User | null>;
