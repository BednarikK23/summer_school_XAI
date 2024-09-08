import { Vinary } from '@prisma/client';
import { Result } from '../../../../node_modules/@badrap/result/src/index';
import { PaginatedResult } from '../../types';

export type GetAllVinersResult = Result<PaginatedResult<Vinary>>;

export type CreateVinerResult = Result<Vinary>;

export type ModifyVinerResult = Result<Vinary>;

export type DeleteVinerResult = Result<void>;

export type GetVinerByIdResult = Result<Vinary>;
