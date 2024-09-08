import { Router } from 'express';
import passport from 'passport';
import { isAuthenticated, isAuthorizedAdmin } from '../auth/authrepo';
import OrderController, { createOrder } from './controller';

const orderRouter = Router();

orderRouter.post('/', createOrder);

orderRouter.get(
  '/:id',
  passport.session(),
  isAuthenticated,
  OrderController.getOrderById,
);
orderRouter.put(
  '/:id',
  passport.session(),
  isAuthenticated,
  OrderController.updateOrderStatus,
);
orderRouter.get(
  '/',
  passport.session(),
  isAuthenticated,
  OrderController.getAllOrdersforVinery,
);

orderRouter.delete(
  '/:id',
  passport.session(),
  isAuthorizedAdmin,
  OrderController.deleteOrder,
);
export default orderRouter;
