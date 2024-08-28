import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db';
import Mentor from '../../../../lib/models/mentor';
import { authenticate } from '../../../../middlewares/auth';

const mentorProfileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  // Get the mentor profile
  if (req.method === 'GET') {
    try {
      const mentor = await Mentor.findById((req as any).user.id);
      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
      res.status(200).json(mentor);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch mentor profile' });
    }
  }

  // Update the mentor profile
  else if (req.method === 'PUT') {
    try {
      const updates = req.body;
      const mentor = await Mentor.findByIdAndUpdate((req as any).user.id, updates, { new: true });

      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }
      res.status(200).json({ message: 'Profile updated successfully', mentor });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update mentor profile' });
    }
  }

  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(mentorProfileHandler);

