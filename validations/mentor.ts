// validations/mentor.ts
import { z } from 'zod';

export const mentorSignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  bio: z.string().optional(),
  expertise: z.array(z.string()).min(1, "At least one area of expertise is required"),
  age: z.number().min(18, "Mentor must be at least 18 years old"),
  degree: z.string().min(1, "Degree is required"),
  specialization: z.string().min(1, "Specialization is required"),
  experience: z.number().min(0, "Experience must be a positive number"),
  placesWorked: z.array(z.string()).min(1, "At least one place worked is required"),
});

export const mentorSigninSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

