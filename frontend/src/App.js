import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const HomePage = lazy(() => import('./pages/HomePage'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDiscoveryPage = lazy(() => import('./pages/CourseDiscoveryPage'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CoursePlayer = lazy(() => import('./pages/CoursePlayer'));
const CoursePlayerPage = lazy(() => import('./pages/CoursePlayerPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const InstructorDashboard = lazy(() => import('./pages/InstructorDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const MyCourses = lazy(() => import('./pages/MyCourses'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Profile = lazy(() => import('./pages/Profile'));
const CreateCourse = lazy(() => import('./pages/CreateCourse'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home-old" element={<Home />} />
              <Route path="/courses" element={<CourseDiscoveryPage />} />
              <Route path="/courses-old" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/course/:id/old" element={<CourseDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/instructor-dashboard"
                element={
                  <ProtectedRoute>
                    <InstructorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin-dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-courses"
                element={
                  <ProtectedRoute>
                    <MyCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:id/learn"
                element={
                  <ProtectedRoute>
                    <CoursePlayerPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:id/learn-old"
                element={
                  <ProtectedRoute>
                    <CoursePlayer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-course"
                element={
                  <ProtectedRoute>
                    <CreateCourse />
                  </ProtectedRoute>
                }
              />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </Router>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;



