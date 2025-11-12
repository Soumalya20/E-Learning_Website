const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const Course = require('../models/Course');
const auth = require('../middleware/auth');
const handleValidationErrors = require('../middleware/validation');

// Search and filter courses
router.get('/search', async (req, res) => {
  try {
    const { q, category, level, rating, price, sort } = req.query;
    
    let query = {};

    // Text search - try regex search (works without text index)
    if (q && q.trim()) {
      query.$or = [
        { title: { $regex: q.trim(), $options: 'i' } },
        { description: { $regex: q.trim(), $options: 'i' } }
      ];
    }

    // Filter by category
    if (category && category.trim()) {
      query.category = category.trim();
    }

    // Filter by level
    if (level && level.trim() && level !== 'All Levels') {
      query.level = level.trim();
    }

    // Filter by rating
    if (rating && rating.trim()) {
      const ratingStr = rating.trim();
      if (ratingStr.includes('_above')) {
        const ratingNum = parseFloat(ratingStr.replace('_above', ''));
        if (!isNaN(ratingNum)) {
          query.averageRating = { $gte: ratingNum };
        }
      } else {
        const ratingNum = parseFloat(ratingStr);
        if (!isNaN(ratingNum)) {
          query.averageRating = { $gte: ratingNum, $lt: ratingNum + 1 };
        }
      }
    }

    // Filter by price
    if (price === 'free') {
      query.price = 0;
    } else if (price === 'paid') {
      query.price = { $gt: 0 };
    }

    // Only show approved courses for public (or show all if admin)
    if (!req.userId || req.userRole !== 'admin') {
      query.status = 'approved';
    }

    let coursesQuery = Course.find(query).populate('instructor', 'name email');

    // Sorting
    if (sort === 'popular') {
      coursesQuery = coursesQuery.sort({ studentsEnrolled: -1, averageRating: -1 });
    } else if (sort === 'rating') {
      coursesQuery = coursesQuery.sort({ averageRating: -1, totalRatings: -1 });
    } else if (sort === 'newest') {
      coursesQuery = coursesQuery.sort({ createdAt: -1 });
    } else if (sort === 'price_low') {
      coursesQuery = coursesQuery.sort({ price: 1 });
    } else if (sort === 'price_high') {
      coursesQuery = coursesQuery.sort({ price: -1 });
    } else {
      coursesQuery = coursesQuery.sort({ createdAt: -1 });
    }

    const results = await coursesQuery;

    res.json(results || []);
  } catch (error) {
    console.error('Error in /courses/search:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to fetch courses',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    // Only show approved courses for public
    if (!req.userId || req.userRole !== 'admin') {
      query.status = 'approved';
    }

    const courses = await Course.find(query).populate('instructor', 'name email').sort({ createdAt: -1 });
    res.json(courses || []);
  } catch (error) {
    console.error('Error in GET /courses:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to fetch courses',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get single course
router.get('/:id',
  param('id').isMongoId().withMessage('Invalid course ID'),
  handleValidationErrors,
  async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create course (instructor only)
router.post('/',
  auth,
  [
    body('title').trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('description').trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'All Levels']).withMessage('Invalid level'),
    body('language').optional().trim().isLength({ min: 2 }).withMessage('Language must be at least 2 characters'),
    body('whatYouWillLearn').optional().isArray().withMessage('whatYouWillLearn must be an array'),
    body('requirements').optional().isArray().withMessage('requirements must be an array'),
    body('modules').optional().isArray().withMessage('modules must be an array')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      if (req.userRole !== 'instructor' && req.userRole !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }

      const course = new Course({
        ...req.body,
        instructor: req.userId,
        status: 'draft' // New courses start as draft
      });
      await course.save();
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Update course
router.put('/:id',
  auth,
  [
    param('id').isMongoId().withMessage('Invalid course ID'),
    body('title').optional().trim().isLength({ min: 5, max: 200 }).withMessage('Title must be between 5 and 200 characters'),
    body('description').optional().trim().isLength({ min: 20 }).withMessage('Description must be at least 20 characters'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('level').optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'All Levels']).withMessage('Invalid level')
  ],
  handleValidationErrors,
  async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    Object.assign(course, req.body);
    course.updatedAt = new Date();
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete course
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await course.remove();
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;






