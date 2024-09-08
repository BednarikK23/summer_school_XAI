import { z } from 'zod';

export const createTourRequestSchema = z.object({
  body: z.object({
    location: z.string().min(1, 'Location is required'),
    address: z.string().min(1, 'Address is required'),
    time: z.string(),
    status: z.string().min(1, 'Status is required'),
    name: z.string(),
    description: z.string(),
  }),
});

export const deleteTourRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tour ID format'),
  }),
});

export const getSingleTourRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tour ID format'),
  }),
});

export const updateTourRequestSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid tour ID format'),
  }),
  body: z.object({
    location: z.string().optional(),
    address: z.string().optional(),
    time: z.string().optional(),
    status: z.string().optional(),
    name: z.string().optional(),
    participants: z.array(z.string()).optional(),
    description: z.string().optional(),
  }),
});

export const addWinerToTourSchema = z.object({
  body: z.object({
    winerId: z.string().uuid('Invalid tour ID format'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid tour ID format'),
  }),
});

export const getAllToursPaginatedSchema = z.object({
  query: z.object({
    query: z.string(),
    page: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value)),
    happensAfter: z.string().optional(),
    happensBefore: z.string().optional(),
    location: z.string().optional(),
    status: z.string().optional(),
    orderDate: z.enum(['asc', 'desc']).optional(),
  }),
  params: z.object({
    id: z.string().uuid().optional(),
  }),
});

export const removeWinerFromTourSchema = z.object({
  body: z.object({
    winerId: z.string().uuid('Invalid winner ID format'),
  }),
  params: z.object({
    id: z.string().uuid('Invalid tour ID format'),
  }),
});
