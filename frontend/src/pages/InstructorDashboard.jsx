import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { instructorAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaChartLine, FaUsers, FaDollarSign, FaStar } from 'react-icons/fa';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';

const InstructorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'instructor' && user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, analyticsRes] = await Promise.all([
        instructorAPI.getMyCourses(),
        instructorAPI.getAnalytics()
      ]);
      setCourses(coursesRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      label: 'My Courses',
      content: (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Courses</h2>
            <Button onClick={() => navigate('/create-course')}>
              <FaPlus className="mr-2" /> Create New Course
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
              <Button onClick={() => navigate('/create-course')}>
                Create Your First Course
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-12 object-cover rounded mr-4"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">{course.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            course.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : course.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : course.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {course.status || 'draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {course.studentsEnrolled || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm">
                            {(course.averageRating || course.rating || 0).toFixed(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/create-course?edit=${course._id}`}
                          className="text-primary-600 hover:text-primary-700"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )
    },
    {
      label: 'Analytics',
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Analytics</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : analytics ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Courses</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalCourses}</p>
                  </div>
                  <div className="bg-primary-100 p-3 rounded-full">
                    <FaChartLine className="text-primary-600 text-2xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.totalStudents}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaUsers className="text-green-600 text-2xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">₹{analytics.totalRevenue || 0}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <FaDollarSign className="text-yellow-600 text-2xl" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900">{analytics.averageRating || 0}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaStar className="text-purple-600 text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No analytics data available</p>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Instructor Dashboard</h1>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default InstructorDashboard;

