// models/Seminar.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the Seminar interface extending Mongoose Document
interface ISeminar extends Document {
  title: string;
  description: string;
  date: Date;
  isPaid: boolean;
  price?: number; // Optional, only if isPaid is true
  mentorId: mongoose.Schema.Types.ObjectId; // Reference to the mentor who created the seminar
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Seminar Schema
const SeminarSchema: Schema<ISeminar> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    isPaid: { type: Boolean, required: true },
    price: { type: Number, required: function () { return this.isPaid; } }, // Make price required if isPaid is true
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  },
  { timestamps: true }
);

// Define and export the Seminar model
const Seminar: Model<ISeminar> = mongoose.model<ISeminar>('Seminar', SeminarSchema);
export default Seminar;

