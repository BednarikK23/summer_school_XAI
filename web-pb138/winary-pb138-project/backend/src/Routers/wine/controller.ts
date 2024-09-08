import { Request, Response } from 'express';
import { parseRequest, handleRepositoryErrors } from '../../utils';
import {
  getEntityByIdSchema,
  getEntityPaginatedSchema,
  deleteEntitySchema,
} from '../../schemas';
import wineRepository from '../../Repositories/wineRepository';
import { createWineSchema, updateWineSchema } from './validationSchema';
import { Prisma } from '@prisma/client';

const deleteSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteEntitySchema, req, res);
  if (request === null) return;

  const wine = await wineRepository.deleteWine({ wineId: request.params.id });
  if (wine.isErr) {
    handleRepositoryErrors(wine.error, res);
    return;
  }

  res.status(200).send({ item: wine.value, message: 'Deleted successfully' });
};

const postSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(createWineSchema, req, res);
  if (request === null) return;

  const wine = request.body;
  const updatedWine: Prisma.WineUncheckedCreateInput = {
    wineryId: request.body.wineryId,
    name: wine.name,
    ...(wine.price !== undefined && { price: wine.price }),
    ...(wine.type !== undefined && { type: wine.type }),
    ...(wine.attribution !== undefined && { attribution: wine.attribution }),
    ...(wine.description !== undefined && { description: wine.description }),
    ...(wine.alcoholPercentage !== undefined && {
      alcoholPercentage: wine.alcoholPercentage,
    }),
    ...(wine.sugarGramsPerLiter !== undefined && {
      sugarGramsPerLiter: wine.sugarGramsPerLiter,
    }),
    ...(wine.glycerolGramsPerLiter !== undefined && {
      glycerolGramsPerLiter: wine.glycerolGramsPerLiter,
    }),
    ...(wine.totalAcidityGramsPerLiter !== undefined && {
      totalAcidityGramsPerLiter: wine.totalAcidityGramsPerLiter,
    }),
    ...(wine.pH !== undefined && { pH: wine.pH }),
    ...((wine.year !== undefined && { year: wine.year }) || { year: 'dummy' }),
  };

  const wine2 = await wineRepository.createWine({ wine: updatedWine });
  if (wine2.isErr) {
    handleRepositoryErrors(wine2.error, res);
    return;
  }

  res.status(201).send(wine2.value);
};

const putSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(updateWineSchema, req, res);
  if (request === null) return;

  const wine = request.body;
  const updatedWine: Prisma.WineUncheckedUpdateInput = {
    name: wine.name,
    ...(wine.price !== undefined && { price: wine.price }),
    ...(wine.type !== undefined && { type: wine.type }),
    ...(wine.attribution !== undefined && { attribution: wine.attribution }),
    ...(wine.description !== undefined && { description: wine.description }),
    ...(wine.alcoholPercentage !== undefined && {
      alcoholPercentage: wine.alcoholPercentage,
    }),
    ...(wine.sugarGramsPerLiter !== undefined && {
      sugarGramsPerLiter: wine.sugarGramsPerLiter,
    }),
    ...(wine.glycerolGramsPerLiter !== undefined && {
      glycerolGramsPerLiter: wine.glycerolGramsPerLiter,
    }),
    ...(wine.totalAcidityGramsPerLiter !== undefined && {
      totalAcidityGramsPerLiter: wine.totalAcidityGramsPerLiter,
    }),
    ...(wine.pH !== undefined && { pH: wine.pH }),
    ...(wine.year !== undefined && { year: wine.year }),
  };

  const updatedWineResult = await wineRepository.modifyWine({
    wineId: request.params.id,
    wine: updatedWine,
  });
  if (updatedWineResult.isErr) {
    handleRepositoryErrors(updatedWineResult.error, res);
    return;
  }

  res.status(201).send(updatedWineResult.value);
};

const getSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityByIdSchema, req, res);
  if (request === null) return;

  const wine = await wineRepository.getWineById({ wineId: request.params.id });
  if (wine.isErr) {
    handleRepositoryErrors(wine.error, res);
    return;
  }
  res.send({ item: wine.value });
};

const getAll = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityPaginatedSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
  };

  const filters = {
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
  };

  const order = {
    price: request.query.sortPrice,
    year: request.query.sortYear,
  }

  const wines = await wineRepository.getAllWinesPaginated({
    page: pagination.page,
    query: request.query.query!,
    filters: filters,
    order: order,
  });
  if (wines.isErr) {
    handleRepositoryErrors(wines.error, res);
    return;
  }

  res.status(200).send({
    items: wines.value.data,
    pagination: { currentPage: pagination.page, totalPages: wines.value.pages },
  });
};

export const wineController = {
  getSingle,
  getAll,
  postSingle,
  deleteSingle,
  putSingle,
};

export default wineController;
