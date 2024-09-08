import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import tourRepository from '../../Repositories/tourRepository/index';

import {
  addWinerToTourSchema,
  createTourRequestSchema,
  deleteTourRequestSchema,
  getAllToursPaginatedSchema,
  getSingleTourRequestSchema,
  removeWinerFromTourSchema,
  updateTourRequestSchema,
} from './validationSchema';
import { TourPaginatedRequest } from '../../Repositories/tourRepository/types/requestTypes';
import { getAllToursPaginated } from '../../Repositories/tourRepository/repository';

const getSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(getSingleTourRequestSchema, req, res);
  if (request === null) return;

  const tour = await tourRepository.getTourById({ tourId: request.params.id });
  if (tour.isErr) {
    handleRepositoryErrors(tour.error, res);
    return;
  }
  res.send({ item: tour.value });
};

const deleteSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteTourRequestSchema, req, res);
  if (request === null) return;

  const tour = await tourRepository.getTourById({ tourId: request.params.id });
  if (tour.isErr) {
    handleRepositoryErrors(tour.error, res);
    return;
  }

  const result = await tourRepository.deleteTour({ tourId: request.params.id });
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  res.status(200).send({ item: tour.value, message: 'Deleted successfully' });
};

const postSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(createTourRequestSchema, req, res);
  if (request === null) return;

  const tour = await tourRepository.createTour({ tour: request.body });
  if (tour.isErr) {
    handleRepositoryErrors(tour.error, res);
    return;
  }

  res.status(201).send(tour.value);
};

export const getAllToursPaginatedController = async (
  req: Request,
  res: Response,
) => {
  const request = await parseRequest(getAllToursPaginatedSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
  };

  const tourRequest: TourPaginatedRequest = {
    query: request.query.query,
    page: parseInt(request.query.page),
    happensAfter: request.query.happensAfter,
    happensBefore: request.query.happensBefore,
    location: request.query.location,
    status: request.query.status,
    orderDate: request.query.orderDate,
    winery: request.params.id,
  };

  const toursResult = await getAllToursPaginated(tourRequest);
  if (toursResult.isErr) {
    handleRepositoryErrors(toursResult.error, res);
    return;
  }

  res.status(200).send({
    items: toursResult.value.items,
    pagination: {
      currentPage: pagination.page,
      totalPages: toursResult.value.pages,
    },
  });
};

const putSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(updateTourRequestSchema, req, res);
  if (request === null) return;

  const tour = request.body;
  const final = {
    location: tour.location,
    address: tour.address,
    time: tour.time,
    status: tour.status,
    name: tour.name,
    participants: tour.participants,
    desription: tour.description ?? '',
  };

  const updatedTour = await tourRepository.modifyTour({
    tourId: request.params.id,
    tour: final,
  });
  if (updatedTour.isErr) {
    handleRepositoryErrors(updatedTour.error, res);
    return;
  }
  res.status(201).send(updatedTour.value);
};
const addWinerToTourController = async (req: Request, res: Response) => {
  const requestData = await parseRequest(addWinerToTourSchema, req, res);
  if (!requestData) return;

  const { id: tourId } = requestData.params;
  const { winerId } = requestData.body;

  const updatedTour = await tourRepository.addWinerToTour({ tourId, winerId });

  if (updatedTour.isErr) {
    handleRepositoryErrors(updatedTour.error, res);
  } else {
    res.status(201).send(updatedTour);
  }
};

export const removeWinerFromTourController = async (
  req: Request,
  res: Response,
) => {
  const requestData = await parseRequest(removeWinerFromTourSchema, req, res);
  if (!requestData) return;

  const { id: tourId } = requestData.params;
  const { winerId } = requestData.body;

  const updatedTour = await tourRepository.deleteWinerFromTour({
    tourId,
    winerId,
  });

  if (updatedTour.isErr) {
    handleRepositoryErrors(updatedTour.error, res);
  } else {
    res.status(200).send(updatedTour);
  }
};

export const tourController = {
  deleteSingle,
  getSingle,
  postSingle,
  putSingle,
  getAllToursPaginatedController,
  addWinerToTourController,
  removeWinerFromTourController,
};

export default tourController;
