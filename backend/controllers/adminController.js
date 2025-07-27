const Course = require('../models/Course');

// @desc Add a new course (admin-only)
exports.addCourse = async (req, res) => {
  try {
    const { title, description, image, price, duration, instructor } = req.body;

    if (!title || !description || !price || !duration || !instructor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const course = await Course.create({
      title,
      description,
      image,
      price,
      duration,
      instructor,
    });

    res.status(201).json({ message: 'Course created', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
