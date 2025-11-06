const UserProgress = require('../models/UserProgress');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

// Mark a lesson as complete
exports.markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body; // lessonId format: "moduleIndex-lessonIndex"
    const userId = req.userId;

    // Check if user is enrolled
    const enrollment = await Enrollment.findOne({ 
      student: userId, 
      course: courseId,
      status: 'completed'
    });
    
    if (!enrollment) {
      return res.status(403).json({ message: 'You must be enrolled in this course to track progress' });
    }

    // Get or create progress document
    let progress = await UserProgress.findOne({ user: userId, course: courseId });
    
    if (!progress) {
      progress = new UserProgress({
        user: userId,
        course: courseId,
        completedLessons: []
      });
    }

    // Add lesson if not already completed
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Count total lessons
    let totalLessons = 0;
    if (course.modules && course.modules.length > 0) {
      totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    } else if (course.chapters && course.chapters.length > 0) {
      totalLessons = course.chapters.length;
    }

    progress.progressPercentage = totalLessons > 0 
      ? Math.round((progress.completedLessons.length / totalLessons) * 100)
      : 0;

    progress.updatedAt = new Date();
    await progress.save();

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's progress for a course
exports.getUserProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.userId;

    let progress = await UserProgress.findOne({ user: userId, course: courseId });
    
    if (!progress) {
      // Return empty progress
      progress = {
        user: userId,
        course: courseId,
        completedLessons: [],
        progressPercentage: 0
      };
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

