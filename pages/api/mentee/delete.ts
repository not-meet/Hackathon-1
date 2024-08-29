import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '../../../middlewares/auth';
import Mentee from '../../../lib/models/mentee';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      await Mentee.findByIdAndDelete((req as any).user.id);
      res.status(204).end();  // No content response
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default authenticate(handler);

