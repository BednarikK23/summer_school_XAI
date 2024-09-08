import { Request, Response } from 'express';

import {
  getEntityByIdSchema,
  getWineryWinesPaginatedSchema,
} from '../../schemas';

import { handleRepositoryErrors, parseRequest } from '../../utils';
import vineryRepository from '../../Repositories/vineryRepository';
import {
  createVinaryRequestSchema,
  getVinaryPaginatedSchema,
  updateVinaryRequestSchema,
} from './validationSchema';
import userRepository from '../../Repositories/wineRepository';
import { deleteEntitySchema } from '../../schemas';
import { Prisma } from '@prisma/client';
import { PaginatedRequest } from '../../Repositories/types';

const deleteSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteEntitySchema, req, res);
  if (request === null) return;

  const user = await vineryRepository.deleteViner({
    vinerId: request.params.id,
  });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }

  const result = await vineryRepository.deleteViner({
    vinerId: request.params.id,
  });
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  res.status(200).send({ item: user.value, message: 'Deleted successfully' });
};

const postSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(createVinaryRequestSchema, req, res);
  if (request === null) return;

  const user = await vineryRepository.createViner({ viner: request.body });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }

  res.status(201).send(user.value);
};

const putSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(updateVinaryRequestSchema, req, res);
  if (request === null) return;

  const user = request.body;
  const final: Prisma.VinaryUpdateInput = {
    ...(user.name !== undefined && { name: user.name }),
    ...(user.openingTime !== undefined && { openingTime: user.openingTime }),
    ...(user.closingTime !== undefined && { closingTime: user.closingTime }),
    ...(user.location !== undefined && { location: user.location }),
    ...(user.description !== undefined && { description: user.description }),
    ...(user.address !== undefined && { address: user.address }),
    ...(user.ico !== undefined && { ico: user.ico }),
    ...(user.phone !== undefined && { phone: user.phone }),
    ...(user.email !== undefined && { email: user.email }),
  };

  const newUser = await vineryRepository.modifyViner({
    vinerId: request.params.id,
    viner: final,
  });
  if (newUser.isErr) {
    handleRepositoryErrors(newUser.error, res);
    return;
  }

  res.status(201).send(newUser);
};

const getSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityByIdSchema, req, res);
  if (request === null) return;

  const user = await vineryRepository.getVinerById({
    vinerId: request.params.id,
  });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }
  res.send({ item: user.value });
};

const getAll = async (req: Request, res: Response): Promise<void> => {
  const request = await parseRequest(getVinaryPaginatedSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
    query: request.query.query,
    location: request.query.location!,
    openingTime: request.query.openingTime!,
    closingTime: request.query.closingTime!,
    wineType: request.query.wineType!,
    orderOpen: request.query.orderOpen!,
    orderClose: request.query.orderClose!,
  };

  const users = await vineryRepository.getAllVinersPaginated(pagination);
  if (users.isErr) {
    handleRepositoryErrors(users.error, res);
    return;
  }

  res.status(200).send({
    items: users.value.data,
    pagination: {
      currentPage: pagination.page,
      totalPages: users.value.pages,
    },
  });
};

const getAllWineryWines = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const request = await parseRequest(getWineryWinesPaginatedSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
    query: request.query,
    wines: request.params.id,
  };

  const x: PaginatedRequest = {
    page: pagination.page,
    query: pagination.query.query!,
    winery: request.params.id,
    filters: {
      wineType: request.query.wineType,
      alcoholMax: request.query.alcoholMax
        ? parseFloat(request.query.alcoholMax!)
        : undefined,
      sugarMax: request.query.sugarMax
        ? parseFloat(request.query.sugarMax!)
        : undefined,
      priceMax: request.query.priceMax
        ? parseFloat(request.query.priceMax!)
        : undefined,
      priceMin: request.query.priceMin
        ? parseFloat(request.query.priceMin!)
        : undefined,
      year: request.query.year,
    },
    order: {
      price: request.query.sortPrice,
      year: request.query.sortYear,
    },
  };

  const users = await userRepository.getAllWinesPaginated(x);

  if (users.isErr) {
    handleRepositoryErrors(users.error, res);
    return;
  }

  res.status(200).send({
    items: users.value.data,
    pagination: {
      currentPage: pagination.page,
      totalPages: users.value.pages,
    },
  });
};

export const wineryController = {
  getSingle,
  getAll,
  getAllWineryWines,
  deleteSingle,
  postSingle,
  putSingle,
};

export default wineryController;
