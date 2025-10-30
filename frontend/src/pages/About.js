import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaCertificate, FaAward, FaBook, FaGlobe } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: <FaUsers className="text-4xl text-primary-600" />, number: '50K+', label: 'Active Students' },
    { icon: <FaGraduationCap className="text-4xl text-primary-600" />, number: '1,200+', label: 'Expert Instructors' },
    { icon: <FaBook className="text-4xl text-primary-600" />, number: '10K+', label: 'Online Courses' },
    { icon: <FaCertificate className="text-4xl text-primary-600" />, number: '95%', label: 'Success Rate' }
  ];

  const features = [
    {
      icon: <FaGraduationCap className="text-3xl text-primary-600" />,
      title: 'Expert Instructors',
      description: 'Learn from industry experts with years of real-world experience and proven track records.'
    },
    {
      icon: <FaCertificate className="text-3xl text-primary-600" />,
      title: 'Certified Courses',
      description: 'Get recognized certificates upon completion that add value to your professional profile.'
    },
    {
      icon: <FaUsers className="text-3xl text-primary-600" />,
      title: 'Global Community',
      description: 'Join a vibrant community of learners from around the world and grow together.'
    },
    {
      icon: <FaGlobe className="text-3xl text-primary-600" />,
      title: 'Lifetime Access',
      description: 'Access your courses anytime, anywhere with lifetime access to all purchased content.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About E-Learn
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering learners worldwide with quality education accessible anytime, anywhere.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                {stat.icon}
                <h3 className="text-3xl font-bold text-gray-900 mt-4">{stat.number}</h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At E-Learn, we believe that education should be accessible to everyone, regardless of their location, schedule, or background. Our mission is to provide high-quality, affordable online courses that empower individuals to achieve their personal and professional goals.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We partner with industry experts and experienced instructors to bring you up-to-date, practical knowledge that you can apply immediately in your career or personal projects.
              </p>
              <p className="text-lg text-gray-600">
                Whether you're looking to advance in your current role, switch careers, or simply learn something new, E-Learn is here to support your learning journey.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-primary-600 rounded-xl p-8 text-white"
            >
              <FaAward className="text-6xl mb-6" />
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Expert-led courses with real-world applications</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Learn at your own pace with lifetime access</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Interactive content and hands-on projects</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Supportive community of learners</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Certificate of completion</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600">Everything you need for your learning journey</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Start Learning Today</h2>
            <p className="text-xl mb-8">Join thousands of students and start your journey</p>
            <a
              href="/signup"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Get Started Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;




