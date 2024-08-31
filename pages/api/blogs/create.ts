import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';
import { authenticate } from '../../../middlewares/auth';
import { blogSchema } from '../../../validations/blog';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;

  };
}

const createBlogHandler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, content, publishedAt } = req.body;

      // Validate request body
      blogSchema.parse({ title, content, publishedAt });

      // Ensure the request is authenticated
      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const mentorId = req.user.id; // Extract mentor ID from authenticated user

      // Add blog to mentor's profile
      await Mentor.findByIdAndUpdate(
        mentorId,
        { $push: { blogs: { title, content, publishedAt } } },
        { new: true }
      );

      res.status(201).json({ message: 'Blog created successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create blog' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(createBlogHandler);

