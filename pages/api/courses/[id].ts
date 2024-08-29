// pages/api/courses/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../lib/models/course';

const getCourseById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Get course ID from query parameters

  try {
    const course = await Course.findById(id).populate('mentorId', 'name'); // Populate mentorId to include mentor's name

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getCourseById;

