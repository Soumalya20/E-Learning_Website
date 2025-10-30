import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { paymentsAPI } from '../services/api';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { FaPlay, FaClock, FaBook } from 'react-icons/fa';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await paymentsAPI.getEnrollments();
      setEnrollments(res.data.filter(e => e.status === 'completed'));
    } catch (error) {
      toast.error('Failed to fetch enrollments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-xl text-gray-600">Continue where you left off</p>
        </motion.div>

        {enrollments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h2>
            <p className="text-gray-600 mb-6">Start learning by enrolling in courses</p>
            <Link
              to="/courses"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment, index) => (
              <motion.div
                key={enrollment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
                  <img
                    src={enrollment.course.thumbnail}
                    alt={enrollment.course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {enrollment.course.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <FaClock className="mr-2" />
                    <span>{enrollment.course.duration}</span>
                  </div>
                  <Link
                    to={`/course/${enrollment.course._id}/learn`}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center"
                  >
                    <FaPlay className="mr-2" />
                    Continue Learning
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;






