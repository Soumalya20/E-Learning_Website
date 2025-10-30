import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesAPI } from '../services/api';
import { mockCourses } from '../mockData/courses';
import { toast } from 'react-hot-toast';
import { FaStar, FaUsers, FaClock } from 'react-icons/fa';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // Try to fetch from API, fallback to mock data if fails
      try {
        const res = await coursesAPI.getAll();
        let filteredCourses = res.data;
        
        if (category !== 'all') {
          filteredCourses = res.data.filter(course => course.category === category);
        }
        
        if (filteredCourses.length > 0) {
          setCourses(filteredCourses);
          return;
        }
      } catch (error) {
        console.log('API not available, using mock data');
      }
      
      // Use mock data if API fails or returns no data
      let filteredCourses = mockCourses;
      if (category !== 'all') {
        filteredCourses = mockCourses.filter(course => course.category === category);
      }
      setCourses(filteredCourses);
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Web Development', 'Data Science', 'Graphic Design', 'Business', 'Marketing'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">Discover your next learning journey</p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                category === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No courses found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden card-hover"
              >
                <Link to={`/course/${course._id}`}>
                  <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-700">
                        {course.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">({course.numReviews})</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <FaUsers className="mr-1" />
                        <span>{course.studentsEnrolled} students</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary-600">
                        ₹{course.price}
                      </span>
                      <button className="text-primary-600 font-semibold hover:text-primary-700">
                        View Course →
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;



