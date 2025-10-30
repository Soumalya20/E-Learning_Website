import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesAPI } from '../services/api';
import { toast } from 'react-hot-toast';
import { FaCheck, FaLock, FaChevronRight } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await coursesAPI.getById(id);
      setCourse(res.data);
      if (res.data.chapters && res.data.chapters.length > 0) {
        setActiveChapter(0);
      }
    } catch (error) {
      toast.error('Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course || !course.chapters || course.chapters.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No content available</h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700">
            Browse other courses
          </Link>
        </div>
      </div>
    );
  }

  const currentChapter = course.chapters[activeChapter];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <div className="lg:w-2/3 bg-black">
          <div className="sticky top-0 bg-gray-900 p-4 lg:p-8">
            {currentChapter?.videoUrl ? (
              <ReactPlayer
                url={currentChapter.videoUrl}
                controls
                width="100%"
                height="100%"
                className="react-player"
              />
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Video content coming soon</p>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-8 bg-white">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {currentChapter?.title}
            </h1>
            <p className="text-gray-600">{currentChapter?.description}</p>
          </div>
        </div>

        {/* Chapters List */}
        <div className="lg:w-1/3 bg-white border-l border-gray-200 max-h-screen overflow-y-auto">
          <div className="p-6 bg-primary-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Course Content</h2>
            <p className="text-primary-100">{course.chapters.length} chapters</p>
          </div>

          <div className="divide-y divide-gray-200">
            {course.chapters.map((chapter, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveChapter(index)}
                className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                  activeChapter === index ? 'bg-primary-50 border-l-4 border-primary-600' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{chapter.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{chapter.duration}</p>
                    </div>
                  </div>
                  {index < activeChapter ? (
                    <FaCheck className="text-green-500 mt-1" />
                  ) : (
                    <FaChevronRight className="text-gray-400 mt-1" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;






