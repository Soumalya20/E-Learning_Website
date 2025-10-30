# 🚀 How to Start MongoDB

## Quick Start Options

### Option 1: MongoDB Windows Service (Easiest)

1. **Open Services:**
   - Press `Win + R`
   - Type: `services.msc`
   - Press Enter

2. **Find MongoDB:**
   - Look for "MongoDB" or "MongoDB Server"
   - Right-click on it
   - Click "Start"

### Option 2: Start MongoDB Manually

1. **Open PowerShell as Administrator**

2. **Navigate to MongoDB bin folder:**
   ```powershell
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   ```
   (Change 7.0 to your MongoDB version if different)

3. **Start MongoDB:**
   ```powershell
   .\mongod.exe --dbpath="C:\data\db"
   ```

4. **Keep this window open** - MongoDB is now running

### Option 3: Start MongoDB Server Directly

```powershell
# Try to find MongoDB installation
$mongoPath = (Get-ChildItem "C:\Program Files\MongoDB" -Recurse -Filter "mongod.exe" | Select-Object -First 1).DirectoryName
cd $mongoPath
.\mongod.exe
```

---

## ✅ Verify MongoDB is Running

After starting MongoDB, verify it's running:

```powershell
# Check if MongoDB port is open
Test-NetConnection -ComputerName localhost -Port 27017
```

If successful, you'll see the port is open.

---

## 🎯 After MongoDB Starts

Once MongoDB is running, come back and I'll:
1. ✅ Seed the database with sample courses
2. ✅ Connect the backend to MongoDB
3. ✅ Show you the courses in the database

---

## 📝 Quick Commands

### Start MongoDB:
```powershell
# If installed as Windows Service:
# Start through Services (services.msc)

# If not installed as service:
cd "C:\Program Files\MongoDB\Server\7.0\bin"
.\mongod.exe
```

### Stop MongoDB:
```powershell
# If running as service:
Stop-Service MongoDB

# If running manually:
# Press Ctrl + C in the terminal where MongoDB is running
```

---

## 🔧 Common Locations

MongoDB is typically installed at:
- `C:\Program Files\MongoDB\Server\7.0\bin\`
- `C:\Program Files\MongoDB\Server\6.0\bin\`
- `C:\Program Files\MongoDB\Server\5.0\bin\`

Change to your version number.

---

## 🆘 Still Having Issues?

If MongoDB won't start:

1. **Check MongoDB version:**
   ```powershell
   mongod --version
   ```

2. **Create data directory:**
   ```powershell
   mkdir C:\data\db
   ```

3. **Check for errors** in the MongoDB log

4. **Try different installation path** if installed elsewhere

---

Let me know when MongoDB is running and I'll continue with seeding the database!



