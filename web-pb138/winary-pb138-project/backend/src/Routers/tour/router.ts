import { Router } from 'express';
import { tourController } from './controller';
import passport from 'passport';
import { isAuthenticated, isAuthorizedAdmin } from '../auth/authrepo';

const tourRouter = Router();

tourRouter.get('/', tourController.getAllToursPaginatedController);
tourRouter.get('/:id', tourController.getSingle);

tourRouter.put(
  '/:id/addwiner',
  passport.session(),
  isAuthenticated,
  tourController.addWinerToTourController,
);
tourRouter.delete(
  '/:id/removewiner',
  passport.session(),
  isAuthenticated,
  tourController.removeWinerFromTourController,
);

tourRouter.put(
  '/:id',
  passport.session(),
  isAuthorizedAdmin,
  tourController.putSingle,
);
tourRouter.post(
  '/',
  passport.session(),
  isAuthorizedAdmin,
  tourController.postSingle,
);
tourRouter.delete(
  '/:id',
  passport.session(),
  isAuthorizedAdmin,
  tourController.deleteSingle,
);

export default tourRouter;
