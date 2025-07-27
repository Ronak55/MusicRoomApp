const express = require('express');
const router = express.Router();
const { getCourses, getCourseById } = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCourses);
router.get('/:id', protect, getCourseById);

module.exports = router;
