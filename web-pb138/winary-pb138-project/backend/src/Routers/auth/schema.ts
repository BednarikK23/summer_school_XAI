import { z } from 'zod';

export const registerSchema = z.object({
  body: z
    .object({
      username: z.string().min(2).max(255),
      email: z.string().email(),
      password: z.string().max(255),
      confirmPassword: z.string().max(255),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
  }),
});
