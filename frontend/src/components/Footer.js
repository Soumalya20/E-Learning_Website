import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBook className="text-2xl" />
              <span className="text-xl font-bold">E-Learn</span>
            </div>
            <p className="text-gray-400 text-sm">Your trusted partner in online education. Learn at your own pace, anywhere, anytime.</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition">Courses</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Graphic Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Business</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 E-Learn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






