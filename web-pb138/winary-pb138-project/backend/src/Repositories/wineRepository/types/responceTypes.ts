import { Wine } from '@prisma/client';
import { Result } from '../../../../node_modules/@badrap/result/src/index';
import { PaginatedResult } from '../../types';

export type GetAllWinesResult = Result<PaginatedResult<Wine>>;

export type CreateWineResult = Result<Wine>;

export type ModifyWineResult = Result<Wine>;

export type DeleteWineResult = Result<void>;

export type GetWineByIdResult = Result<Wine>;
