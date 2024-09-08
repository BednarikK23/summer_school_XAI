import client from '../../client';
import {
  AddWinerToTourRequest,
  CreateTourRequest,
  DeleteTourRequest,
  DeleteWinerFromTourRequest,
  GetTourByIdRequest,
  ModifyTourRequest,
  TourPaginatedRequest,
} from './types/requestTypes';
import {
  AddWinerToTourResult,
  CreateTourResult,
  DeleteTourResult,
  GetAllToursResult,
  GetTourByIdResult,
  ModifyTourResult,
  RemoveWineryFromTourResult,
} from './types/responseTypes';
import { Result } from '../../../node_modules/@badrap/result/src/index';
import { Prisma } from '@prisma/client';

interface QueryFilter {
  where?: {
    name?: {
      contains?: string;
      mode?: 'insensitive';
    };
    location?: {
      equals?: string;
    };
    time?: {
      equals?: string;
      gte?: string;
      lte?: string;
    };
    status?: {
      equals?: string;
    };
    participants?: {
      some?: {
        id: {
          equals: string;
        };
      };
    };
  };
  orderBy?: Array<{
    time?: 'asc' | 'desc';
  }>;
}

export async function getAllToursPaginated(
  request: TourPaginatedRequest,
): Promise<GetAllToursResult> {
  const pageSize = 10;

  try {
    const result = await client.$transaction(async (tx) => {
      let queryFilter: QueryFilter = {};
      if (request.query) {
        queryFilter = {
          where: {
            name: {
              contains: request.query,
              mode: 'insensitive',
            },
          },
        };
      }
      if (request.status) {
        if (queryFilter.where === undefined) {
          queryFilter.where = {};
        }
        queryFilter.where.status = {
          equals: request.status,
        };
      }

      if (request.location) {
        if (queryFilter.where === undefined) {
          queryFilter.where = {};
        }
        queryFilter.where.location = {
          equals: request.location,
        };
      }

      if (request.happensAfter && request.happensBefore) {
        if (queryFilter.where === undefined) {
          queryFilter.where = {};
        }
        if (request.happensAfter === request.happensBefore) {
          queryFilter.where.time = {
            equals: request.happensAfter,
          };
        } else {
          queryFilter.where.time = {
            gte: request.happensAfter,
            lte: request.happensBefore,
          };
        }
      } else {
        if (request.happensAfter) {
          if (queryFilter.where === undefined) {
            queryFilter.where = {};
          }
          queryFilter.where.time = {
            gte: request.happensAfter,
          };
        }
        if (request.happensBefore) {
          if (queryFilter.where === undefined) {
            queryFilter.where = {};
          }
          queryFilter.where.time = {
            lte: request.happensBefore,
          };
        }
      }

      if (request.winery) {
        if (queryFilter.where === undefined) {
          queryFilter.where = {};
        }
        queryFilter.where.participants = {
          some: {
            id: {
              equals: request.winery,
            },
          },
        };
      }

      queryFilter.orderBy = [];
      if (request.orderDate !== undefined) {
        queryFilter.orderBy.push({ time: request.orderDate });
      }

      const totalCount = await tx.tour.count(queryFilter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const tours = await tx.tour.findMany({
        ...queryFilter,
        take: pageSize,
        skip: (request.page - 1) * pageSize,
        include: {
          participants: true,
        },
      });
      return { items: tours, pages: totalPages };
    });

    return Result.ok(result);
  } catch (error) {
    return Result.err(new Error('Failed to fetch tours'));
  }
}

export async function createTour(
  request: CreateTourRequest,
): Promise<CreateTourResult> {
  try {
    const newTour = await client.tour.create({
      data: request.tour,
    });
    return Result.ok(newTour);
  } catch (error) {
    return Result.err(new Error('Failed to create tour'));
  }
}

export async function modifyTour(
  request: ModifyTourRequest,
): Promise<ModifyTourResult> {
  try {
    const final: Prisma.TourUpdateInput = {
      ...(request.tour.address !== undefined && {
        address: request.tour.address,
      }),
      ...(request.tour.location !== undefined && {
        location: request.tour.location,
      }),
      ...(request.tour.name !== undefined && { name: request.tour.name }),
      ...(request.tour.status !== undefined && {
        status: request.tour.status,
      }),
      ...(request.tour.time !== undefined && { time: request.tour.time }),
      ...(request.tour.desription !== undefined && {
        description: request.tour.desription,
      }),
    };
    const updatedTour = await client.tour.update({
      where: { id: request.tourId },
      data: final,
    });
    return Result.ok(updatedTour);
  } catch (error) {
    return Result.err(new Error('Failed to modify tour'));
  }
}

export async function deleteTour(
  request: DeleteTourRequest,
): Promise<DeleteTourResult> {
  const { tourId } = request;

  try {
    await client.$transaction(async (prisma) => {
      await prisma.tour.delete({
        where: { id: tourId },
      });
    });

    return Result.ok(undefined);
  } catch (error) {
    return Result.err(new Error('Failed to delete tour'));
  } finally {
    await client.$disconnect();
  }
}

export async function getTourById(
  request: GetTourByIdRequest,
): Promise<GetTourByIdResult> {
  try {
    const tour = await client.tour.findUniqueOrThrow({
      where: { id: request.tourId },
      include: {
        participants: true,
      },
    });
    return Result.ok(tour);
  } catch (error) {
    throw new Error('Failed to fetch tour: ');
  }
}

export const addWinerToTour = async (
  request: AddWinerToTourRequest,
): Promise<AddWinerToTourResult> => {
  try {
    const updatedTour = await client.tour.update({
      where: { id: request.tourId },
      data: {
        participants: {
          connect: { id: request.winerId },
        },
      },
    });
    return Result.ok(updatedTour);
  } catch (error) {
    throw new Error('Failed to add winer to tour');
  }
};

export const deleteWinerFromTour = async (
  request: DeleteWinerFromTourRequest,
): Promise<RemoveWineryFromTourResult> => {
  try {
    const updatedTour = await client.tour.update({
      where: { id: request.tourId },
      data: {
        participants: {
          disconnect: { id: request.winerId },
        },
      },
    });
    return Result.ok(updatedTour);
  } catch (error) {
    throw new Error('Failed to delete winer from tour');
  }
};
