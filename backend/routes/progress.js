const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const auth = require('../middleware/auth');
const progressController = require('../controllers/progressController');

// Mark lesson as complete
router.post('/mark-complete',
  auth,
  [
    body('courseId').isMongoId().withMessage('Invalid course ID'),
    body('lessonId').notEmpty().withMessage('Lesson ID is required')
  ],
  progressController.markLessonComplete
);

// Get user progress for a course
router.get('/:courseId',
  auth,
  param('courseId').isMongoId().withMessage('Invalid course ID'),
  progressController.getUserProgress
);

module.exports = router;

