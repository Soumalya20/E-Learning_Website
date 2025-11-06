import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaSearch, FaStar, FaUsers, FaArrowRight } from 'react-icons/fa';
import { coursesAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      const res = await coursesAPI.getAll();
      // Get top rated or most enrolled courses
      const sorted = res.data
        .sort((a, b) => (b.averageRating || b.rating || 0) - (a.averageRating || a.rating || 0))
        .slice(0, 6);
      setFeaturedCourses(sorted);
    } catch (error) {
      console.error('Failed to fetch courses');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    { name: 'Web Development', icon: '💻', color: 'bg-blue-500' },
    { name: 'Data Science', icon: '📊', color: 'bg-green-500' },
    { name: 'Graphic Design', icon: '🎨', color: 'bg-purple-500' },
    { name: 'Business', icon: '💼', color: 'bg-yellow-500' },
    { name: 'Marketing', icon: '📈', color: 'bg-red-500' },
    { name: 'Photography', icon: '📷', color: 'bg-pink-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Learn Without Limits | Arisiumlearn</title>
        <meta name="description" content="Start, switch, or advance your career with thousands of courses, professional certificates, and degrees from world-class instructors." />
        <meta name="keywords" content="online courses, e-learning, education, learn online, courses" />
        <meta property="og:title" content="Learn Without Limits | Arisiumlearn" />
        <meta property="og:description" content="Start your learning journey with thousands of courses from expert instructors." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Learn Without Limits
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Start, switch, or advance your career with thousands of courses, professional certificates, and degrees from world-class instructors.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="flex rounded-lg overflow-hidden shadow-2xl">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to learn today?"
                  className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-800 px-8 py-4 hover:bg-primary-900 transition"
                >
                  <FaSearch className="text-2xl" />
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/courses')}
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/signup')}
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Start Learning Free
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <Link
              to="/courses"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center"
            >
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ minWidth: 'max-content' }}>
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={course._id || index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <Link to={`/course/${course._id}`}>
                    <div className="relative h-48">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold">
                            {(course.averageRating || course.rating || 0).toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({(course.totalRatings || course.numReviews || 0)})
                          </span>
                        </div>
                        <span className="text-lg font-bold text-primary-600">
                          ₹{course.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={`/courses?category=${encodeURIComponent(category.name)}`}
                  className="block bg-white rounded-xl p-6 text-center hover:shadow-xl transition shadow-md"
                >
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become an Instructor CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Become an Instructor</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Teach what you love. Arisiumlearn gives you the tools to create an online course.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/signup?role=instructor')}
            className="border-white text-white hover:bg-white hover:text-primary-600"
          >
            Start Teaching Today
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Software Developer',
                text: 'This platform has transformed my career. The courses are well-structured and the instructors are amazing!',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Data Scientist',
                text: 'The best investment I\'ve made in my professional development. Highly recommend!',
                rating: 5
              },
              {
                name: 'Emily Rodriguez',
                role: 'Graphic Designer',
                text: 'Flexible learning, great content, and excellent support. Exactly what I needed!',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default HomePage;

