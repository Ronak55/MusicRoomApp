const express = require('express');
const { addCourse } = require('../controllers/adminController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Optionally, you can add role-check middleware for 'admin'
router.post('/courses', protect, addCourse);

module.exports = router;
