import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FaBars, FaTimes, FaUser, FaBook, FaSignOutAlt, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { items: cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close mobile menu
    navigate('/');
  };

  return (
    <nav className="bg-surface shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="text-primary-600 text-2xl" />
            <span className="text-xl font-bold text-gray-900">Arisiumlearn</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `pb-1 transition ${isActive ? 'text-accent-600 border-b-2 border-accent-600' : 'text-gray-700 hover:text-primary-600'}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `pb-1 transition ${isActive ? 'text-accent-600 border-b-2 border-accent-600' : 'text-gray-700 hover:text-primary-600'}`
              }
            >
              Courses
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) =>
                `relative pb-1 transition ${isActive ? 'text-accent-600 border-b-2 border-accent-600' : 'text-gray-700 hover:text-primary-600'}`
              }>
              Cart
              {cartItems?.length ? (
                <span className="absolute -top-2 -right-3 bg-primary-600 text-white text-xs rounded-full px-1.5">{cartItems.length}</span>
              ) : null}
            </NavLink>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/my-courses" className={({ isActive }) => `pb-1 transition ${isActive ? 'text-accent-600 border-b-2 border-accent-600' : 'text-gray-700 hover:text-primary-600'}`}>My Courses</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => `pb-1 transition ${isActive ? 'text-accent-600 border-b-2 border-accent-600' : 'text-gray-700 hover:text-primary-600'}`}>Dashboard</NavLink>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <FaUser />
                    <span>{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    {user.role === 'instructor' && (
                      <Link to="/create-course" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Course</Link>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">Login</Link>
                <Link to="/signup" className="bg-accent-600 text-white px-4 py-2 rounded-lg hover:bg-accent-700 transition">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</Link>
            <Link to="/courses" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Courses</Link>
            {user ? (
              <>
                <Link to="/my-courses" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">My Courses</Link>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Cart{cartItems?.length ? ` (${cartItems.length})` : ''}</Link>
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Dashboard</Link>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Profile</Link>
                {user.role === 'instructor' && (
                  <Link to="/create-course" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Create Course</Link>
                )}
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Login</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;






