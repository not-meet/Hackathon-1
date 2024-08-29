// pages/api/mentor/seminars/create.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Seminar from '../../../lib/models/seminar';
import { authenticate } from '../../../middlewares/auth';
import { validate } from '../../../middlewares/validate';
import { z } from 'zod';

// Define the Zod schema for validation
const seminarSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.date(),
  isPaid: z.boolean(),
  price: z.number().optional(),
});

// Middleware to wrap validation and authentication
const handlerWrapper = (handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    validate(seminarSchema)(req, res, async () => {
      await authenticate(async (req: NextApiRequest, res: NextApiResponse) => {
        await handler(req, res);
      })(req, res);
    });
  };
};

// Create Seminar API Route Handler
const createSeminar = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, date, isPaid, price } = req.body;
  const mentorId = (req as any).user.id; // Assumes user id is attached to request by authenticate middleware

  try {
    const seminar = new Seminar({ title, description, date, isPaid, price, mentorId });
    await seminar.save();
    return res.status(201).json(seminar);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Wrap the handler with validation and authentication
export default handlerWrapper(createSeminar);


