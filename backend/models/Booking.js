const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  preferredSchedule: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
