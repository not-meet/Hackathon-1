import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';
import { mentorSigninSchema } from '../../../validations/mentor';
import { validate } from '../../../middlewares/validate';
import bcrypt from 'bcryptjs';

const mentorSigninHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Validate the request body using the middleware
      validate(mentorSigninSchema)(req, res, async () => {
        const { email, password } = req.body;

        // Find the mentor by email
        const mentor = await Mentor.findOne({ email });

        if (!mentor) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, mentor.password);

        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Authentication successful
        return res.status(200).json({ message: 'Sign-in successful!' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign in mentor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default mentorSigninHandler;

