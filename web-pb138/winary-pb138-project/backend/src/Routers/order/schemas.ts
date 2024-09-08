import { z } from 'zod';

export const getSingleOrderRequestSchema = z.object({
  params: z.object({
    orderId: z.string().uuid(),
  }),
});

export const getAllOrdersRequestSchema = z.object({
  query: z.object({
    page: z.string().min(1).max(255),
    type: z.string().optional(),
  }),
});
export const getAllOrdersRequestSchemaForWinary = z.object({
  query: z.object({
    page: z.string().min(1).max(255),
    query: z.string().optional(),
    status: z.string().optional(),
    winery: z.string().optional(),
  }),
});

export const deleteOrderRequestSchema = z.object({
  params: z.object({
    orderId: z.string().uuid(),
  }),
});

export const createOrderRequestSchema = z.object({
  body: z.object({
    vinaryId: z.string(),
    fullName: z.string(),
    phoneNumber: z.string(),
    email: z.string(),
    pickupDateFrom: z.string().optional(),
    pickupDateTo: z.string().optional(),
    items: z.array(
      z.object({
        wineId: z.string(),
        quantity: z.coerce.number(),
        price: z.coerce.number().min(0),
      }),
    ),
    totalAmount: z.number().min(0),
    status: z.string(),
  }),
});

export const updateOrderStatusRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.string(),
    pickupDateFrom: z.string(),
    pickupDateTo: z.string(),
  }),
});
