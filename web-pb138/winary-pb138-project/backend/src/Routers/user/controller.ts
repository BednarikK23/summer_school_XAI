import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import userRepository from '../../Repositories/userRepository/index';

import {
  createUserRequestSchema,
  deleteUserRequestSchema,
  getUsersRequestSchema,
  getSingleRequestSchema,
  updateUserRequestSchema,
} from './validationSchemas';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const request = await parseRequest(getUsersRequestSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
    type: request.query.type ?? '',
  };

  const users = await userRepository.getAllUsersPaginated({
    page: pagination.page,
    type: pagination.type,
    query: request.query.query,
  });
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

const getSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(getSingleRequestSchema, req, res);
  if (request === null) return;

  const user = await userRepository.getUserById({ userId: request.params.id });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }
  res.send({ item: user.value });
};

const deleteSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(deleteUserRequestSchema, req, res);
  if (request === null) return;

  const user = await userRepository.getUserById({ userId: request.params.id });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }

  const result = await userRepository.deleteUser({ userId: request.params.id });
  if (result.isErr) {
    handleRepositoryErrors(result.error, res);
    return;
  }

  res.status(200).send({ item: user.value, message: 'Deleted successfully' });
};

const postSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(createUserRequestSchema, req, res);
  if (request === null) return;

  const user = await userRepository.createUser({ user: request.body });
  if (user.isErr) {
    handleRepositoryErrors(user.error, res);
    return;
  }

  res.status(201).send(user.value);
};

const putSingle = async (req: Request, res: Response) => {
  const request = await parseRequest(updateUserRequestSchema, req, res);
  if (request === null) return;

  const user = request.body;
  const final = {
    name: user.name,
    email: user.email,
    password: user.password,
  };

  const newUser = await userRepository.modifyUser({
    userId: request.params.id,
    user: final,
  });
  if (newUser.isErr) {
    handleRepositoryErrors(newUser.error, res);
  }

  res.status(201).send(newUser);
};

export const userController = {
  deleteSingle,
  getSingle,
  postSingle,
  putSingle,
  getAll,
};

export default userController;
