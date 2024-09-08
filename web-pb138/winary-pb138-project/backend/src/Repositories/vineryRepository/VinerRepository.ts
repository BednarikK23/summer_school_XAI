import client from '../../client';
import { Result } from '../../../node_modules/@badrap/result/src/index';
import {
  CreateVinerRequest,
  DeleteVinerRequest,
  GetVinerByIdRequest,
  ModifyVinerRequest,
  VinaryPaginatedRequest,
} from './types/requestTypes';
import {
  CreateVinerResult,
  DeleteVinerResult,
  GetAllVinersResult,
  GetVinerByIdResult,
  ModifyVinerResult,
} from './types/resultTypes';

interface QueryFilter {
  where?: {
    name?: {
      contains?: string;
      mode?: 'insensitive';
    };
    openingTime?: {
      equals?: string;
      gte?: string;
      lte?: string;
    };
    closingTime?: {
      equals?: string;
      gte?: string;
      lte?: string;
    };
    location?: {
      equals?: string;
    };
    wines?: {
      some?: {
        type?: {
          equals?: string;
        };
      };
    };
  };
  orderBy?: Array<{
    openingTime?: 'asc' | 'desc';
    closingTime?: 'asc' | 'desc';
  }>;
}

function convertTimeToComparableFormat(
  time: string | undefined,
): string | undefined {
  if (time === undefined) {
    return undefined;
  }

  if (time.length === 4) {
    return `0${time}`;
  }
  return time;
}

export async function getAllVinersPaginated(
  request: VinaryPaginatedRequest,
): Promise<GetAllVinersResult> {
  const pageSize = 12;

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

      let open = convertTimeToComparableFormat(request.openingTime);
      let close = convertTimeToComparableFormat(request.closingTime);
      if (open !== undefined && close !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }

        if (open < close) {
          if (close === '00:00') {
            close = '24:00';
          }
          queryFilter.where.openingTime = {
            lte: open,
          };
          queryFilter.where.closingTime = {
            gte: close,
          };
        } else {
          if (open === '00:00') {
            open = '24:00';
          }
          queryFilter.where.openingTime = {
            gte: open,
          };
          queryFilter.where.closingTime = {
            lte: close,
          };
        }
      }

      if (open !== undefined && close === undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.openingTime = {
          lte: open,
        };
      }

      if (open === undefined && close !== undefined) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.closingTime = {
          gte: close,
        };
      }

      if (request.location) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.location = {
          equals: request.location,
        };
      }

      if (request.wineType) {
        if (!queryFilter.where) {
          queryFilter.where = {};
        }
        queryFilter.where.wines = {
          some: {
            type: {
              equals: request.wineType,
            },
          },
        };
      }

      queryFilter.orderBy = [];
      if (request.orderOpen !== undefined) {
        queryFilter.orderBy.push({ openingTime: request.orderOpen });
      }
      if (request.orderClose !== undefined) {
        queryFilter.orderBy.push({ closingTime: request.orderClose });
      }

      const totalCount = await tx.vinary.count(queryFilter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const viners = await tx.vinary.findMany({
        ...queryFilter,
        take: pageSize,
        skip: (request.page - 1) * pageSize,
      });
      return { data: viners, pages: totalPages };
    });

    return Result.ok(result);
  } catch (error) {
    return Result.err(new Error('Failed to fetch viner'));
  }
}

export async function createViner(
  request: CreateVinerRequest,
): Promise<CreateVinerResult> {
  const { viner } = request;

  try {
    const newViner = await client.$transaction(async (prisma) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: viner.ownerId,
        },
      });

      if (existingUser === null) {
        throw new Error('User does not exist');
      }

      if (viner.openingTime !== undefined) {
        viner.openingTime =
          viner.openingTime!.length === 4
            ? `0${viner.openingTime}`
            : viner.openingTime;
      }
      if (viner.closingTime !== undefined) {
        viner.closingTime =
          viner.closingTime.length === 4
            ? `0${viner.closingTime}`
            : viner.closingTime;
      }

      const newViner = await prisma.vinary.create({
        data: {
          ...viner,
        },
      });

      return newViner;
    });

    return Result.ok(newViner);
  } catch (error) {
    return Result.err(new Error('Failed to create viner'));
  } finally {
    await client.$disconnect();
  }
}
export async function modifyViner(
  request: ModifyVinerRequest,
): Promise<ModifyVinerResult> {
  try {
    const updatedViner = await client.vinary.update({
      where: { id: request.vinerId },
      data: request.viner,
    });
    return Result.ok(updatedViner);
  } catch (error) {
    return Result.err(new Error('Failed to modify viner'));
  }
}

export async function deleteViner(
  request: DeleteVinerRequest,
): Promise<DeleteVinerResult> {
  try {
    await client.$transaction(async (prisma) => {
      await prisma.orderItem.deleteMany({
        where: {
          order: {
            vinaryId: request.vinerId,
          },
        },
      });

      await prisma.order.deleteMany({
        where: { vinaryId: request.vinerId },
      });

      await prisma.wine.deleteMany({
        where: { wineryId: request.vinerId },
      });

      await prisma.vinary.delete({
        where: { id: request.vinerId },
      });
    });

    return Result.ok(undefined);
  } catch (error) {
    console.log(error);
    return Result.err(new Error('Failed to delete vinary'));
  }
}

export async function getVinerById(
  request: GetVinerByIdRequest,
): Promise<GetVinerByIdResult> {
  try {
    const viner = await client.vinary.findUniqueOrThrow({
      where: { id: request.vinerId },
    });
    return Result.ok(viner);
  } catch (error) {
    throw new Error('Failed to fetch viner: ');
  }
}
