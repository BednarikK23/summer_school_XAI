import z from 'zod';

export const getEntityByIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const getEntityPaginatedSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    page: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value)),
    wineType: z.string().optional(),
    alcoholMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+(\.\d+)?$/.test(value))
      .optional(),
    sugarMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+(\.\d+)?$/.test(value))
      .optional(),
    priceMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    priceMin: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    year: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    sortPrice: z.enum(['asc', 'desc']).optional(),
    sortYear: z.enum(['asc', 'desc']).optional(),
  }),
});

export const getWineryWinesPaginatedSchema = z.object({
  query: z.object({
    query: z.string().optional(),
    page: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value)),
    wineType: z.string().optional(),
    alcoholMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+(\.\d+)?$/.test(value))
      .optional(),
    sugarMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+(\.\d+)?$/.test(value))
      .optional(),
    priceMax: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    priceMin: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    year: z
      .string()
      .min(1)
      .max(255)
      .refine((value) => /^\d+$/.test(value))
      .optional(),
    sortPrice: z.enum(['asc', 'desc']).optional(),
    sortYear: z.enum(['asc', 'desc']).optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const deleteEntitySchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
