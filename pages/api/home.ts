// pages/api/home.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db'; // Adjust the path as needed
import Mentor from '@/lib/models/mentor';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch mentors' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

