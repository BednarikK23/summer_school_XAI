import { Request, Response } from 'express';
import userRepository from '../../Repositories/userRepository';
import { registerSchema } from './schema';
import { fromZodError } from 'zod-validation-error';
import { handleErrors } from '../../utils';

const register = async (req: Request, res: Response) => {
  const validRequest = await registerSchema.safeParseAsync(req);

  if (!validRequest.success) {
    const error = fromZodError(validRequest.error);
    const errorResponse: Error = {
      name: 'ValidationError',
      message: error.message,
    };
    res.status(400).send(errorResponse);
    return;
  }

  const { username, email, password } = validRequest.data.body;

  const userExists = await userRepository.checkExists(email);
  if (userExists.isErr) {
    handleErrors(userExists.error, res);
    return;
  }

  if (userExists.value) {
    res.status(400).send({ message: 'User already exists' });
    return;
  }

  const user = await userRepository.createUser({
    user: { name: username, email: email, password: password },
  });

  if (user.isErr) {
    handleErrors(user.error, res);
    return;
  }

  res.status(201).end();
};

const login = async (_req: Request, res: Response) => {
  const user = _req.session.id;
  if (_req.session.passport?.user) {
    res.cookie('auth', user, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  } else {
    res.status(401).end();
  }
  res.status(200).end();
};

export const authController = {
  register,
  login,
};
