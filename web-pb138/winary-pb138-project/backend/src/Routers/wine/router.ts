import { Router } from 'express';
import { wineController } from './controller';
import passport from 'passport';
import { isAuthenticated } from '../auth/authrepo';

const wineRouter = Router();

wineRouter.get('/:id', wineController.getSingle);
wineRouter.get('/', wineController.getAll);

wineRouter.post(
  '/',
  passport.session(),
  isAuthenticated,
  wineController.postSingle,
);
wineRouter.delete(
  '/:id',
  passport.session(),
  isAuthenticated,
  wineController.deleteSingle,
);
wineRouter.put(
  '/:id',
  passport.session(),
  isAuthenticated,
  wineController.putSingle,
);

export default wineRouter;
