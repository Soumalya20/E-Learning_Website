# How to Run the E-Learning Platform

## Quick Start Guide

### 1️⃣ Start MongoDB
First, make sure MongoDB is running on your system.

**Windows:**
```bash
# If MongoDB is installed as a service, it should already be running
# Check in Services (search "services" in Windows)

# If not running, start it:
mongod
```

**Mac/Linux:**
```bash
# Start MongoDB service
brew services start mongodb-community  # Mac with Homebrew
# OR
sudo systemctl start mongod  # Linux
```

---

### 2️⃣ Open Two Terminal Windows

You need **2 separate terminals** - one for backend, one for frontend.

#### **Terminal 1 - Backend**

```bash
# Navigate to backend folder
cd "C:\E-Learning site\backend"

# Install dependencies (first time only)
npm install

# Create .env file (copy and edit the content below)
# Create a file named ".env" in the backend folder with:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=my_super_secret_jwt_key_123456789
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
NODE_ENV=development

# Start the backend server
npm run dev
```

You should see: `Server running on port 5000` and `MongoDB Connected`

#### **Terminal 2 - Frontend**

```bash
# Navigate to frontend folder
cd "C:\E-Learning site\frontend"

# Install dependencies (first time only)
npm install

# Create .env file (copy and edit the content below)
# Create a file named ".env" in the frontend folder with:
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id_here

# Start the frontend server
npm start
```

You should see: `Compiled successfully!` and the browser opens to `http://localhost:3000`

---

### 3️⃣ Access the Application

- **Frontend (Website):** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 📝 Creating .env Files

### Backend `.env` file location: `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=my_super_secret_jwt_key_123456789
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
NODE_ENV=development
```

### Frontend `.env` file location: `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

> **Note:** Replace the Razorpay keys with your actual keys from https://razorpay.com/

---

## 🔑 Getting Razorpay Keys

1. Go to https://razorpay.com/
2. Sign up or log in
3. Go to Settings → API Keys
4. Click "Generate Test Keys"
5. Copy the Key ID and Key Secret
6. Paste them in your `.env` files

---

## ✅ First Time Setup Checklist

- [ ] MongoDB is running
- [ ] Created `backend/.env` file
- [ ] Created `frontend/.env` file
- [ ] Installed backend dependencies (`npm install` in backend folder)
- [ ] Installed frontend dependencies (`npm install` in frontend folder)
- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] Frontend server is running (`npm start` in frontend folder)

---

## 🚀 Usage

1. Open http://localhost:3000 in your browser
2. Click "Sign Up" to create an account
3. Choose your role:
   - **Student**: Browse and enroll in courses
   - **Instructor**: Create and manage courses
4. Start exploring!

---

## 🛑 Stopping the Application

- Press `Ctrl + C` in both terminal windows to stop the servers

---

## ❓ Troubleshooting

### MongoDB Connection Error
```
MongoDB Connection Error
```
**Solution:** Make sure MongoDB is running
- Windows: Check Services or run `mongod`
- Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

### Port Already in Use
```
Port 5000 is already in use
```
**Solution:** Change `PORT=5000` to `PORT=5001` in `backend/.env`

### Module Not Found Error
```
Cannot find module '...'
```
**Solution:** Run `npm install` in the backend or frontend folder

### Cannot GET /api/...
```
404 Error
```
**Solution:** Make sure backend is running on port 5000

---

## 🎉 You're All Set!

Once both servers are running, you can:
- Browse courses at http://localhost:3000
- Create an account
- Enroll in courses (with Razorpay test mode)
- Start learning!

Enjoy your E-Learning platform! 🎓






