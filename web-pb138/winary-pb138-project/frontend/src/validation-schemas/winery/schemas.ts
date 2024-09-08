import { z } from 'zod';
import { isMobilePhone, isEmail } from 'validator';

export const createEditWinerySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  location: z.string().min(1, 'Location is required'),
  openingTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):?([0-5]\d)$/,
      'Invalid opening time format, must be HH:MM',
    ),
  closingTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):?([0-5]\d)$/,
      'Invalid closing time format, must be HH:MM',
    ),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  ico: z
    .string()
    .min(1, 'IČO is required')
    .refine((val) => Number(val) > 0, {
      message: 'Invalid IČO.',
    }),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(isMobilePhone, 'Invalid phone number'),
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(isEmail, 'Invalid email'),
});
