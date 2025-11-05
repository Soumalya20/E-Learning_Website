const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const instructorController = require('../controllers/instructorController');

// Middleware to check if user is instructor or admin
const checkInstructor = (req, res, next) => {
  if (req.userRole !== 'instructor' && req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Instructor access required.' });
  }
  next();
};

// Get instructor's courses
router.get('/my-courses', auth, checkInstructor, instructorController.getMyCourses);

// Get instructor analytics
router.get('/analytics', auth, checkInstructor, instructorController.getAnalytics);

module.exports = router;

