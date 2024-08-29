import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../middlewares/auth';
import Mentee from '../../../lib/models/mentee';
import { z } from 'zod';

// Zod validation schema
const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  profileImage: z.string().optional(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    try {
      updateProfileSchema.parse(req.body);  // Validate request body
      const { name, email, profileImage } = req.body;
      const mentee = await Mentee.findByIdAndUpdate(
        (req as any).user.id,
        { name, email, profileImage },
        { new: true }
      );
      if (!mentee) return res.status(404).json({ error: 'Mentee not found' });
      res.status(200).json(mentee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default authenticate(handler);

