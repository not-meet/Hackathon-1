// pages/api/mentor/courses/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../../lib/models/course';
import { authenticate } from '../../../../middlewares/auth';
import { validate } from '../../../../middlewares/validate';
import { z } from 'zod';

// Define Zod schema for validation
const courseSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number(),
  isPaid: z.boolean(),
  videos: z.array(z.object({
    title: z.string().nonempty(),
    description: z.string().optional(),
    url: z.string().nonempty(),
  })).max(5),
  pdfs: z.array(z.string()).optional(),
});

const createCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, price, isPaid, videos, pdfs } = req.body;
  const mentorId = (req as any).user.id; // Assumes user id is attached to request by authenticate middleware

  try {
    const course = new Course({ title, description, price, isPaid, videos, pdfs, mentorId });
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Wrap the handler with validation and authentication
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Validate request body
  validate(courseSchema)(req, res, async () => {
    // Authenticate the request
    await authenticate(async (req: NextApiRequest, res: NextApiResponse) => {
      // Execute the course creation handler
      await createCourse(req, res);
    })(req, res);
  });
};

