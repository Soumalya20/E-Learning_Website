import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';
import { coursesAPI } from '../services/api';

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formType, setFormType] = useState('enroll'); // 'enroll' or 'masterclass'
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseId: '',
    experienceLevel: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await coursesAPI.getAll();
      // Handle both array and object response
      const coursesData = Array.isArray(res.data) ? res.data : (res.data?.data || res.data || []);
      setCourses(coursesData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setCourses([]);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formType === 'enroll') {
      if (!formData.courseId) {
        toast.error('Please select a course');
        return;
      }
      if (!formData.experienceLevel) {
        toast.error('Please select your experience level');
        return;
      }
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const password = formData.password || 'temp123456';
      await signup(formData.name, formData.email, password, formData.role);
      
      if (formType === 'enroll') {
        toast.success('Course enrollment successful! Check your email for access details.');
      } else {
        toast.success('Masterclass booking successful! Check your email for details.');
      }
      
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | Arisiumlearn</title>
        <meta name="description" content="Join Arisiumlearn to start your learning journey. Enroll in courses or book a free masterclass. Get access to live sessions, internships, and career support." />
        <meta name="keywords" content="sign up, register, enroll, e-learning, online courses, masterclass" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-white py-6 px-4 flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column - Benefits Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-6 space-y-4"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center lg:text-left">
                Why Choose Us
              </h3>
              <div className="space-y-5">
                {/* Live Instruction Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-4 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Live Instruction</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Learn from industry experts in real-time sessions
                    </p>
                  </div>
                </motion.div>

                {/* Guaranteed Internship Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Guaranteed Internship</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Access to 1-6 month internship opportunities
                    </p>
                  </div>
                </motion.div>

                {/* Career Support Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4 group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-gray-900 mb-1">Career Support</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Dedicated placement and interview preparation
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form Section */}
          <div className="lg:col-span-2">
            {/* Introductory Text */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-4"
            >
              <p className="text-base text-gray-700 font-medium">
                Choose to enroll in a full course or book a free masterclass to explore our teaching style.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center gap-3 mb-6"
            >
              <button
                type="button"
                onClick={() => setFormType('enroll')}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105 ${
                  formType === 'enroll'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                Enroll in Course
              </button>
              <button
                type="button"
                onClick={() => setFormType('masterclass')}
                className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105 ${
                  formType === 'masterclass'
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-600 hover:text-primary-600'
                }`}
              >
                Book Masterclass
              </button>
            </motion.div>

            {/* Course Enrollment Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Enrollment
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                      placeholder="John Doe"
                      required
                    />
                  </motion.div>

                  {/* Email Address */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                      placeholder="john@example.com"
                      required
                    />
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-primary-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </motion.div>

                  {/* Select Course - Only for enrollment */}
                  <AnimatePresence>
                    {formType === 'enroll' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Select Course <span className="text-primary-600">*</span>
                        </label>
                        <select
                          name="courseId"
                          value={formData.courseId}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400 appearance-none cursor-pointer"
                          required={formType === 'enroll'}
                        >
                          <option value="">Choose a course...</option>
                          {courses.map((course) => (
                            <option key={course._id} value={course._id}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Experience Level - Only for enrollment */}
                  <AnimatePresence>
                    {formType === 'enroll' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Experience Level <span className="text-primary-600">*</span>
                        </label>
                        <select
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400 appearance-none cursor-pointer"
                          required={formType === 'enroll'}
                        >
                          <option value="">Select your experience level...</option>
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Password - Only for enrollment */}
                  <AnimatePresence>
                    {formType === 'enroll' && (
                      <motion.div
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Password <span className="text-primary-600">*</span>
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                          placeholder="Create a password"
                          autoComplete="new-password"
                          required={formType === 'enroll'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Confirm Password - Only for enrollment */}
                  <AnimatePresence>
                    {formType === 'enroll' && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                          Confirm Password <span className="text-primary-600">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                          required={formType === 'enroll'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Next Steps Information */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong className="text-gray-900">Next Steps:</strong> After enrollment, you'll receive an email with course access details and login information. Join our first live session within 24 hours.
                  </p>
                </motion.div>

                {/* Complete Enrollment Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-3"
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-3 text-sm font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? 'Processing...' : formType === 'enroll' ? 'Complete Enrollment' : 'Book Masterclass'}
                  </button>
                </motion.div>
              </form>
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center mt-4"
            >
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                  Sign In
                </Link>
              </p>
            </motion.div>
          </div>
        </div>

        {/* Vercel Badge */}
        <div className="fixed bottom-4 right-4 z-10">
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg"
          >
            <span>Built with</span>
            <svg width="16" height="16" viewBox="0 0 76 65" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
            </svg>
            <span>Vercel</span>
          </a>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
