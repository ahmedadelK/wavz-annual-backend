import mongoose from 'mongoose';

const leaveSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  type: { type: String, enum: ['annual', 'sick', 'early'], required: true },
  reason: { type: String, required: true },
  startDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  provider: { type: String, enum: ['google'], required: true }
}, { timestamps: true });

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave;

