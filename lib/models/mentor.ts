import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Mentor interface
interface IMentor extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  expertise: string[];
  courses?: Array<{
    title: string;
    description: string;
    price: number;
  }>;
  blogs?: Array<{
    title: string;
    content: string;
    publishedAt: Date;
  }>;
  seminars?: Array<{
    title: string;
    description: string;
    date: Date;
  }>;
  membershipStatus?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mentor schema
const MentorSchema: Schema<IMentor> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    expertise: {
      type: [String],
      required: true,
    },
    courses: [
      {
        title: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
      },
    ],
    blogs: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        publishedAt: { type: Date, default: Date.now },
      },
    ],
    seminars: [
      {
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date, required: true },
      },
    ],
    membershipStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define and export the Mentor model
const Mentor: Model<IMentor> = mongoose.model<IMentor>('Mentor', MentorSchema);
export default Mentor;

