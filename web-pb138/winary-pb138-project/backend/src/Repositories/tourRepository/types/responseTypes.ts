import { Tour } from '@prisma/client';
import { Result } from '../../../../node_modules/@badrap/result/src/index';
export type CreateTourResult = Result<Tour>;
export type DeleteTourResult = Result<void>;
export type RemoveWineryFromTourResult = Result<Tour>;
export type GetAllToursResult = Result<{ items: Tour[]; pages: number }>;
export type GetTourByIdResult = Result<Tour>;
export type ModifyTourResult = Result<Tour>;
export type AddWinerToTourResult = Result<Tour>;
