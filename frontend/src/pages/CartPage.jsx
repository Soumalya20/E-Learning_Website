import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { paymentsAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { FaTrash, FaShoppingCart, FaLock, FaCheckCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const CartPage = () => {
  const { items, removeItem, clear, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(null);

  const checkoutSingle = async (courseId) => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }
    
    setProcessing(courseId);
    try {
      const orderRes = await paymentsAPI.createOrder(courseId);
      const { orderId, amount } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount,
        currency: 'INR',
        name: 'Arisiumlearn',
        description: 'Course Purchase',
        order_id: orderId,
        handler: async (response) => {
          try {
            await paymentsAPI.verifyPayment({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              courseId,
            });
            toast.success('Payment successful! You are now enrolled.');
            removeItem(courseId);
            navigate(`/course/${courseId}/learn`);
          } catch (error) {
            toast.error('Payment verification failed');
          } finally {
            setProcessing(null);
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(null);
          }
        },
        theme: { color: '#2596be' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to start payment');
      setProcessing(null);
    }
  };

  if (!items.length) {
    return (
      <>
        <Helmet>
          <title>Your Cart | Arisiumlearn</title>
          <meta name="description" content="Your shopping cart is empty. Browse our courses to start learning." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-white py-12 px-4 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-primary-600 text-4xl" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any courses yet. Browse our courses to start your learning journey.
            </p>
            <Link
              to="/courses"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Browse Courses
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Your Cart (${items.length} ${items.length === 1 ? 'course' : 'courses'}) | Arisiumlearn`}</title>
        <meta name="description" content={`You have ${items.length} ${items.length === 1 ? 'course' : 'courses'} in your cart. Complete your purchase to start learning.`} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Cart</h1>
            <p className="text-gray-600">Review your selected courses before checkout</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={`/course/${course._id}`}
                        className="flex-shrink-0 w-full sm:w-48 h-32 rounded-lg overflow-hidden"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <Link to={`/course/${course._id}`}>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                              {course.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            {course.level && (
                              <span className="px-3 py-1 bg-gray-100 rounded-full">
                                {course.level}
                              </span>
                            )}
                            {course.category && (
                              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
                                {course.category}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                          <div>
                            <span className="text-2xl font-bold text-primary-600">
                              ₹{course.price === 0 ? 'Free' : course.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => {
                                removeItem(course._id);
                                toast.success('Course removed from cart');
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              aria-label="Remove course"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => checkoutSingle(course._id)}
                              disabled={processing === course._id}
                              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center gap-2"
                            >
                              {processing === course._id ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <FaLock className="text-sm" />
                                  Checkout
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-6 h-fit"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Items ({items.length})</span>
                    <span className="font-semibold">₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Processing Fee</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">₹{total}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={clear}
                    className="w-full px-4 py-2.5 text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Clear Cart
                  </button>
                  <p className="text-xs text-gray-500 text-center">
                    <FaCheckCircle className="inline mr-1 text-green-500" />
                    Secure checkout with Razorpay
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <strong className="text-gray-900">Note:</strong> Checkout is per-course. Each course will be processed separately for a secure transaction.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
