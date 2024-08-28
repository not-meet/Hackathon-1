import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../../lib/db';
import Mentor from '../../../../lib/models/mentor';
import { authenticate } from '../../../../middlewares/auth';

const deleteMentorProfileHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const mentor = await Mentor.findByIdAndDelete((req as any).user.id);

      if (!mentor) {
        return res.status(404).json({ error: 'Mentor not found' });
      }

      res.status(200).json({ message: 'Mentor profile deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete mentor profile' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(deleteMentorProfileHandler);

