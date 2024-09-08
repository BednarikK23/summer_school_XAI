import { z } from 'zod';

export const getSingleRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const getUsersRequestSchema = z.object({
  query: z.object({
    page: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value)),
    type: z.string().optional(),
    query: z.string(),
  }),
});

export const deleteUserRequestSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export const createUserRequestSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string(),
  }),
});

export const updateUserRequestSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string(),
  }),
});
