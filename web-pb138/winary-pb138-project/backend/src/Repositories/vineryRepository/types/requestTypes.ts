import { Prisma } from '@prisma/client';

export interface GetVinerByIdRequest {
  vinerId: string;
}

export interface CreateVinerRequest {
  viner: Prisma.VinaryUncheckedCreateInput;
}

export interface ModifyVinerRequest {
  vinerId: string;
  viner: Prisma.VinaryUpdateInput;
}

export interface DeleteVinerRequest {
  vinerId: string;
}

export interface VinaryPaginatedRequest {
  page: number;
  query?: string;
  location?: string;
  openingTime?: string;
  closingTime?: string;
  wineType?: string;
  orderOpen?: 'asc' | 'desc';
  orderClose?: 'asc' | 'desc';
}
