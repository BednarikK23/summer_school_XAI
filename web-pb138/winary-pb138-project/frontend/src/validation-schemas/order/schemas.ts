import { z } from 'zod';
import { isMobilePhone, isEmail } from 'validator';

const wineItemSchema = z.object({
  wineId: z.string(),
  quantity: z.string().min(1),
  price: z.string().min(1),
});

export const createOrderSchema = z
  .object({
    vinaryId: z.string().min(1, 'Winery ID is required'),
    fullName: z.string().min(1, 'Name is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(isMobilePhone, 'Invalid phone number'),
    email: z.string().email(),
    pickupDateFrom: z.string(),
    pickupDateTo: z.string(),
    items: z.array(wineItemSchema),
    totalAmount: z
      .string()
      .min(1, 'Total amount is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid total amount.',
      }),
    status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED']),
  })
  .refine(
    (data) => {
      const pickupDateFrom = new Date(data.pickupDateFrom);
      const pickupDateTo = new Date(data.pickupDateTo);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return pickupDateTo > pickupDateFrom && pickupDateFrom >= today;
    },
    {
      message: 'pickupDateTo must be after pickupDateFrom',
      path: ['pickupDateTo'],
    },
  );

export const editOrderSchema = z
  .object({
    status: z.enum(['PENDING', 'ACTIVE', 'COMPLETED']),
    pickupDateFrom: z.string(),
    pickupDateTo: z.string(),
  })
  .refine(
    (data) => {
      const pickupDateFrom = new Date(data.pickupDateFrom);
      const pickupDateTo = new Date(data.pickupDateTo);
      return pickupDateTo > pickupDateFrom;
    },
    {
      message: 'pickupDateTo must be after pickupDateFrom',
      path: ['pickupDateTo'],
    },
  );

export const customerInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .refine(isMobilePhone, 'Invalid phone number'),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(isEmail, 'Invalid email'),
});
