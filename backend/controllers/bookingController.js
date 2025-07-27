const Booking = require('../models/Booking');

// @desc Create a booking
exports.createBooking = async (req, res) => {
  try {
    const { userId, courseId, preferredSchedule } = req.body;

    if (!userId || !courseId || !preferredSchedule) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const booking = new Booking({
      userId,
      courseId,
      preferredSchedule,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get bookings by user
exports.getBookingsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId query param is required' });
    }

    const bookings = await Booking.find({ userId }).populate('courseId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
