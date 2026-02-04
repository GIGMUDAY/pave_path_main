# FTP Quick Start Guide - Upload Your Website

## Step 1: Download FileZilla (Free FTP Client)

Download from: **https://filezilla-project.org/**
- Click "Download FileZilla Client"
- Install it (it's free and safe)

---

## Step 2: Get FTP Credentials from cPanel

1. **Log into cPanel**
2. Go to **"FTP Accounts"** (or **Files** → **FTP Accounts**)
3. You'll see your FTP account listed, or create a new one
4. **Note down these details:**
   - **FTP Server/Hostname**: Usually `ftp.yourdomain.com` or your server IP
   - **FTP Username**: Your cPanel username or FTP account username
   - **FTP Password**: Your FTP password (click "Change Password" if needed)
   - **Port**: `21` (for FTP) or `22` (for SFTP)

---

## Step 3: Connect via FileZilla

1. **Open FileZilla**
2. At the top, enter:
   - **Host**: `ftp.yourdomain.com` (or your server IP from cPanel)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
3. Click **"Quickconnect"**
4. Wait for connection (you'll see "Directory listing successful" in the message log)

---

## Step 4: Navigate to Your Website Folder

**On the RIGHT side (Remote site - Your Server):**
- Navigate to `public_html` (or your domain folder like `pavepathdesign.com`)
- This is where your website files go

**On the LEFT side (Local site - Your Computer):**
- Navigate to: `C:\Users\Dar Computers\Desktop\GVG_blockchain\pave_path_main\.next`
- This is your built website files

---

## Step 5: Upload Files

### Upload All Files:

1. **On the LEFT side**, select ALL files and folders inside `.next`:
   - Click `index.html` (hold Ctrl and click each file/folder)
   - Click `assets` folder
   - Click `favicon.ico`
   - Click `pave_logo.jpg`
   - Click `placeholder.svg`
   - Click `robots.txt`
   - **OR** Press `Ctrl+A` to select everything

2. **Drag and drop** all selected files to the RIGHT side (`public_html` folder)

3. **Wait for upload** - Watch the transfer queue at the bottom

### Upload .htaccess File:

1. **On the LEFT side**, go back to project root (go up one folder from `.next`)
2. Find `.htaccess` file
3. **Drag it** to `public_html` on the RIGHT side
4. If asked to overwrite, click **"Yes"**

---

## Step 6: Set File Permissions

1. **Right-click** `.htaccess` file on the server (RIGHT side)
2. Select **"File permissions"**
3. Set to `644` (or check: Read, Write for Owner; Read for Group and Others)
4. Click **OK**

---

## Step 7: Verify Upload

Check that these files are in `public_html`:
- ✅ `index.html`
- ✅ `assets/` folder (with all JS and CSS files inside)
- ✅ `.htaccess`
- ✅ `favicon.ico`
- ✅ `pave_logo.jpg`
- ✅ `placeholder.svg`
- ✅ `robots.txt`

---

## Step 8: Test Your Website

Visit your website in a browser - it should work now!

---

## Troubleshooting

**Can't connect?**
- Check FTP server address (try your server IP instead of domain)
- Verify username and password
- Try port `22` (SFTP) instead of `21`

**Files not uploading?**
- Check you have write permissions
- Make sure you're in `public_html` folder
- Try uploading one file at a time

**Website not working?**
- Make sure `.htaccess` is in the same folder as `index.html`
- Check `.htaccess` permissions are `644`
- Clear browser cache

---

## Quick Checklist

- [ ] FileZilla installed
- [ ] FTP credentials from cPanel
- [ ] Connected to FTP server
- [ ] In `public_html` folder on server
- [ ] In `.next` folder on local computer
- [ ] All files uploaded
- [ ] `.htaccess` uploaded
- [ ] `.htaccess` permissions set to `644`
- [ ] Website tested

---

## Need Help?

If you get stuck at any step, let me know which step and I'll help you!

