import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../middlewares/auth';
import Mentee from '../../../lib/models/mentee'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const mentee = await Mentee.findById((req as any).user.id);
      if (!mentee) return res.status(404).json({ error: 'Mentee not found' });
      res.status(200).json(mentee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default authenticate(handler);

