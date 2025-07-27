const Course = require('../models/Course');

// @desc Get all courses
exports.getCourses = async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search
      ? { title: { $regex: search, $options: 'i' } }
      : {};

    const courses = await Course.find(query);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
