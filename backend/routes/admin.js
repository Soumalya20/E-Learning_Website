const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Middleware to check if user is admin
const checkAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin access required.' });
  }
  next();
};

// Get all users
router.get('/users', auth, checkAdmin, adminController.getAllUsers);

// Update user role
router.put('/user/:id/role',
  auth,
  checkAdmin,
  [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('role').isIn(['student', 'instructor', 'admin']).withMessage('Invalid role')
  ],
  adminController.updateUserRole
);

// Get all courses
router.get('/courses', auth, checkAdmin, adminController.getAllCourses);

// Update course status
router.put('/course/:id/status',
  auth,
  checkAdmin,
  [
    param('id').isMongoId().withMessage('Invalid course ID'),
    body('status').isIn(['draft', 'pending', 'approved', 'rejected']).withMessage('Invalid status')
  ],
  adminController.updateCourseStatus
);

module.exports = router;

