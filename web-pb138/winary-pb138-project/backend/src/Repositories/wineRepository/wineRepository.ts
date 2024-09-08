import client from '../../client';
import { Result } from '../../../node_modules/@badrap/result/src/index';
import {
  CreateWineRequest,
  DeleteWineRequest,
  GetWineByIdRequest,
  ModifyWineRequest,
} from './types/requestTypes';
import {
  CreateWineResult,
  DeleteWineResult,
  GetAllWinesResult,
  GetWineByIdResult,
  ModifyWineResult,
} from './types/responceTypes';
import { PaginatedRequest } from '../types';

interface QueryFilter {
  where?: {
    name?: {
      contains?: string;
      mode?: 'insensitive';
    };
    wineryId?: {
      equals?: string;
    };
    price?: {
      equals?: number;
      gte?: number;
      lte?: number;
    };
    type?: {
      equals?: string;
    };
    alcoholPercentage?: {
      lte?: number;
    };
    sugarGramsPerLiter?: {
      lte?: number;
    };
    year?: {
      equals?: string;
    };
  };
  orderBy?: Array<{
    price?: 'asc' | 'desc';
    year?: 'asc' | 'desc';
  }>;
}
export async function getAllWinesPaginated(
  request: PaginatedRequest,
): Promise<GetAllWinesResult> {
  const pageSize = 12;

  try {
    const result = await client.$transaction(async (tx) => {
      const queryFilter: QueryFilter = {};

      if (request.query !== undefined && request.winery !== undefined) {
        queryFilter.where = {};
        queryFilter.where.name = {
          contains: request.query,
          mode: 'insensitive',
        };
        queryFilter.where.wineryId = {
          equals: request.winery,
        };
      } else if (request.query !== undefined) {
        queryFilter.where = {};
        queryFilter.where.name = {
          contains: request.query,
          mode: 'insensitive',
        };
      } else if (request.winery !== undefined) {
        queryFilter.where = {};
        queryFilter.where.wineryId = {
          equals: request.winery,
        };
      }

      if (request.filters?.wineType !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.type = {
          equals: request.filters.wineType,
        };
      }

      if (request.filters?.alcoholMax !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.alcoholPercentage = {
          lte: request.filters.alcoholMax,
        };
      }
      if (request.filters?.sugarMax !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.sugarGramsPerLiter = {
          lte: request.filters.sugarMax,
        };
      }

      if (
        request.filters?.priceMax !== undefined &&
        request.filters.priceMin !== undefined
      ) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.price = {
          lte: request.filters.priceMax,
          gte: request.filters.priceMin,
        };
      }
      if (
        request.filters?.priceMax !== undefined &&
        request.filters.priceMin === undefined
      ) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.price = {
          lte: request.filters.priceMax,
        };
      }
      if (
        request.filters?.priceMin !== undefined &&
        request.filters.priceMax === undefined
      ) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.price = {
          gte: request.filters.priceMin,
        };
      }

      if (request.filters?.year !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.year = {
          equals: request.filters.year,
        };
      }

      queryFilter.orderBy = [];
      if (request.order?.price !== undefined) {
        queryFilter.orderBy.push({ price: request.order.price });
      }
      if (request.order?.year !== undefined) {
        queryFilter.orderBy.push({ year: request.order.year });
      }

      const totalCount = await tx.wine.count(queryFilter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const wines = await tx.wine.findMany({
        ...queryFilter,
        take: pageSize,
        skip: (request.page - 1) * pageSize,
      });
      return { data: wines, pages: totalPages };
    });

    return Result.ok(result);
  } catch (error) {
    return Result.err(new Error('Failed to fetch wines'));
  }
}

export async function createWine(
  request: CreateWineRequest,
): Promise<CreateWineResult> {
  try {
    const newWine = await client.wine.create({
      data: request.wine,
    });
    return Result.ok(newWine);
  } catch (error) {
    return Result.err(new Error('Failed to create wine'));
  }
}

export async function modifyWine(
  request: ModifyWineRequest,
): Promise<ModifyWineResult> {
  try {
    const updatedWine = await client.wine.update({
      where: { id: request.wineId },
      data: request.wine,
    });
    return Result.ok(updatedWine);
  } catch (error) {
    return Result.err(new Error('Failed to modify wine'));
  }
}

export async function deleteWine(
  request: DeleteWineRequest,
): Promise<DeleteWineResult> {
  try {
    const orderItems = await client.orderItem.findMany({
      where: { wineId: request.wineId },
    });

    for (const orderItem of orderItems) {
      await client.orderItem.delete({
        where: { id: orderItem.id },
      });
    }

    await client.wine.delete({
      where: { id: request.wineId },
    });

    return Result.ok(undefined);
  } catch (error) {
    return Result.err(new Error('Failed to delete wine'));
  }
}

export async function getWineById(
  request: GetWineByIdRequest,
): Promise<GetWineByIdResult> {
  try {
    const wine = await client.wine.findUniqueOrThrow({
      where: { id: request.wineId },
    });
    return Result.ok(wine);
  } catch (error) {
    throw new Error('Failed to fetch wine: ');
  }
}
