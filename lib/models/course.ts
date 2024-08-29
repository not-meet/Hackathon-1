// models/Course.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the Course document
interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  isPaid: boolean;
  videos: {
    title: string;
    description?: string; // Optional field in interface
    url: string;
  }[];
  pdfs: string[];
  mentorId: mongoose.Schema.Types.ObjectId; // Use ObjectId type for reference
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the Course model
const CourseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, required: true },
    videos: [
      {
        title: { type: String, required: true },
        description: { type: String }, // Optional field in schema
        url: { type: String, required: true },
      },
    ],
    pdfs: [{ type: String }], // Array of URLs or paths to PDF files
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  },
  { timestamps: true }
);

// Create and export the Course model
const Course: Model<ICourse> = mongoose.model<ICourse>('Course', CourseSchema);
export default Course;

