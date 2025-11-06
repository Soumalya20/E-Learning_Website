import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { FaStar, FaUsers, FaClock, FaFilter } from 'react-icons/fa';
import Button from '../components/ui/Button';

const CourseDiscoveryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    level: searchParams.get('level') || '',
    rating: searchParams.get('rating') || '',
    price: searchParams.get('price') || '',
    sort: searchParams.get('sort') || 'newest'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['Web Development', 'Data Science', 'Graphic Design', 'Business', 'Marketing', 'Photography'];
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const ratings = ['4.5_above', '4.0_above', '3.5_above', '3.0_above'];
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' }
  ];

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const params = { ...filters };
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });
      
      const res = await coursesAPI.search(params);
      setCourses(res.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch courses';
      toast.error(errorMessage);
      setCourses([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    setSearchParams(newFilters);
  };

  const clearFilters = () => {
    const cleared = { q: '', category: '', level: '', rating: '', price: '', sort: 'newest' };
    setFilters(cleared);
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Discover Courses</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Search</label>
                <input
                  type="text"
                  value={filters.q}
                  onChange={(e) => handleFilterChange('q', e.target.value)}
                  placeholder="Search courses..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.category === cat}
                        onChange={() => handleFilterChange('category', filters.category === cat ? '' : cat)}
                        className="mr-2"
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Level</label>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        name="level"
                        checked={filters.level === level}
                        onChange={() => handleFilterChange('level', level)}
                        className="mr-2"
                      />
                      <span className="text-sm">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Rating</label>
                <div className="space-y-2">
                  {ratings.map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="mr-2"
                      />
                      <span className="text-sm">
                        {rating.replace('_above', '')} ⭐ and above
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Price</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.price === 'free'}
                      onChange={() => handleFilterChange('price', 'free')}
                      className="mr-2"
                    />
                    <span className="text-sm">Free</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="price"
                      checked={filters.price === 'paid'}
                      onChange={() => handleFilterChange('price', 'paid')}
                      className="mr-2"
                    />
                    <span className="text-sm">Paid</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {courses.length} courses found
              </span>
              <select
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Courses Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow">
                <p className="text-xl text-gray-600">No courses found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
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
                        <div className="flex items-center mb-2">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold">
                            {(course.averageRating || course.rating || 0).toFixed(1)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            ({(course.totalRatings || course.numReviews || 0)})
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            <FaUsers className="mr-1" />
                            <span>{course.studentsEnrolled || 0}</span>
                          </div>
                          {course.duration && (
                            <div className="flex items-center">
                              <FaClock className="mr-1" />
                              <span>{course.duration}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary-600">
                            ₹{course.price === 0 ? 'Free' : course.price}
                          </span>
                          <span className="text-sm text-gray-500">{course.level}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDiscoveryPage;

