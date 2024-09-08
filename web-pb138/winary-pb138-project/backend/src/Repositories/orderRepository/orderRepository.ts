import client from '../../client';
import { Result } from '../../../node_modules/@badrap/result/src/index';
import {
  CreateOrderRequest,
  DeleteOrderRequst,
  GetOrderByIdRequest,
  UpdateOrderStatusRequest,
} from './types/requestTypes';
import {
  CreateOrderResult,
  DeleteOrderResult,
  GetAllOrdersResponce,
  GetOrderResult,
  UpdateOrderStatusResult,
} from './types/responceTypes';
import { PaginatedRequestOrder } from '../types';

/**
 * Vytvoří novou objednávku v databázi.
 * @param request Objekt obsahující informace potřebné k vytvoření objednávky.
 * @returns Promise s výsledkem operace.
 */
export async function createOrder(
  request: CreateOrderRequest,
): Promise<CreateOrderResult> {
  try {
    const order = await client.order.create({
      data: {
        vinaryId: request.vinaryId,
        orderDate: new Date(),
        totalAmount: request.totalAmount,
        status: request.status,
        customerName: request.fullName,
        contactEmail: request.email,
        contactPhone: request.phoneNumber,
        pickupDateFrom: request.pickupDateFrom ?? null,
        pickupDateTo: request.pickupDateTo ?? null,
        items: {
          createMany: {
            data: request.items.map((item) => ({
              wineId: item.wineId,
              quantity: item.quantity,
              unitPrice: item.price,
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });
    return Result.ok(order);
  } catch (error) {
    return Result.err(new Error('Failed to create order'));
  }
}

/**
 * Získá objednávku z databáze podle zadaného ID.
 * @param request Objekt obsahující ID požadované objednávky.
 * @returns Promise s výsledkem operace.
 */
export async function getOrderById(
  request: GetOrderByIdRequest,
): Promise<GetOrderResult> {
  try {
    const order = await client.order.findUniqueOrThrow({
      where: { id: request.orderId },
      include: { items: true },
    });
    return Result.ok(order);
  } catch (error) {
    return Result.err(new Error('Failed to get order'));
  }
}

/**
 * Získá všechny objednávky z databáze s možností stránkování.
 * @param request Objekt obsahující informace o stránce a velikosti stránky.
 * @returns Promise s výsledkem operace.
 */
export async function getAllOrdersPaginated(
  request: PaginatedRequestOrder,
): Promise<GetAllOrdersResponce> {
  const pageSize = 12;

  try {
    const result = await client.$transaction(async (tx) => {
      const queryFilter: any = { where: {} };

      if (request.query) {
        queryFilter.where.id = {
          contains: request.query,
          mode: 'insensitive',
        };
      }

      if (request.winery) {
        queryFilter.where.vinaryId = request.winery;
      }

      if (request.status) {
        queryFilter.where.status = request.status;
      }
      const totalCount = await tx.order.count(queryFilter);
      const totalPages = Math.ceil(totalCount / pageSize);
      const orders = await tx.order.findMany({
        include: { items: true },
        ...queryFilter,
        take: pageSize,
        skip: (request.page - 1) * pageSize,
      });

      return { data: orders, pages: totalPages };
    });

    return Result.ok(result);
  } catch (error) {
    return Result.err(new Error('Failed to fetch orders'));
  }
}

/**
 * Aktualizuje stav objednávky v databázi.
 * @param request Objekt obsahující ID objednávky a nový stav.
 * @returns Promise s výsledkem operace.
 */
export async function updateOrderStatus(
  request: UpdateOrderStatusRequest,
): Promise<UpdateOrderStatusResult> {
  try {
    await client.order.update({
      where: { id: request.orderId },
      data: {
        status: request.status,
        pickupDateFrom: request.pickupDateFrom,
        pickupDateTo: request.pickupDateTo,
      },
    });
    return Result.ok(undefined);
  } catch (error) {
    return Result.err(new Error('Failed to update order status'));
  }
}

/**
 * Smaže objednávku z databáze podle zadaného ID.
 * @param request Objekt obsahující ID objednávky k odstranění.
 * @returns Promise s výsledkem operace.
 */
export async function deleteOrder(
  request: DeleteOrderRequst,
): Promise<DeleteOrderResult> {
  try {
    await client.orderItem.deleteMany({
      where: { orderId: request.orderId },
    });

    await client.order.delete({
      where: { id: request.orderId },
    });

    return Result.ok(undefined);
  } catch (error) {
    return Result.err(new Error('Failed to delete order'));
  }
}
