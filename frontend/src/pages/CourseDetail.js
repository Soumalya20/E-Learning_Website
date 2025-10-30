import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesAPI, paymentsAPI } from '../services/api';
import { mockCourses } from '../mockData/courses';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaStar, FaUsers, FaClock, FaCheck, FaPlay } from 'react-icons/fa';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
    if (user) {
      checkEnrollment();
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      // Try API first
      try {
        const res = await coursesAPI.getById(id);
        setCourse(res.data);
        setLoading(false);
        return;
      } catch (error) {
        console.log('API not available, using mock data');
      }
      
      // Fallback to mock data
      const mockCourse = mockCourses.find(c => c._id === id);
      if (mockCourse) {
        setCourse(mockCourse);
      } else {
        toast.error('Course not found');
      }
    } catch (error) {
      toast.error('Failed to fetch course details');
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollment = async () => {
    if (!user) return;
    try {
      const res = await paymentsAPI.getEnrollments();
      const isEnrolled = res.data.some(enrollment => enrollment.course._id === id);
      setEnrolled(isEnrolled);
    } catch (error) {
      console.error('Failed to check enrollment');
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll');
      navigate('/login');
      return;
    }

    if (enrolled) {
      navigate(`/course/${id}/learn`);
      return;
    }

    try {
      // Create Razorpay order
      const orderRes = await paymentsAPI.createOrder(id);
      const { orderId, amount } = orderRes.data;

      // Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: 'E-Learn',
        description: course.title,
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentsAPI.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              courseId: id,
              signature: response.razorpay_signature
            });
            toast.success('Payment successful! You are now enrolled.');
            setEnrolled(true);
            navigate(`/course/${id}/learn`);
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: {
          color: '#0ea5e9'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error('Failed to initiate payment');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-50 to-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-6" />
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-lg font-semibold">{course.rating.toFixed(1)}</span>
                <span className="text-gray-500 ml-2">({course.numReviews} reviews)</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2" />
                  <span>{course.studentsEnrolled} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-6">
                ₹{course.price}
              </div>
              <button
                onClick={handleEnroll}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center"
              >
                <FaPlay className="mr-2" />
                {enrolled ? 'Continue Learning' : 'Enroll Now'}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
              <ul className="space-y-3 mb-8">
                {course.whatYouWillLearn?.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FaCheck className="text-green-500 mr-3 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <div className="space-y-2">
                {course.chapters?.map((chapter, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow">
                    <p className="font-semibold text-gray-900">
                      {index + 1}. {chapter.title}
                    </p>
                    <p className="text-sm text-gray-600">{chapter.duration}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">About this course</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>
          
          <h3 className="text-xl font-bold mb-4">Requirements</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {course.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;



