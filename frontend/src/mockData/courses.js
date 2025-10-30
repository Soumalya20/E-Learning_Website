// Mock courses data for testing without database
export const mockCourses = [
  {
    _id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn web development from scratch. Build modern, responsive websites using HTML, CSS, JavaScript, React, and Node.js.',
    price: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    category: 'Web Development',
    rating: 4.8,
    numReviews: 1247,
    studentsEnrolled: 15234,
    duration: '45 hours',
    level: 'Beginner',
    language: 'English',
    instructor: {
      name: 'John Instructor',
      email: 'instructor@example.com'
    },
    requirements: ['No prior experience required', 'Basic computer skills'],
    whatYouWillLearn: [
      'Build responsive websites with HTML and CSS',
      'Master JavaScript fundamentals',
      'Create dynamic web applications with React',
      'Build backend APIs with Node.js and Express'
    ],
    chapters: [
      {
        title: 'Introduction to Web Development',
        description: 'Get started with web development basics',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '2:15',
        order: 1
      },
      {
        title: 'HTML Fundamentals',
        description: 'Learn HTML structure and tags',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '3:30',
        order: 2
      },
      {
        title: 'CSS Styling',
        description: 'Style your web pages with CSS',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '4:20',
        order: 3
      }
    ]
  },
  {
    _id: '2',
    title: 'Data Science with Python',
    description: 'Master data science using Python. Learn pandas, numpy, matplotlib, and machine learning algorithms.',
    price: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    category: 'Data Science',
    rating: 4.7,
    numReviews: 892,
    studentsEnrolled: 11245,
    duration: '60 hours',
    level: 'Intermediate',
    language: 'English',
    instructor: {
      name: 'John Instructor',
      email: 'instructor@example.com'
    },
    requirements: ['Basic programming knowledge', 'Python basics recommended'],
    whatYouWillLearn: [
      'Master data manipulation with Pandas',
      'Perform data visualization',
      'Build machine learning models',
      'Analyze real-world datasets'
    ],
    chapters: [
      {
        title: 'Introduction to Data Science',
        description: 'Understanding data science workflow',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '2:45',
        order: 1
      },
      {
        title: 'Python for Data Analysis',
        description: 'Python libraries for data science',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '3:20',
        order: 2
      }
    ]
  },
  {
    _id: '3',
    title: 'Graphic Design Masterclass',
    description: 'Learn professional graphic design skills including logo design, branding, and visual communication.',
    price: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop',
    category: 'Graphic Design',
    rating: 4.9,
    numReviews: 634,
    studentsEnrolled: 8721,
    duration: '40 hours',
    level: 'Beginner',
    language: 'English',
    instructor: {
      name: 'John Instructor',
      email: 'instructor@example.com'
    },
    requirements: ['No experience needed', 'Access to design software'],
    whatYouWillLearn: [
      'Master Adobe Photoshop and Illustrator',
      'Create professional logos',
      'Design compelling brands',
      'Understand design principles'
    ],
    chapters: [
      {
        title: 'Introduction to Graphic Design',
        description: 'Design principles and fundamentals',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '2:30',
        order: 1
      }
    ]
  },
  {
    _id: '4',
    title: 'Business Management Fundamentals',
    description: 'Learn essential business management skills including strategy, operations, and leadership.',
    price: 1999,
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    category: 'Business',
    rating: 4.6,
    numReviews: 445,
    studentsEnrolled: 5432,
    duration: '35 hours',
    level: 'Beginner',
    language: 'English',
    instructor: {
      name: 'John Instructor',
      email: 'instructor@example.com'
    },
    requirements: ['No prior experience required'],
    whatYouWillLearn: [
      'Business strategy and planning',
      'Operations management',
      'Leadership and team management',
      'Financial management basics'
    ],
    chapters: [
      {
        title: 'Introduction to Business Management',
        description: 'Fundamentals of business management',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '3:00',
        order: 1
      }
    ]
  },
  {
    _id: '5',
    title: 'Digital Marketing Mastery',
    description: 'Master digital marketing including SEO, social media marketing, email marketing, and paid advertising.',
    price: 2799,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    category: 'Marketing',
    rating: 4.8,
    numReviews: 678,
    studentsEnrolled: 9876,
    duration: '50 hours',
    level: 'Intermediate',
    language: 'English',
    instructor: {
      name: 'John Instructor',
      email: 'instructor@example.com'
    },
    requirements: ['Basic understanding of business'],
    whatYouWillLearn: [
      'SEO optimization techniques',
      'Social media marketing strategies',
      'Email marketing campaigns',
      'Google Ads and Facebook Ads'
    ],
    chapters: [
      {
        title: 'Introduction to Digital Marketing',
        description: 'Digital marketing landscape',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '2:45',
        order: 1
      }
    ]
  }
];




