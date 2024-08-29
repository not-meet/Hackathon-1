// pages/api/mentor/courses/delete.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../../lib/models/course';
import { authenticate } from '../../../../middlewares/auth';

const deleteCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Assuming course ID is passed as a query parameter
  const mentorId = (req as any).user.id; // Assumes user id is attached to request by authenticate middleware

  try {
    const course = await Course.findOne({ _id: id, mentorId });

    if (!course) {
      return res.status(404).json({ error: 'Course not found or not authorized' });
    }

    await Course.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default authenticate(deleteCourse);

