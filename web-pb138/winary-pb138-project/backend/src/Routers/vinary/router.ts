import { Router } from 'express';
import { wineryController } from './controller';
import { isAuthenticated } from '../auth/authrepo';

import passport from 'passport';
import tourController from '../tour/controller';

const vineryRouter = Router();

vineryRouter.get('/:id/tours', tourController.getAllToursPaginatedController);
vineryRouter.get('/:id/wines', wineryController.getAllWineryWines);
vineryRouter.get('/:id', wineryController.getSingle);
vineryRouter.get('/', wineryController.getAll);

vineryRouter.post(
  '/',
  passport.session(),
  isAuthenticated,
  wineryController.postSingle,
);
vineryRouter.delete(
  '/:id',
  passport.session(),
  isAuthenticated,
  wineryController.deleteSingle,
);
vineryRouter.put(
  '/:id',
  passport.session(),
  isAuthenticated,
  wineryController.putSingle,
);

export default vineryRouter;
