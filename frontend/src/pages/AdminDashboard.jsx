import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaCheck, FaTimes, FaUserShield } from 'react-icons/fa';
import Tabs from '../components/ui/Tabs';
import Button from '../components/ui/Button';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== 'admin') {
      window.location.href = '/';
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes] = await Promise.all([
        adminAPI.getAllUsers(),
        adminAPI.getAllCourses()
      ]);
      setUsers(usersRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await adminAPI.updateUserRole(userId, newRole);
      toast.success('User role updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update user role');
    }
  };

  const handleUpdateCourseStatus = async (courseId, status) => {
    try {
      await adminAPI.updateCourseStatus(courseId, status);
      toast.success('Course status updated');
      fetchData();
    } catch (error) {
      toast.error('Failed to update course status');
    }
  };

  const tabs = [
    {
      label: 'User Management',
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            user.role === 'admin'
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'instructor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleUpdateUserRole(user._id, e.target.value)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
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
      label: 'Course Management',
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Management</h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
                      <td className="px-6 py-4 text-gray-600">
                        {course.instructor?.name || 'Unknown'}
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
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          {course.status !== 'approved' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleUpdateCourseStatus(course._id, 'approved')}
                            >
                              <FaCheck className="mr-1" /> Approve
                            </Button>
                          )}
                          {course.status !== 'rejected' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleUpdateCourseStatus(course._id, 'rejected')}
                            >
                              <FaTimes className="mr-1" /> Reject
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <FaUserShield className="text-4xl text-primary-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default AdminDashboard;

