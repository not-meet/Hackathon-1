import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';
import { mentorSigninSchema } from '../../../validations/mentor';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const mentorSigninHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Manually validate the request body
      try {
        mentorSigninSchema.parse(req.body);
      } catch (error) {
        if (error instanceof ZodError) {
          return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const { email, password } = req.body;

      const mentor = await Mentor.findOne({ email });
      if (!mentor) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, mentor.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: mentor._id, email: mentor.email }, JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: 'Sign in successful', token });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default mentorSigninHandler;

