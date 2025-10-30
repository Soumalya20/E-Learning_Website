const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  duration: String,
  order: Number
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
  chapters: [chapterSchema],
  duration: {
    type: String,
    default: '0 hours'
  },
  language: {
    type: String,
    default: 'English'
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  requirements: [String],
  whatYouWillLearn: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);






