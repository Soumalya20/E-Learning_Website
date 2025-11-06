const Review = require('../models/Review');
const Course = require('../models/Course');

// Create a review
exports.createReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.userId;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user already reviewed this course
    const existingReview = await Review.findOne({ course: courseId, user: userId });
    
    let review;
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment || existingReview.comment;
      existingReview.updatedAt = new Date();
      review = await existingReview.save();
    } else {
      // Create new review
      review = new Review({
        course: courseId,
        user: userId,
        rating,
        comment: comment || ''
      });
      await review.save();
    }

    // Recalculate average rating
    const reviews = await Review.find({ course: courseId });
    const totalRatings = reviews.length;
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    // Update course ratings
    course.averageRating = averageRating;
    course.totalRatings = totalRatings;
    // Legacy fields for backward compatibility
    course.rating = averageRating;
    course.numReviews = totalRatings;
    await course.save();

    // Populate user info
    await review.populate('user', 'name email');

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews for a course
exports.getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const reviews = await Review.find({ course: courseId })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

