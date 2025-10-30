const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const auth = require('../middleware/auth');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
router.post('/create-order', auth, async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const options = {
      amount: course.price * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${courseId}_${req.userId}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { orderId, paymentId, courseId, signature } = req.body;

    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: req.userId,
      course: courseId,
      orderId,
      paymentId,
      status: 'completed'
    });
    await enrollment.save();

    // Update course enrollments
    await Course.findByIdAndUpdate(courseId, {
      $inc: { studentsEnrolled: 1 }
    });

    // Update user's enrolled courses
    await User.findByIdAndUpdate(req.userId, {
      $addToSet: { enrolledCourses: courseId }
    });

    res.json({ message: 'Payment verified and enrollment successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user enrollments
router.get('/my-enrollments', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.userId })
      .populate('course')
      .sort({ enrolledAt: -1 });
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;






