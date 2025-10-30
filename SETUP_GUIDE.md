# Quick Setup Guide

## Step-by-Step Installation

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Create Backend Environment File
Create a file named `.env` in the `backend` folder with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
NODE_ENV=development
```

**Important**: Replace the placeholder values with your actual credentials.

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Create Frontend Environment File
Create a file named `.env` in the `frontend` folder with the following content:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### 5. Start MongoDB
Make sure MongoDB is running on your system. If you're using MongoDB Atlas, update the connection string in `backend/.env`.

### 6. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Getting Razorpay API Keys

1. Go to https://razorpay.com/
2. Sign up or log in
3. Navigate to Settings > API Keys
4. Generate test keys
5. Copy the Key ID and Key Secret
6. Paste them in your `.env` files

## First Steps

1. Create an account on the platform
2. Choose your role:
   - **Student**: Enroll in and watch courses
   - **Instructor**: Create and manage courses
3. Start using the platform!

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check your connection string in `backend/.env`
- For Windows: MongoDB might be running as a service

### Port Already in Use
- Backend default: 5000
- Frontend default: 3000
- Change ports in `.env` if needed

### Razorpay Payment Not Working
- Verify your API keys are correct
- Make sure you're using test keys in development
- Check browser console for errors

## Next Steps

After setup, you can:
- Browse courses
- Create courses (if you're an instructor)
- Enroll in courses
- Make payments
- Watch video content
- Manage your profile

Enjoy learning! 🎓






