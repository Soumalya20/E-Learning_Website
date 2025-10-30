const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/elearning';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Check if courses already exist
    const existingCourses = await Course.countDocuments();
    if (existingCourses > 0) {
      console.log('✅ Courses already exist in database');
      process.exit(0);
    }

    // Create a default instructor if doesn't exist
    let instructor = await User.findOne({ email: 'instructor@example.com' });
    
    if (!instructor) {
      instructor = new User({
        name: 'John Instructor',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor'
      });
      await instructor.save();
      console.log('✅ Created default instructor');
    }

    // Sample courses data
    const sampleCourses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development from scratch. Build modern, responsive websites using HTML, CSS, JavaScript, React, and Node.js.',
        instructor: instructor._id,
        price: 2999,
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        category: 'Web Development',
        rating: 4.8,
        numReviews: 1247,
        studentsEnrolled: 15234,
        duration: '45 hours',
        level: 'Beginner',
        language: 'English',
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
        title: 'Data Science with Python',
        description: 'Master data science using Python. Learn pandas, numpy, matplotlib, and machine learning algorithms.',
        instructor: instructor._id,
        price: 3499,
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
        category: 'Data Science',
        rating: 4.7,
        numReviews: 892,
        studentsEnrolled: 11245,
        duration: '60 hours',
        level: 'Intermediate',
        language: 'English',
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
        title: 'Graphic Design Masterclass',
        description: 'Learn professional graphic design skills including logo design, branding, and visual communication.',
        instructor: instructor._id,
        price: 2499,
        thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400',
        category: 'Graphic Design',
        rating: 4.9,
        numReviews: 634,
        studentsEnrolled: 8721,
        duration: '40 hours',
        level: 'Beginner',
        language: 'English',
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
        title: 'Business Management Fundamentals',
        description: 'Learn essential business management skills including strategy, operations, and leadership.',
        instructor: instructor._id,
        price: 1999,
        thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',
        category: 'Business',
        rating: 4.6,
        numReviews: 445,
        studentsEnrolled: 5432,
        duration: '35 hours',
        level: 'Beginner',
        language: 'English',
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
        title: 'Digital Marketing Mastery',
        description: 'Master digital marketing including SEO, social media marketing, email marketing, and paid advertising.',
        instructor: instructor._id,
        price: 2799,
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
        category: 'Marketing',
        rating: 4.8,
        numReviews: 678,
        studentsEnrolled: 9876,
        duration: '50 hours',
        level: 'Intermediate',
        language: 'English',
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

    // Insert courses
    await Course.insertMany(sampleCourses);
    console.log(`✅ Successfully added ${sampleCourses.length} courses to database`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();




