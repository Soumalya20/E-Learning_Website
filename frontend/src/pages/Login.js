import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      const message = error.response?.data?.message;
      toast.error(message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Arisiumlearn</title>
        <meta name="description" content="Login to your Arisiumlearn account to continue your learning journey. Access your enrolled courses and track your progress." />
        <meta name="keywords" content="login, sign in, e-learning, online courses, account" />
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
                Welcome Back
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
                    <h4 className="text-base font-bold text-gray-900 mb-1">Continue Learning</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Access your enrolled courses and track your progress
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
                    <h4 className="text-base font-bold text-gray-900 mb-1">Save Progress</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Your learning journey is automatically saved
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
                    <h4 className="text-base font-bold text-gray-900 mb-1">Get Certificates</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Earn certificates upon course completion
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Login Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Login to continue your learning journey</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-primary-600">*</span>
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                      placeholder="Enter your email"
                      required
                      autoComplete="email"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password <span className="text-primary-600">*</span>
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-primary-400"
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 text-white py-3 text-base font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                    Sign Up
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
