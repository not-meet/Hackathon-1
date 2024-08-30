import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import Mentor from '../../lib/models/mentor';
import { authenticate } from '../../middlewares/auth';

const allMentorsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  // Get all mentor profiles
  if (req.method === 'GET') {
    try {
      const mentors = await Mentor.find({});
      res.status(200).json(mentors);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch mentor profiles' });
    }
  }

  // Method not allowed
  else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(allMentorsHandler);

