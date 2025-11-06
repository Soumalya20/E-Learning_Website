const mongoose = require('mongoose');

// Lesson schema within a module
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Video', 'Article', 'Quiz'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 0
  },
  order: {
    type: Number,
    default: 0
  }
});

// Module schema containing lessons
const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  lessons: [lessonSchema],
  order: {
    type: Number,
    default: 0
  }
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/400x300'
  },
  category: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'Beginner'
  },
  language: {
    type: String,
    default: 'English'
  },
  whatYouWillLearn: {
    type: [String],
    default: []
  },
  requirements: {
    type: [String],
    default: []
  },
  modules: [moduleSchema],
  // Keep old chapters for backward compatibility (deprecated)
  chapters: [{
    title: String,
    description: String,
    videoUrl: String,
    duration: String,
    order: Number
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  // Legacy fields (kept for backward compatibility)
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  studentsEnrolled: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: '0 hours'
  },
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved', 'rejected'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Text index for search
courseSchema.index({ title: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Course', courseSchema);






