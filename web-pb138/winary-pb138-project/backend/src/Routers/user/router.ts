import { Router } from 'express';
import { userController } from './controller';
import passport from 'passport';
import { isAuthenticated, isAuthorizedAdmin } from '../auth/authrepo';

const userRouter = Router();
userRouter.post('/', userController.postSingle);

userRouter.get(
  '/:id',
  passport.session(),
  isAuthenticated,
  userController.getSingle,
);
userRouter.delete(
  '/:id',
  passport.session(),
  isAuthenticated,
  userController.deleteSingle,
);
userRouter.put(
  '/:id',
  passport.session(),
  isAuthenticated,
  userController.putSingle,
);

userRouter.get(
  '/',
  passport.session(),
  isAuthorizedAdmin,
  userController.getAll,
);

export default userRouter;
