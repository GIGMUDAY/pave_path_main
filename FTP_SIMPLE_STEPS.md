# FTP Upload - Simple 5 Steps (Bypasses Antivirus)

## ⚠️ Important: Zip uploads won't work - antivirus blocks them
## ✅ Solution: Use FTP - it bypasses antivirus completely

---

## Step 1: Download FileZilla (2 minutes)

1. Go to: **https://filezilla-project.org/**
2. Click **"Download FileZilla Client"**
3. Install it (it's free and safe)

---

## Step 2: Get FTP Info from cPanel (1 minute)

1. **Log into cPanel**
2. Click **"FTP Accounts"** (or look under "Files" section)
3. You'll see your FTP account - click **"Configure FTP Client"** or note:
   - **FTP Server**: Usually `ftp.yourdomain.com` or your server IP
   - **FTP Username**: Your username
   - **FTP Password**: Your password
   - **Port**: `21`

---

## Step 3: Connect FileZilla (30 seconds)

1. **Open FileZilla**
2. At the top, enter:
   - **Host**: `ftp.yourdomain.com` (from Step 2)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
3. Click **"Quickconnect"**
4. ✅ You should see "Directory listing successful"

---

## Step 4: Upload Files (2 minutes)

**On LEFT side (Your Computer):**
- Navigate to: `C:\Users\Dar Computers\Desktop\GVG_blockchain\pave_path_main\.next`
- You'll see all your website files

**On RIGHT side (Server):**
- Navigate to: `public_html` (or your domain folder)

**Upload:**
1. **Select ALL files** in `.next` folder (left side) - press `Ctrl+A`
2. **Drag and drop** to `public_html` (right side)
3. Wait for upload to finish

**Then upload .htaccess:**
1. Go back one folder (left side) - find `.htaccess`
2. Drag it to `public_html` (right side)

---

## Step 5: Set Permissions (10 seconds)

1. **Right-click** `.htaccess` on server (right side)
2. Click **"File permissions"**
3. Set to `644`
4. Click **OK**

---

## ✅ Done! Your website should be live now!

Visit your website - it should work!

---

## Why FTP Works

- ✅ **Bypasses antivirus scanner completely**
- ✅ **No false positives**
- ✅ **Faster uploads**
- ✅ **Standard deployment method**

---

## Need Help?

If you get stuck at any step, tell me which step and I'll help you!

