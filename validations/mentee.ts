import { z } from 'zod';

export const menteeSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  age: z.number().min(0, "Age must be a positive number"),
  interests: z.array(z.string()).optional(),
  // Add other fields as necessary
});

export const menteeSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

