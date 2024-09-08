import { z } from 'zod';

export const createWineSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    wineryId: z.string(),
    price: z.coerce.number().optional(),
    type: z.string().optional(),
    attribution: z.string().optional(),
    description: z.string().optional(),
    alcoholPercentage: z.coerce.number().optional(),
    sugarGramsPerLiter: z.coerce.number().optional(),
    glycerolGramsPerLiter: z.coerce.number().optional(),
    totalAcidityGramsPerLiter: z.coerce.number().optional(),
    pH: z.coerce.number().optional(),
    year: z.string(),
  }),
});

export const updateWineSchema = z.object({
  params: z.object({ id: z.string().uuid() }),
  body: z.object({
    name: z.string().min(1).max(255),
    price: z.coerce.number().optional(),
    type: z.string().optional(),
    attribution: z.string().optional(),
    description: z.string().optional(),
    alcoholPercentage: z.coerce.number().optional(),
    sugarGramsPerLiter: z.coerce.number().optional(),
    glycerolGramsPerLiter: z.coerce.number().optional(),
    totalAcidityGramsPerLiter: z.coerce.number().optional(),
    pH: z.coerce.number().optional(),
    year: z.string().optional(),
  }),
});
