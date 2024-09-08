import { z } from 'zod';

const phoneNumberRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

export const createVinaryRequestSchema = z.object({
  body: z.object({
    ownerId: z.string(),
    name: z.string().min(1).max(255),
    openingTime: z.string(),
    closingTime: z.string(),
    location: z.string(),
    address: z.string(),
    description: z.string(),
    ico: z.string(),
    phone: z.string().refine((value) => phoneNumberRegex.test(value), {
      message: 'Invalid phone number.',
    }),
    email: z.string().email({ message: 'Invalid email address.' }),
  }),
});

export const updateVinaryRequestSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    ownerId: z.string().optional(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    location: z.string().optional(),
    address: z.string().optional(),
    description: z.string().optional(),
    ico: z.string().optional(),
    phone: z.string().refine((value) => phoneNumberRegex.test(value), {
      message: 'Invalid phone number.',
    }),
    email: z.string().email({ message: 'Invalid email address.' }),
  }),
});

export const getVinaryPaginatedSchema = z.object({
  query: z.object({
    query: z.string(),
    page: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value)),
    location: z.string().optional(),
    openingTime: z.string().optional(),
    closingTime: z.string().optional(),
    wineType: z.string().optional(),
    orderOpen: z.enum(['asc', 'desc']).optional(),
    orderClose: z.enum(['asc', 'desc']).optional(),
  }),
});
