import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaArrowRight } from 'react-icons/fa';
import { coursesAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      const res = await coursesAPI.getAll();
      // Handle both array and object response
      const coursesData = Array.isArray(res.data) ? res.data : (res.data?.data || res.data || []);
      // Get top rated or most enrolled courses
      const sorted = coursesData
        .sort((a, b) => (b.averageRating || b.rating || 0) - (a.averageRating || a.rating || 0))
        .slice(0, 6);
      setFeaturedCourses(sorted);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setFeaturedCourses([]);
    }
  };

  const categories = [
    { name: 'Web Development', icon: '💻', color: 'bg-primary-500' },
    { name: 'Data Science', icon: '📊', color: 'bg-accent-500' },
    { name: 'Graphic Design', icon: '🎨', color: 'bg-primary-700' },
    { name: 'Business', icon: '💼', color: 'bg-accent-600' },
    { name: 'Marketing', icon: '📈', color: 'bg-primary-600' },
    { name: 'Photography', icon: '📷', color: 'bg-accent-700' },
  ];

  const carouselCourses = useMemo(() => {
    if (!featuredCourses.length) return [];
    return [...featuredCourses, ...featuredCourses];
  }, [featuredCourses]);

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
        <section className="relative bg-gradient-to-br from-white via-primary-50/30 to-white min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Headline and CTA */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="space-y-5"
              >
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                    <span className="block text-primary-700">Learn what AI can't</span>
                    <span className="block text-gray-900 font-black">replace.</span>
                    <span className="block text-primary-700">Master</span>
                    <span className="block text-gray-900 font-black">what makes you</span>
                    <span className="block text-gray-900 font-black">human.</span>
                  </h1>
                  
                  <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                    We help you grow with AI, not against it. Gain the skills, confidence,
                    and edge you need to thrive in an AI-powered world.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="group relative px-6 py-3 text-base font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2 rounded-xl" 
                    onClick={() => navigate('/courses')}
                  >
                    <span>Explore Now</span>
                    <FaArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-6 py-3 text-base font-semibold border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white hover:border-primary-600 shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-105 rounded-xl" 
                    onClick={() => navigate('/about')}
                  >
                    Learn More
                  </Button>
                </div>

                {/* Built for the Future Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-4 space-y-2"
                >
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Built for the Future</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-100 text-primary-700 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                      Live Sessions
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                      1-6 Month Internship
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                      Placement Support
                    </span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Path to Growth Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 rounded-3xl p-6 md:p-8 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden">
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">
                      Your Path to Growth
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      {/* Step 1 */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-white/30 group-hover:bg-white/35 transition-colors duration-200">
                          1
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h3 className="text-lg md:text-xl font-bold mb-1">Build</h3>
                          <p className="text-white/95 text-sm md:text-base leading-relaxed">Skills that stay relevant with AI-powered foundation</p>
                        </div>
                      </motion.div>

                      {/* Step 2 */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-white/30 group-hover:bg-white/35 transition-colors duration-200">
                          2
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h3 className="text-lg md:text-xl font-bold mb-1">Create</h3>
                          <p className="text-white/95 text-sm md:text-base leading-relaxed">Imagination meets AI assistance for your success</p>
                        </div>
                      </motion.div>

                      {/* Step 3 */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-white/30 group-hover:bg-white/35 transition-colors duration-200">
                          3
                        </div>
                        <div className="flex-1 pt-0.5">
                          <h3 className="text-lg md:text-xl font-bold mb-1">Grow</h3>
                          <p className="text-white/95 text-sm md:text-base leading-relaxed">Smart automation meets human insight</p>
                        </div>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="w-full bg-white text-primary-700 hover:bg-gray-50 font-bold text-base py-3 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] rounded-xl border-0" 
                        onClick={() => navigate('/contact')}
                      >
                        Book A Free Masterclass Now
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <Link
              to="/courses"
              className="text-accent-600 hover:text-accent-700 font-semibold flex items-center"
            >
              View All <FaArrowRight className="ml-2" />
            </Link>
          </div>
          
          <div className="auto-scroll-container pt-2 pb-6">
            <div className="auto-scroll-track">
              {carouselCourses.map((course, index) => (
                <motion.div
                  key={`${course._id || index}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % (featuredCourses.length || 1)) * 0.1 }}
                  className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-200 hover:scale-105"
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
      <section className="py-16 bg-surface">
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
                  className="block bg-white rounded-xl p-6 text-center hover:shadow-xl transition-transform duration-200 hover:scale-105 shadow-md min-h-[200px] flex flex-col items-center justify-center"
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
          <Button variant="accent" size="lg" className="border border-accent-700 shadow-md hover:shadow-xl transform transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105" onClick={() => navigate('/signup?role=instructor')}>
            Start Teaching Today
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-surface">
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
                className="bg-white p-6 rounded-xl"
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

