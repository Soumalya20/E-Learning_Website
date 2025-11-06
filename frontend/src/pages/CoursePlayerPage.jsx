import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { coursesAPI, progressAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaCheck, FaChevronLeft, FaChevronRight, FaBars, FaTimes } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import Accordion from '../components/ui/Accordion';
import Button from '../components/ui/Button';

const CoursePlayerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    if (user) {
      fetchProgress();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await coursesAPI.getById(id);
      setCourse(res.data);
      if (res.data.modules && res.data.modules.length > 0) {
        setActiveModuleIndex(0);
        setActiveLessonIndex(0);
      }
    } catch (error) {
      toast.error('Failed to fetch course');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    if (!user) return;
    try {
      const res = await progressAPI.getProgress(id);
      setProgress(res.data);
      if (res.data.lastAccessedLesson) {
        setActiveModuleIndex(res.data.lastAccessedLesson.moduleIndex || 0);
        setActiveLessonIndex(res.data.lastAccessedLesson.lessonIndex || 0);
      }
    } catch (error) {
      console.error('Failed to fetch progress');
    }
  };

  const markLessonComplete = async (moduleIdx, lessonIdx) => {
    if (!user) return;
    const lessonId = `${moduleIdx}-${lessonIdx}`;
    try {
      await progressAPI.markComplete(id, lessonId);
      await fetchProgress();
      toast.success('Lesson marked as complete!');
    } catch (error) {
      toast.error('Failed to mark lesson as complete');
    }
  };

  const isLessonComplete = (moduleIdx, lessonIdx) => {
    if (!progress) return false;
    const lessonId = `${moduleIdx}-${lessonIdx}`;
    return progress.completedLessons?.includes(lessonId);
  };

  const navigateLesson = (direction) => {
    if (!course || !course.modules || course.modules.length === 0) return;

    const currentModule = course.modules[activeModuleIndex];
    
    if (direction === 'next') {
      if (activeLessonIndex < currentModule.lessons.length - 1) {
        setActiveLessonIndex(activeLessonIndex + 1);
      } else if (activeModuleIndex < course.modules.length - 1) {
        setActiveModuleIndex(activeModuleIndex + 1);
        setActiveLessonIndex(0);
      }
    } else {
      if (activeLessonIndex > 0) {
        setActiveLessonIndex(activeLessonIndex - 1);
      } else if (activeModuleIndex > 0) {
        setActiveModuleIndex(activeModuleIndex - 1);
        const prevModule = course.modules[activeModuleIndex - 1];
        setActiveLessonIndex(prevModule.lessons.length - 1);
      }
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses" className="text-primary-600 hover:text-primary-700">
            Browse courses
          </Link>
        </div>
      </div>
    );
  }

  const hasModules = course.modules && course.modules.length > 0;
  const currentModule = hasModules ? course.modules[activeModuleIndex] : null;
  const currentLesson = currentModule?.lessons[activeLessonIndex];

  // If using old chapters structure
  if (!hasModules && course.chapters && course.chapters.length > 0) {
    const currentChapter = course.chapters[activeModuleIndex];
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 bg-black">
            <div className="sticky top-0 bg-gray-900 p-4 lg:p-8">
              {currentChapter?.videoUrl ? (
                <ReactPlayer url={currentChapter.videoUrl} controls width="100%" height="100%" />
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
          <div className="lg:w-1/3 bg-white border-l border-gray-200 max-h-screen overflow-y-auto">
            <div className="p-6 bg-primary-600 text-white">
              <h2 className="text-2xl font-bold mb-2">Course Content</h2>
              <p className="text-primary-100">{course.chapters.length} chapters</p>
            </div>
            <div className="divide-y divide-gray-200">
              {course.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveModuleIndex(index)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition ${
                    activeModuleIndex === index ? 'bg-primary-50 border-l-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{chapter.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{chapter.duration}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasModules || !currentLesson) {
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

  // Prepare accordion items for sidebar
  const accordionItems = course.modules.map((module, moduleIdx) => ({
    title: `${module.title} (${module.lessons.length} lessons)`,
    content: (
      <div className="space-y-2">
        {module.lessons.map((lesson, lessonIdx) => {
          const isComplete = isLessonComplete(moduleIdx, lessonIdx);
          const isActive = moduleIdx === activeModuleIndex && lessonIdx === activeLessonIndex;
          return (
            <button
              key={lessonIdx}
              onClick={() => {
                setActiveModuleIndex(moduleIdx);
                setActiveLessonIndex(lessonIdx);
              }}
              className={`w-full text-left flex items-center justify-between py-2 px-2 rounded hover:bg-gray-100 transition ${
                isActive ? 'bg-primary-50 text-primary-700' : ''
              }`}
            >
              <div className="flex items-center flex-1">
                <span className="mr-3 text-sm">
                  {lesson.type === 'Video' ? '▶' : lesson.type === 'Article' ? '📄' : '❓'}
                </span>
                <span className="text-sm flex-1">{lesson.title}</span>
              </div>
              <div className="flex items-center">
                {lesson.duration && (
                  <span className="text-xs text-gray-500 mr-2">{lesson.duration} min</span>
                )}
                {isComplete && <FaCheck className="text-green-500" />}
              </div>
            </button>
          );
        })}
      </div>
    )
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-600"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{course.title}</h1>
          </div>
          <Link
            to={`/course/${id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
          >
            Course Details
          </Link>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="lg:w-2/3 bg-black">
          <div className="sticky top-16 bg-gray-900 p-4 lg:p-8">
            {currentLesson.type === 'Video' && currentLesson.content ? (
              <ReactPlayer
                url={currentLesson.content}
                controls
                width="100%"
                height="100%"
                onEnded={() => {
                  if (user) {
                    markLessonComplete(activeModuleIndex, activeLessonIndex);
                  }
                }}
              />
            ) : currentLesson.type === 'Article' ? (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto max-h-[70vh] overflow-y-auto">
                  <div
                    className="prose prose-lg"
                    dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                  />
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Quiz content coming soon</p>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-8 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {currentLesson.title}
              </h1>
              {user && (
                <Button
                  variant={isLessonComplete(activeModuleIndex, activeLessonIndex) ? 'secondary' : 'primary'}
                  onClick={() => markLessonComplete(activeModuleIndex, activeLessonIndex)}
                >
                  {isLessonComplete(activeModuleIndex, activeLessonIndex) ? (
                    <>
                      <FaCheck className="mr-2" /> Completed
                    </>
                  ) : (
                    'Mark as Complete'
                  )}
                </Button>
              )}
            </div>
            <p className="text-gray-600 mb-6">
              {currentModule.title} • Lesson {activeLessonIndex + 1} of {currentModule.lessons.length}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => navigateLesson('prev')}
                disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
              >
                <FaChevronLeft className="mr-2" /> Previous
              </Button>
              <Button
                variant="primary"
                onClick={() => navigateLesson('next')}
                disabled={
                  activeModuleIndex === course.modules.length - 1 &&
                  activeLessonIndex === currentModule.lessons.length - 1
                }
              >
                Next <FaChevronRight className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`lg:w-1/3 bg-white border-l border-gray-200 max-h-[calc(100vh-64px)] overflow-y-auto ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="p-6 bg-primary-600 text-white">
            <h2 className="text-2xl font-bold mb-2">Course Content</h2>
            <p className="text-primary-100">
              {progress?.progressPercentage || 0}% Complete
            </p>
          </div>

          <div className="p-4">
            <Accordion items={accordionItems} allowMultiple={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayerPage;

