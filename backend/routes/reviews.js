const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/auth');
const reviewController = require('../controllers/reviewController');

// Create a review
router.post('/:courseId/reviews',
  auth,
  [
    param('courseId').isMongoId().withMessage('Invalid course ID'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().trim().escape()
  ],
  reviewController.createReview
);

// Get all reviews for a course
router.get('/:courseId/reviews',
  param('courseId').isMongoId().withMessage('Invalid course ID'),
  reviewController.getCourseReviews
);

module.exports = router;

