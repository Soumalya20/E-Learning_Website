# Installation Guide - E-Learning Platform

## ⚠️ Important: Required Software

To run this application, you need to install:

1. **Node.js** (for running JavaScript)
2. **MongoDB** (database)

---

## 📥 Step 1: Install Node.js

### Download and Install:
1. Go to: **https://nodejs.org/**
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through all steps (default settings are fine)
5. **IMPORTANT:** Make sure "Add to PATH" is checked during installation

### Verify Installation:
Open PowerShell/Command Prompt and type:
```powershell
node --version
npm --version
```

You should see version numbers like: `v18.17.0` and `9.6.7`

---

## 📥 Step 2: Install MongoDB

### Option A: Install MongoDB Locally (Recommended for Testing)

1. Go to: **https://www.mongodb.com/try/download/community**
2. Select:
   - Windows
   - MSI Package
   - Community Server
3. Download and run the installer
4. Click "Complete" installation
5. **Uncheck "Install MongoDB as a Service"** (we'll run it manually)
6. Complete the installation

### Start MongoDB (after installation):
```powershell
# Navigate to MongoDB bin folder (adjust path if needed)
cd "C:\Program Files\MongoDB\Server\6.0\bin"

# Start MongoDB
.\mongod.exe --dbpath="C:\data\db"
```

Or if MongoDB was installed as a service, it should start automatically.

### Option B: Use MongoDB Atlas (Cloud - Easier)
1. Go to: **https://www.mongodb.com/cloud/atlas**
2. Sign up for free account
3. Create a free cluster
4. Get your connection string
5. Update `backend/.env` with the connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elearning
   ```

---

## 🚀 Step 3: Run the Application

### Quick Setup (after Node.js is installed):

Open **PowerShell** in the project folder and run these commands:

#### Install Backend Dependencies:
```powershell
cd "C:\E-Learning site\backend"
npm install
```

#### Install Frontend Dependencies:
```powershell
cd "C:\E-Learning site\frontend"
npm install
```

#### Start MongoDB (if using local):
```powershell
# In a new terminal
cd "C:\Program Files\MongoDB\Server\6.0\bin"
.\mongod.exe --dbpath="C:\data\db"
```

#### Start Backend Server:
```powershell
# In a new terminal
cd "C:\E-Learning site\backend"
npm run dev
```

#### Start Frontend Server:
```powershell
# In a new terminal
cd "C:\E-Learning site\frontend"
npm start
```

---

## 🎯 Alternative: Simplified Setup Script

After installing Node.js, you can run this PowerShell script:

```powershell
# Open PowerShell in the project folder
cd "C:\E-Learning site"

# Run this command:
.\setup-and-run.ps1
```

---

## ✅ What to Expect:

1. **Backend Server** will run on: `http://localhost:5000`
   - You'll see: "Server running on port 5000"
   - And: "MongoDB Connected"

2. **Frontend Server** will run on: `http://localhost:3000`
   - Your browser will automatically open
   - You'll see the beautiful homepage!

---

## 🔧 Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Install Node.js from nodejs.org
- Restart your terminal after installation

### "MongoDB connection error"
- MongoDB is not running
- Start it with: `mongod` command
- Or update your connection string in `backend/.env`

### "Port already in use"
- Another application is using the port
- Change the port in `backend/.env`: `PORT=5001`
- Or close the application using the port

---

## 📝 Quick Checklist

Before running:
- [ ] Node.js is installed (verify with `node --version`)
- [ ] MongoDB is installed and running
- [ ] `backend/.env` file exists
- [ ] `frontend/.env` file exists
- [ ] Dependencies installed (`npm install` in both folders)

---

## 🎓 After Installation

Once everything is running:
1. Open http://localhost:3000
2. Click "Sign Up" to create an account
3. Choose your role (Student or Instructor)
4. Start exploring!

---

## 💡 Need Help?

If you encounter any issues:
1. Check that Node.js is installed: `node --version`
2. Check that MongoDB is running
3. Read the error messages carefully
4. Make sure all dependencies are installed

The application is fully functional once these are installed!






