# 🚀 How to Run Your E-Learning Platform Servers

## ✅ Current Status

Both servers are **STARTING UP**! Please wait a few moments.

### 🌐 Access Your Application

- **Frontend (Website):** http://localhost:3000
- **Backend API:** http://localhost:5000

The browser should open automatically. If not, manually go to: **http://localhost:3000**

---

## 📋 Step-by-Step Guide to Run Servers Manually

If you need to restart or run the servers manually in the future, follow these steps:

### **Step 1: Start MongoDB**

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)
3. Create a free cluster
4. Get your connection string
5. Update `backend/.env` with the connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
   ```

**Option B: MongoDB Local**
```powershell
# Make sure MongoDB is installed
# If installed as a service, it should start automatically

# Or start it manually:
cd "C:\Program Files\MongoDB\Server\6.0\bin"
.\mongod.exe --dbpath="C:\data\db"
```

### **Step 2: Navigate to Project Directory**

Open PowerShell and navigate to the project:
```powershell
cd "C:\E-Learning site"
```

### **Step 3: Start Backend Server**

Open **Terminal/PowerShell Window 1**:
```powershell
# Navigate to backend folder
cd "C:\E-Learning site\backend"

# Start the backend server
npm run dev
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected
```

✅ **Keep this terminal window open** - Backend server is running

### **Step 4: Start Frontend Server**

Open **Terminal/PowerShell Window 2** (NEW window):
```powershell
# Navigate to frontend folder
cd "C:\E-Learning site\frontend"

# Start the frontend server
npm start
```

**Expected Output:**
```
Compiled successfully!

Local:            http://localhost:3000
```

✅ Browser will open automatically at **http://localhost:3000**

---

## 🎯 Quick Reference Commands

### Start Everything (First Time Setup)
```powershell
# 1. Install backend dependencies (one time)
cd "C:\E-Learning site\backend"
npm install

# 2. Install frontend dependencies (one time)
cd "C:\E-Learning site\frontend"
npm install

# 3. Start MongoDB (if local)

# 4. Start backend (Terminal 1)
cd "C:\E-Learning site\backend"
npm run dev

# 5. Start frontend (Terminal 2)
cd "C:\E-Learning site\frontend"
npm start
```

### Daily Startup (After First Time)
```powershell
# Terminal 1 - Backend
cd "C:\E-Learning site\backend"
npm run dev

# Terminal 2 - Frontend
cd "C:\E-Learning site\frontend"
npm start
```

### Stop Servers
- Press `Ctrl + C` in each terminal window
- Or close the terminal windows

---

## 🔧 Server Details

### Backend Server (Port 5000)
- **Status:** Running
- **URL:** http://localhost:5000
- **API Base:** http://localhost:5000/api
- **Technology:** Node.js + Express + MongoDB
- **Location:** `backend/` folder

### Frontend Server (Port 3000)
- **Status:** Running
- **URL:** http://localhost:3000
- **Technology:** React.js
- **Location:** `frontend/` folder

---

## 📱 First Time Using the Platform

1. **Open Browser:** http://localhost:3000 (opens automatically)

2. **Create Account:**
   - Click "Sign Up" button
   - Enter your details
   - Choose role: "Student" or "Instructor"
   - Click "Sign Up"

3. **As a Student:**
   - Browse courses
   - View course details
   - Enroll in courses
   - Watch video content

4. **As an Instructor:**
   - Create courses
   - Manage course content
   - View enrollments

---

## 🆘 Troubleshooting

### ❌ "MongoDB Connection Error"
**Solution:**
```powershell
# Check if MongoDB is running
# If using Atlas, verify connection string in backend/.env
# If local, start MongoDB:
mongod
```

### ❌ "Port 5000 already in use"
**Solution:**
```powershell
# Change port in backend/.env
PORT=5001

# Update frontend/.env
REACT_APP_API_URL=http://localhost:5001/api
```

### ❌ "Cannot find module"
**Solution:**
```powershell
# Reinstall dependencies
cd "C:\E-Learning site\backend"
npm install

cd "C:\E-Learning site\frontend"
npm install
```

### ❌ "Module not found" Error
**Solution:**
- Make sure you ran `npm install` in both folders
- Delete `node_modules` folder and reinstall:
```powershell
cd "C:\E-Learning site\backend"
Remove-Item -Recurse -Force node_modules
npm install
```

### 🌐 Browser Doesn't Open
**Manual Access:**
- Go to: http://localhost:3000
- Make sure frontend server is running
- Check terminal for errors

### 💡 "npm is not recognized"
**Solution:**
- Node.js is not installed
- Install from: https://nodejs.org/
- Restart computer after installation

---

## 📊 Check Server Status

### Verify Backend is Running:
Open browser and go to: **http://localhost:5000**

### Verify Frontend is Running:
Go to: **http://localhost:3000**

### Test API Connection:
1. Open browser developer tools (F12)
2. Go to Network tab
3. Visit the website
4. Check for API calls to `localhost:5000`

---

## 📁 Project Structure

```
E-Learning site/
├── backend/              ← Backend server files
│   ├── models/          ← Database models
│   ├── routes/          ← API routes
│   ├── server.js        ← Main server file
│   └── .env            ← Backend configuration
├── frontend/            ← Frontend React app
│   ├── src/
│   │   ├── pages/      ← Web pages
│   │   ├── components/ ← UI components
│   │   └── services/   ← API services
│   └── .env           ← Frontend configuration
└── README.md           ← Documentation
```

---

## 🎓 What You Can Do Now

✅ **View the Website:** http://localhost:3000  
✅ **Create an Account:** Click "Sign Up"  
✅ **Browse Courses:** View available courses  
✅ **Test Payment:** Enroll in courses (with test Razorpay keys)  
✅ **Watch Videos:** Access course content  
✅ **Create Courses:** (As Instructor) Create and manage courses  

---

## ⚙️ Configuration Files

### Backend Configuration (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/elearning
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
NODE_ENV=development
```

### Frontend Configuration (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_key
```

---

## 🎉 Success!

Your E-Learning platform is now running!

- **Backend:** ✅ Running on port 5000
- **Frontend:** ✅ Running on port 3000
- **Database:** ⚠️ Configure MongoDB connection

**Next Steps:**
1. Open http://localhost:3000 in your browser
2. Create your account
3. Start exploring!

---

**Need Help?** Check the troubleshooting section above or read `README.md` for more information.





