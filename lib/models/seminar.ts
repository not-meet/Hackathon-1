// models/Seminar.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

interface ISeminar extends Document {
  title: string;
  description: string;
  date: Date;
  isPaid: boolean;
  price?: number;
  mentorId: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

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

const Seminar: Model<ISeminar> = mongoose.model<ISeminar>('Seminar', SeminarSchema);
export default Seminar;

