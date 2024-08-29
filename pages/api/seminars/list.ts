// pages/api/mentor/seminars/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Seminar from '../../../lib/models/seminar'

const listSeminars = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const seminars = await Seminar.find();
    return res.status(200).json(seminars);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default listSeminars;

