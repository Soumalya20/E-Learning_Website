const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Review = require('../models/Review');

// Get instructor's courses
exports.getMyCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ instructor: userId })
      .populate('instructor', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get instructor analytics
exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.userId;

    // Get all courses by instructor
    const courses = await Course.find({ instructor: userId });
    const courseIds = courses.map(c => c._id);

    // Get total enrollments
    const enrollments = await Enrollment.find({ 
      course: { $in: courseIds },
      status: 'completed'
    });

    // Calculate total revenue
    const totalRevenue = enrollments.reduce((sum, enrollment) => {
      const course = courses.find(c => c._id.toString() === enrollment.course.toString());
      return sum + (course ? course.price : 0);
    }, 0);

    // Get total students enrolled
    const uniqueStudents = new Set(enrollments.map(e => e.student.toString()));
    const totalStudents = uniqueStudents.size;

    // Get average rating
    const reviews = await Review.find({ course: { $in: courseIds } });
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    // Get total courses
    const totalCourses = courses.length;

    // Get enrollments by course
    const enrollmentsByCourse = await Enrollment.aggregate([
      { $match: { course: { $in: courseIds }, status: 'completed' } },
      { $group: { _id: '$course', count: { $sum: 1 } } }
    ]);

    res.json({
      totalCourses,
      totalStudents,
      totalEnrollments: enrollments.length,
      totalRevenue,
      averageRating: Math.round(averageRating * 10) / 10,
      enrollmentsByCourse
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

