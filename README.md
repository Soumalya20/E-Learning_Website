# E-Learning Platform

A full-stack E-Learning platform built with React.js, Node.js, Express, MongoDB, and Razorpay payment integration.

## Features

- 🎓 **User Authentication**: Secure registration and login with JWT
- 📚 **Course Management**: Browse, create, and enroll in courses
- 💳 **Payment Integration**: Razorpay payment gateway for course enrollment
- 🎥 **Video Player**: Built-in video player for course content
- 👥 **Role-Based Access**: Student, Instructor, and Admin roles
- 📱 **Responsive Design**: Mobile-first, fully responsive UI
- ✨ **Modern UI**: Beautiful animations with Framer Motion
- ⚡ **Fast & Smooth**: Optimized for performance

## Tech Stack

### Backend
- Node.js & Express
- MongoDB
- JWT Authentication
- Razorpay Integration
- bcryptjs for password hashing

### Frontend
- React.js 18
- React Router
- Axios
- Framer Motion
- Tailwind CSS
- React Player
- React Hot Toast

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Razorpay account with API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-learning-site
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**

   Backend (create `backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/elearning
   JWT_SECRET=your_jwt_secret_key_here
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   NODE_ENV=development
   ```

   Frontend (create `frontend/.env`):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

5. **Start MongoDB**
   - Ensure MongoDB is running on your system
   - Or configure MongoDB Atlas connection string in backend/.env

6. **Run the Application**

   Backend (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```

   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

7. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

```
e-learning-site/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   └── Enrollment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   ├── payments.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Instructor only)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Payments
- `POST /api/payments/create-order` - Create Razorpay order
- `POST /api/payments/verify-payment` - Verify payment
- `GET /api/payments/my-enrollments` - Get user enrollments

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## Features

### For Students
- Browse courses
- View course details
- Enroll in courses
- Watch video content
- Track learning progress
- View enrolled courses

### For Instructors
- Create courses
- Update course content
- View course enrollments
- Manage course details

## Payment Integration

The application uses Razorpay for payment processing:
1. Student enrolls in a course
2. Order is created on Razorpay
3. Payment is processed
4. Enrollment is verified and confirmed

## Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Secure payment verification

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@elearning.com or create an issue in the repository.






