# 🚀 Quick MongoDB Setup Guide

## ⚠️ MongoDB is Installed but Not Running

I need you to start MongoDB before I can populate the database with courses.

---

## 📋 Quick Start (Choose One Method)

### ✅ Method 1: Windows Services (Easiest - 30 seconds)

1. **Press `Windows Key + R`**
2. **Type:** `services.msc`
3. **Press Enter**
4. **Find "MongoDB"** in the list
5. **Right-click** → Click **"Start"**
6. **Status should change to "Running"**

Done! MongoDB is now running. ✅

---

### ✅ Method 2: Command Line

**Open PowerShell and run:**

```powershell
# Find MongoDB (try these locations):
cd "C:\Program Files\MongoDB\Server\7.0\bin"
# OR
cd "C:\Program Files\MongoDB\Server\6.0\bin"

# Start MongoDB:
.\mongod.exe
```

**Keep this window open** - MongoDB is now running! ✅

---

### ✅ Method 3: Check if Already Running

Maybe MongoDB IS running but we're looking in the wrong place?

**Verify with:**
```powershell
Test-NetConnection -ComputerName localhost -Port 27017
```

If it says "TcpTestSucceeded : True" - MongoDB is running! ✅

---

## 🎯 After MongoDB Starts

**Once MongoDB is running, tell me and I'll:**

1. ✅ Connect to MongoDB
2. ✅ Seed the database with 5 sample courses
3. ✅ Update the website to use real database
4. ✅ Test everything is working

---

## 📝 Next Steps After Starting

Just say: **"MongoDB is running"** and I'll take care of the rest!

---

## 🆘 Can't Find MongoDB?

**Find MongoDB installation:**
```powershell
Get-ChildItem "C:\Program Files" -Recurse -Filter "mongod.exe" | Select-Object FullName
```

This will show you exactly where MongoDB is installed.

---

**Let me know when MongoDB is running! 🚀**



