import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { coursesAPI, paymentsAPI, reviewsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { FaStar, FaUsers, FaClock, FaCheck, FaPlay, FaUser, FaShieldAlt } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import Accordion from '../components/ui/Accordion';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addItem } = useCart();
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
    fetchReviews();
    if (user) {
      checkEnrollment();
    }
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const res = await coursesAPI.getById(id);
      setCourse(res.data);
    } catch (error) {
      toast.error('Failed to fetch course details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await reviewsAPI.getByCourse(id);
      setReviews(res.data);
    } catch (error) {
      console.error('Failed to fetch reviews');
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

    if (course.price === 0) {
      // Free course - enroll directly
      try {
        await paymentsAPI.verifyPayment({
          orderId: 'free-' + Date.now(),
          paymentId: 'free',
          courseId: id,
          signature: 'free'
        });
        toast.success('You are now enrolled!');
        setEnrolled(true);
        navigate(`/course/${id}/learn`);
      } catch (error) {
        toast.error('Failed to enroll');
      }
      return;
    }

    try {
      const orderRes = await paymentsAPI.createOrder(id);
      const { orderId, amount } = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount,
        currency: 'INR',
        name: 'Arisiumlearn',
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

  const handleSubmitReview = async () => {
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    try {
      await reviewsAPI.create(id, rating, reviewComment);
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      setReviewComment('');
      fetchReviews();
      fetchCourseDetails(); // Refresh course to update ratings
    } catch (error) {
      toast.error('Failed to submit review');
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

  // Prepare accordion items for course content
  const accordionItems = course.modules && course.modules.length > 0
    ? course.modules.map((module, moduleIndex) => ({
        title: `${module.title} (${module.lessons.length} lessons)`,
        content: (
          <div className="space-y-2">
            {module.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center">
                  <span className="mr-3 text-sm text-gray-500">
                    {lesson.type === 'Video' ? '▶' : lesson.type === 'Article' ? '📄' : '❓'}
                  </span>
                  <span className="text-sm">{lesson.title}</span>
                </div>
                {lesson.type === 'Video' && lesson.duration && (
                  <span className="text-sm text-gray-500">{lesson.duration} min</span>
                )}
              </div>
            ))}
          </div>
        )
      }))
    : course.chapters?.map((chapter, index) => ({
        title: `${index + 1}. ${chapter.title}`,
        content: (
          <div>
            <p className="text-sm text-gray-600">{chapter.description}</p>
            {chapter.duration && (
              <p className="text-sm text-gray-500 mt-2">{chapter.duration}</p>
            )}
          </div>
        )
      })) || [];

  // Prepare tabs
  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(course.whatYouWillLearn || []).map((item, index) => (
                <li key={index} className="flex items-start">
                  <FaCheck className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Course Content</h3>
            <Accordion items={accordionItems} />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {(course.requirements || []).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{course.description}</p>
          </div>
        </div>
      )
    },
    {
      label: 'Instructor',
      content: (
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {course.instructor?.name?.charAt(0) || 'I'}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-2">{course.instructor?.name || 'Instructor'}</h3>
            <p className="text-gray-600 mb-4">{course.instructor?.email}</p>
            <p className="text-gray-700">
              Expert instructor with years of experience in the field.
            </p>
          </div>
        </div>
      )
    },
    {
      label: 'Reviews',
      content: (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="text-4xl font-bold mr-2">
                  {(course.averageRating || course.rating || 0).toFixed(1)}
                </span>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < Math.round(course.averageRating || course.rating || 0)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {(course.totalRatings || course.numReviews || 0)} ratings
                  </p>
                </div>
              </div>
            </div>
            {user && enrolled && !showReviewForm && (
              <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
            )}
          </div>

          {showReviewForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block mb-2">Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRating(r)}
                      className="mr-2"
                    >
                      <FaStar
                        className={`text-2xl ${
                          r <= rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-3 border rounded-lg mb-4"
                rows="4"
              />
              <div className="flex gap-2">
                <Button onClick={handleSubmitReview}>Submit Review</Button>
                <Button variant="secondary" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white mr-3">
                      {review.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold">{review.user?.name || 'Anonymous'}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-gray-700 mt-2">{review.comment}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      <Helmet>
        <title>{course.title} | Arisiumlearn</title>
        <meta name="description" content={course.description?.substring(0, 160)} />
        <meta name="keywords" content={`${course.title}, ${course.category}, online course, ${course.level}`} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.description?.substring(0, 160)} />
        <meta property="og:image" content={course.thumbnail} />
        <meta property="og:type" content="website" />
      </Helmet>
      <article className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description?.substring(0, 150)}...</p>
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400 mr-2" />
                  <span className="font-semibold">
                    {(course.averageRating || course.rating || 0).toFixed(1)}
                  </span>
                  <span className="text-gray-300 ml-2">
                    ({(course.totalRatings || course.numReviews || 0)})
                  </span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2" />
                  <span>{course.studentsEnrolled || 0} students</span>
                </div>
              </div>
              <p className="text-gray-300">
                Created by <span className="font-semibold">{course.instructor?.name || 'Instructor'}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <Tabs tabs={tabs} />
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Course Preview */}
                <div className="relative h-48 bg-gray-900">
                  {course.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaPlay className="text-white text-4xl" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition">
                      <FaPlay className="text-gray-900" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-3xl font-bold text-gray-900 mb-6">
                    ₹{course.price === 0 ? 'Free' : course.price}
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full mb-4"
                    onClick={handleEnroll}
                  >
                    {enrolled ? 'Continue Learning' : course.price === 0 ? 'Enroll Now' : 'Buy Now'}
                  </Button>

                  {course.price > 0 && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full mb-4"
                      onClick={() => {
                        addItem({ _id: course._id, title: course.title, price: course.price, thumbnail: course.thumbnail });
                        toast.success('Added to cart');
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}

                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <FaShieldAlt className="mr-2" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Level:</span>
                      <span className="font-semibold">{course.level || 'Beginner'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Language:</span>
                      <span className="font-semibold">{course.language || 'English'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{course.duration || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </article>
    </>
  );
};

export default CourseDetailPage;

