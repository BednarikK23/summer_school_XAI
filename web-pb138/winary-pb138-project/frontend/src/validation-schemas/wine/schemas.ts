import { z } from 'zod';

export const createEditWineSchema = z.object({
  name: z.string().min(1, 'name is required'),
  price: z.union([
    z.number().gte(1, 'price must be at least 1'),
    z
      .string()
      .min(1, 'price is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid price.',
      }),
  ]),
  year: z.union([
    z
      .number()
      .gte(1900, 'year must be at least 1900')
      .lte(
        new Date().getFullYear(),
        `year must be at most ${new Date().getFullYear()}`,
      ),
    z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear();
      },
      {
        message: `Invalid year. Must be a number between 1900 and ${new Date().getFullYear()} or a string that represents a number between 1900 and ${new Date().getFullYear()}.`,
      },
    ),
  ]),
  alcoholPercentage: z.union([
    z.number().gte(0, 'Alcohol percentage must be at least 0.'),
    z.string().refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= 0;
      },
      {
        message:
          'Invalid alcohol percentage. Must be a non-negative number or a string that represents a non-negative number.',
      },
    ),
  ]),
  attribution: z.string().min(1, 'attribution is required'),
  description: z.string().min(1, 'description is required'),
  glycerolGramsPerLiter: z.union([
    z.number().gte(0, 'Glycerol grams per liter must be at least 0.'),
    z
      .string()
      .min(1, 'glycerol information is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid glycerol information percentage.',
      }),
  ]),
  pH: z.union([
    z.number().gte(0, 'pH must be at least 0.'),
    z
      .string()
      .min(1, 'pH is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid pH percentage.',
      }),
  ]),
  sugarGramsPerLiter: z.union([
    z.number().gte(0, 'Sugar grams per liter must be at least 0.'),
    z
      .string()
      .min(1, 'sugar information is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid sugar information percentage.',
      }),
  ]),
  totalAcidityGramsPerLiter: z.union([
    z
      .string()
      .min(1, 'acidity information is required')
      .refine((val) => Number(val) > 0, {
        message: 'Invalid acidity information percentage.',
      }),
    z.number().gte(0, 'Total acidity grams per liter must be at least 0.'),
  ]),
  type: z.enum(['WHITE', 'RED', 'ROSE', 'SPARKLING']),
});
