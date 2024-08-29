// pages/api/courses/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Course from '../../../lib/models/course';

const getAllCourses = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const courses = await Course.find().populate('mentorId', 'name'); // Populate mentorId to get mentor's name
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getAllCourses;

