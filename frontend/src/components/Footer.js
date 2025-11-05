import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <FaBook className="text-2xl" />
              <span className="text-xl font-bold">Arisiumlearn</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner in online education. Learn at your own pace, anywhere, anytime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Facebook">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Twitter">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Students</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition">Browse Courses</Link></li>
              <li><Link to="/signup" className="text-gray-400 hover:text-white transition">Sign Up</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Instructors</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/signup?role=instructor" className="text-gray-400 hover:text-white transition">Teach on Arisiumlearn</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Instructor Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 Arisiumlearn. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for learners worldwide</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






