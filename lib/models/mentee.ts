import mongoose, { Schema, Document } from 'mongoose';

// Define the Mentee interface extending Mongoose Document
export interface IMentee extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  enrolledCourses?: string[];  // Array of Course IDs
  reviews?: {
    mentorId: string;
    rating: number;
    comment: string;
  }[];
  membership?: {
    isActive: boolean;
    startDate: Date;
    endDate: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Mentee Schema
const MenteeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    reviews: [
      {
        mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
      },
    ],
    membership: {
      isActive: { type: Boolean, default: false },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Export the Mentee model
export default mongoose.models.Mentee || mongoose.model<IMentee>('Mentee', MenteeSchema);

