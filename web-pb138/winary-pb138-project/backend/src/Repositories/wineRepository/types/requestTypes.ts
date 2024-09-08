import { Prisma } from '@prisma/client';

export interface GetWineByIdRequest {
  wineId: string;
}

export interface CreateWineRequest {
  wine: Prisma.WineUncheckedCreateInput;
}

export interface ModifyWineRequest {
  wineId: string;
  wine: Prisma.WineUncheckedUpdateInput;
}

export interface DeleteWineRequest {
  wineId: string;
}
