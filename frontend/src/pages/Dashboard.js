import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaBook, FaGraduationCap, FaUser, FaPlusCircle } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: <FaBook className="text-4xl text-primary-600" />,
      title: 'Enrolled Courses',
      value: '0',
      color: 'bg-blue-100'
    },
    {
      icon: <FaGraduationCap className="text-4xl text-green-600" />,
      title: 'Completed',
      value: '0',
      color: 'bg-green-100'
    },
    {
      icon: <FaUser className="text-4xl text-purple-600" />,
      title: 'Profile Views',
      value: '0',
      color: 'bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600">Here's your learning overview</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.color} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">My Courses</h2>
            <div className="text-center py-12">
              <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
              <Link
                to="/courses"
                className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/courses"
                className="block w-full bg-primary-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-primary-700 transition"
              >
                Browse All Courses
              </Link>
              {user?.role === 'instructor' && (
                <Link
                  to="/create-course"
                  className="block w-full bg-gray-100 text-gray-900 py-3 rounded-lg text-center font-semibold hover:bg-gray-200 transition flex items-center justify-center"
                >
                  <FaPlusCircle className="mr-2" />
                  Create New Course
                </Link>
              )}
              <Link
                to="/profile"
                className="block w-full bg-gray-100 text-gray-900 py-3 rounded-lg text-center font-semibold hover:bg-gray-200 transition"
              >
                Edit Profile
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;






