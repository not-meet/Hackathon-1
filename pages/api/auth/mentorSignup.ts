import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db';
import Mentor from '../../../lib/models/mentor';
import { mentorSignupSchema } from '../../../validations/mentor';
import { validate } from '../../../middlewares/validate';
import bcrypt from 'bcryptjs';

const mentorSignupHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Validate the request body using the middleware
      validate(mentorSignupSchema)(req, res, async () => {
        const { name, email, password, bio, expertise, age, degree, specialization, experience, placesWorked } = req.body;

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const mentor = new Mentor({
          name,
          email,
          password: hashedPassword,
          bio,
          expertise,
          age,
          degree,
          specialization,
          experience,
          placesWorked,
        });

        await mentor.save();
        return res.status(201).json({ message: 'Mentor created successfully!' });
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to sign up mentor' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default mentorSignupHandler;

