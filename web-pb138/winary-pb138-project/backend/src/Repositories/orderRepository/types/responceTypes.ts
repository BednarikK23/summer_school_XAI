import { Order, OrderItem } from '@prisma/client';
import { Result } from '../../../../node_modules/@badrap/result/src/index';
import { PaginatedResult } from '../../types';

export type CreateOrderResult = Result<Order>;
export type GetOrderResult = Result<Order>;
export type UpdateOrderStatusResult = Result<void>;
export type DeleteOrderResult = Result<void>;
export type GetAllOrdersResponce = Result<PaginatedResult<Order>>;
export type GetAllOrderItemsResult = Result<OrderItem[]>;
