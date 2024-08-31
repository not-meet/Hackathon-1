import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentee from '../../../lib/models/mentee';
import { menteeSigninSchema } from '../../../validations/mentee'; // Or import from a new file
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ZodError } from 'zod';

const JWT_SECRET = 'hello';

const menteeSigninHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Validate the request body directly
      menteeSigninSchema.parse(req.body);

      const { email, password } = req.body;

      const mentee = await Mentee.findOne({ email });
      if (!mentee) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, mentee.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: mentee._id, email: mentee.email }, JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({ message: 'Sign in successful', token });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      return res.status(500).json({ error: 'Failed to sign in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default menteeSigninHandler;

