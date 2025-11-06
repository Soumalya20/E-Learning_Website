import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  signup: (name, email, password, role) => api.post('/auth/register', { name, email, password, role }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const coursesAPI = {
  getAll: () => api.get('/courses'),
  search: (params) => api.get('/courses/search', { params }),
  getById: (id) => api.get(`/courses/${id}`),
  create: (data) => api.post('/courses', data),
  update: (id, data) => api.put(`/courses/${id}`, data),
  delete: (id) => api.delete(`/courses/${id}`),
};

export const reviewsAPI = {
  create: (courseId, rating, comment) => api.post(`/courses/${courseId}/reviews`, { rating, comment }),
  getByCourse: (courseId) => api.get(`/courses/${courseId}/reviews`),
};

export const progressAPI = {
  markComplete: (courseId, lessonId) => api.post('/progress/mark-complete', { courseId, lessonId }),
  getProgress: (courseId) => api.get(`/progress/${courseId}`),
};

export const instructorAPI = {
  getMyCourses: () => api.get('/instructor/my-courses'),
  getAnalytics: () => api.get('/instructor/analytics'),
};

export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  updateUserRole: (id, role) => api.put(`/admin/user/${id}/role`, { role }),
  getAllCourses: () => api.get('/admin/courses'),
  updateCourseStatus: (id, status) => api.put(`/admin/course/${id}/status`, { status }),
};

export const paymentsAPI = {
  createOrder: (courseId) => api.post('/payments/create-order', { courseId }),
  verifyPayment: (data) => api.post('/payments/verify-payment', data),
  getEnrollments: () => api.get('/payments/my-enrollments'),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export default api;






