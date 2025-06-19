import express from 'express';
import Leave from '../models/Leave.js';

const router = express.Router();

// Submit leave request
router.post('/', async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all leaves (admin view)
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve a leave
router.patch('/:id/approve', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Reject a leave
router.patch('/:id/reject', async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
