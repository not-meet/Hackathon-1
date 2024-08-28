import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentee from '../../../lib/models/mentee';
import { menteeSignupSchema } from '../../../validations/mentee';
import { validate } from '../../../middlewares/validate';
import bcrypt from 'bcryptjs';

const menteeSignupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Validate the request body
      validate(menteeSignupSchema)(req, res, async () => {
        const { name, email, password, age, interests } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const mentee = new Mentee({
          name,
          email,
          password: hashedPassword,
          age,
          interests,
        });

        await mentee.save();
        return res.status(201).json({ message: 'Mentee created successfully!' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign up mentee' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default menteeSignupHandler;

