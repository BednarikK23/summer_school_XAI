import { Request, Response } from 'express';
import { handleRepositoryErrors, parseRequest } from '../../utils';
import { getEntityPaginatedSchema, getEntityByIdSchema } from '../../schemas';
import orderRepository from '../../Repositories/orderRepository';
import {
  updateOrderStatusRequestSchema,
  createOrderRequestSchema,
  getAllOrdersRequestSchemaForWinary,
} from './schemas';
import { assert } from 'console';

export const getAllOrdersforVinery = async (req: Request, res: Response) => {
  const request = await parseRequest(
    getAllOrdersRequestSchemaForWinary,
    req,
    res,
  );
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
    status: request.query.status ?? '',
  };

  const orders = await orderRepository.getAllOrdersPaginated({
    page: parseInt(request.query.page, 10),
    status: request.query.status ?? '',
    winery: request.query.winery ?? '',
  });
  if (orders.isErr) {
    handleRepositoryErrors(orders.error, res);
    return;
  }
  res.status(200).send({
    items: orders.value.data,
    pagination: {
      currentPage: pagination.page,
      totalPages: orders.value.pages,
    },
  });
};

export const getAllOrders = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityPaginatedSchema, req, res);
  if (request === null) return;

  const pagination = {
    page: parseInt(request.query.page, 10),
  };

  const orders = await orderRepository.getAllOrdersPaginated({
    page: parseInt(request.query.page, 10),
    query: request.query.query!,
  });
  if (orders.isErr) {
    handleRepositoryErrors(orders.error, res);
    return;
  }
  res.status(200).send({
    items: orders.value.data,
    pagination: {
      currentPage: pagination.page,
      totalPages: orders.value.pages,
    },
  });
};

export const getOrderById = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityByIdSchema, req, res);
  if (request === null) return;

  const order = await orderRepository.getOrderById({
    orderId: request.params.id,
  });
  if (order.isErr) {
    handleRepositoryErrors(order.error, res);
    return;
  }

  res.status(200).send(order.value);
};

export const createOrder = async (req: Request, res: Response) => {
  const request = await parseRequest(createOrderRequestSchema, req, res);
  if (request === null) return;

  if (req.body.pickupDateFrom === undefined) {
    req.body.pickupDateFrom = null;
  }
  if (req.body.pickupDateTo === undefined) {
    req.body.pickupDateTo = null;
  }
  assert(req.body.pickupDateFrom !== undefined);
  assert(req.body.pickupDateTo !== undefined);
  const orderCreationResult = await orderRepository.createOrder(request.body);
  if (orderCreationResult.isErr) {
    handleRepositoryErrors(orderCreationResult.error, res);
    return;
  }

  res.status(201).send(orderCreationResult.value);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const request = await parseRequest(getEntityByIdSchema, req, res);
  if (request === null) return;

  const orderDeletionResult = await orderRepository.deleteOrder({
    orderId: request.params.id,
  });
  if (orderDeletionResult.isErr) {
    handleRepositoryErrors(orderDeletionResult.error, res);
    return;
  }

  res.status(200).send({ message: 'Order deleted successfully' });
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const request = await parseRequest(updateOrderStatusRequestSchema, req, res);
  if (request === null) return;

  const orderUpdateResult = await orderRepository.updateOrderStatus({
    orderId: request.params.id,
    status: request.body.status,
    pickupDateFrom: request.body.pickupDateFrom,
    pickupDateTo: request.body.pickupDateTo,
  });
  if (orderUpdateResult.isErr) {
    handleRepositoryErrors(orderUpdateResult.error, res);
    return;
  }

  res.status(200).send(orderUpdateResult.value);
};

export const OrderController = {
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
  createOrder,
  getAllOrdersforVinery,
};

export default OrderController;
