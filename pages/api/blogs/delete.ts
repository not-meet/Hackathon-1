import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';
import { authenticate } from '../../../middlewares/auth';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    // Add other user properties if necessary
  };

}

const deleteBlogHandler = async (req: AuthenticatedRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'DELETE') {
    try {
      const { blogId } = req.query; // Get the blog ID from query parameters

      if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

      const mentorId = req.user.id;

      // Remove blog from mentor's profile
      await Mentor.findByIdAndUpdate(
        mentorId,
        { $pull: { blogs: { _id: blogId } } },
        { new: true }
      );

      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete blog' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authenticate(deleteBlogHandler);

