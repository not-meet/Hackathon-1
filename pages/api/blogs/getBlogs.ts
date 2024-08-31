import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';

const getBlogsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const mentors = await Mentor.find({}, 'blogs name').lean();

      const blogs = mentors.flatMap((mentor: any) =>
        mentor.blogs.map((blog: any) => ({
          mentorName: mentor.name,
          ...blog,
        }))
      );

      res.status(200).json({ blogs });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve blogs' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default getBlogsHandler;

