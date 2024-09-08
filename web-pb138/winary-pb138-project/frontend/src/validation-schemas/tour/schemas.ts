import { z } from 'zod';

export const createEditTourSchema = z.object({
  status: z.enum(['SCHEDULED', 'COMPLETED']),
  name: z.string().min(1, 'Name is required'),
  time: z
    .string()
    .min(1, 'Time is required')
    .refine(
      (val) => {
        const date = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return !isNaN(date.getTime()) && date >= today;
      },
      {
        message: 'Invalid date',
      },
    ),
  location: z.string().min(1, 'Location is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().min(1, 'Description is required'),
});
