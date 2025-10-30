# 🚀 START HERE - E-Learning Platform

## ⚠️ BEFORE YOU START

This application requires **2 programs** to be installed:

### ✅ Required Software:

1. **Node.js** - Download from https://nodejs.org/
   - Install the LTS version
   - Make sure to check "Add to PATH" during installation
   - After installation, restart your computer

2. **MongoDB** - Download from https://www.mongodb.com/try/download/community
   - Install the Community Server
   - OR use MongoDB Atlas (cloud) from https://www.mongodb.com/cloud/atlas

---

## 📋 Installation Steps

### Step 1: Install Node.js
1. Go to https://nodejs.org/
2. Download "LTS" version (recommended)
3. Run the installer
4. Keep all default settings
5. **Restart your computer after installation**

### Step 2: Install MongoDB

**Option 1: MongoDB Atlas (Easier - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Update `backend/.env`:
   ```
   MONGODB_URI=your_connection_string_here
   ```

**Option 2: MongoDB Local**
1. Go to https://www.mongodb.com/try/download/community
2. Download and install
3. MongoDB will run as a service automatically

### Step 3: Install Dependencies

Open **PowerShell** and run:

```powershell
# Install backend dependencies
cd "C:\E-Learning site\backend"
npm install

# Install frontend dependencies  
cd "C:\E-Learning site\frontend"
npm install
```

### Step 4: Update Configuration

Edit these files to add your Razorpay keys:

**File: `backend/.env`**
```
RAZORPAY_KEY_ID=your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
```

**File: `frontend/.env`**
```
REACT_APP_RAZORPAY_KEY_ID=your_key_here
```

Get Razorpay keys from: https://razorpay.com/ (Settings → API Keys)

### Step 5: Run the Application

You need **2 terminal windows**:

#### Terminal 1 - Backend:
```powershell
cd "C:\E-Learning site\backend"
npm run dev
```

Wait for: `Server running on port 5000` and `MongoDB Connected`

#### Terminal 2 - Frontend:
```powershell
cd "C:\E-Learning site\frontend"
npm start
```

Browser will open at: http://localhost:3000

---

## ✅ Success Checklist

- [ ] Node.js installed and verified (`node --version`)
- [ ] MongoDB installed/running or Atlas connection configured
- [ ] Backend dependencies installed (`npm install` in backend folder)
- [ ] Frontend dependencies installed (`npm install` in frontend folder)
- [ ] `.env` files configured with Razorpay keys
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] Browser opens automatically showing the website

---

## 🎉 You're Done!

The website should now be running at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

**First Steps:**
1. Create an account by clicking "Sign Up"
2. Choose "Student" to browse courses or "Instructor" to create courses
3. Start exploring the platform!

---

## 🆘 Problems?

### "npm is not recognized"
→ Install Node.js from https://nodejs.org/

### "MongoDB connection error"
→ Make sure MongoDB is running or use MongoDB Atlas

### "Port already in use"
→ Another app is using the port, close it or change ports in `.env` files

### Still having issues?
→ Read `INSTALLATION_GUIDE.md` for detailed troubleshooting

---

**Happy Learning! 🎓**






