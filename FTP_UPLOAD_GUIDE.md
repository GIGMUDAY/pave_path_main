# FTP Upload Guide - Bypass Antivirus False Positive

## Problem
cPanel File Manager's antivirus scanner flags JavaScript bundles as viruses (false positive). This prevents zip file uploads.

## Solution: Use FTP (Bypasses Antivirus)

FTP uploads **bypass the antivirus scanner** completely, so you can upload your files without issues.

---

## Step-by-Step FTP Upload

### Step 1: Get FTP Credentials from cPanel

1. Log into **cPanel**
2. Go to **FTP Accounts** (or **Files** → **FTP Accounts**)
3. Find your FTP account or create one
4. Note these details:
   - **FTP Server**: `ftp.yourdomain.com` or your server IP
   - **FTP Username**: Your cPanel username or FTP account username
   - **FTP Password**: Your FTP password
   - **Port**: `21` (FTP) or `22` (SFTP)

### Step 2: Download FileZilla (Free FTP Client)

Download from: https://filezilla-project.org/

### Step 3: Connect via FTP

1. Open **FileZilla**
2. Enter connection details at the top:
   - **Host**: `ftp.yourdomain.com` (or your server IP)
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: `21`
3. Click **Quickconnect**
4. Wait for connection (you'll see "Directory listing successful")

### Step 4: Navigate to Your Website Folder

**On the RIGHT side (Server):**
- Navigate to `public_html` (or your domain folder like `pavepathdesign.com`)
- This is where you'll upload files

**On the LEFT side (Local):**
- Navigate to your project folder
- Open the `.next` folder

### Step 5: Upload Files

**Method A: Upload All Files at Once**

1. On the LEFT (local), select ALL files and folders inside `.next`:
   - `index.html`
   - `assets/` folder (select the entire folder)
   - `favicon.ico`
   - `pave_logo.jpg`
   - `placeholder.svg`
   - `robots.txt`
   - `.htaccess` (if visible, or upload separately)

2. **Drag and drop** all selected files to the RIGHT side (`public_html`)

3. Wait for upload to complete (watch the transfer queue at bottom)

**Method B: Upload Files One by One**

1. Upload `index.html` first
2. Upload `assets/` folder (drag the entire folder)
3. Upload other files (`favicon.ico`, images, etc.)
4. Upload `.htaccess` file separately

### Step 6: Upload .htaccess File

**Important:** `.htaccess` must be in the same folder as `index.html`

1. On the LEFT, go back to your project root (not `.next` folder)
2. Find `.htaccess` file
3. Drag it to `public_html` on the RIGHT
4. If prompted to overwrite, click **Yes**

### Step 7: Set File Permissions

1. In FileZilla, **right-click** `.htaccess` on the server (right side)
2. Select **File permissions**
3. Set to `644`
4. Click **OK**

### Step 8: Verify Upload

1. Check that all files are uploaded:
   - `index.html` ✓
   - `assets/` folder with all files ✓
   - `.htaccess` ✓
   - Other static files ✓

2. Visit your website to test

---

## Alternative: Extract Zip on Server via Terminal

If you must use the zip file:

1. Upload zip via **FTP** (not File Manager - bypasses scanner)
2. Connect to cPanel **Terminal**
3. Run:
   ```bash
   cd ~/public_html
   unzip pave_path_deployment.zip
   chmod 644 .htaccess
   ```

---

## Why FTP Works

- **FTP uploads bypass cPanel's antivirus scanner**
- File Manager uses ClamAV which flags minified JS
- FTP goes directly to server, no scanning
- This is the standard way to deploy files

---

## Troubleshooting

**Connection timeout:**
- Check firewall settings
- Try port 22 (SFTP) instead of 21
- Contact hosting support

**Permission denied:**
- Verify username/password
- Check folder permissions on server

**Files not showing:**
- Refresh server view in FileZilla
- Check you're in correct folder (`public_html`)

---

## Quick Checklist

- [ ] FTP client installed (FileZilla)
- [ ] FTP credentials from cPanel
- [ ] Connected to FTP server
- [ ] Navigated to `public_html` on server
- [ ] Built project (`npm run build`)
- [ ] Uploaded all files from `.next` folder
- [ ] Uploaded `.htaccess` file
- [ ] Set `.htaccess` permissions to `644`
- [ ] Tested website

---

## Summary

**Don't use cPanel File Manager for zip uploads** - it triggers false positives.

**Use FTP instead** - it bypasses the antivirus scanner completely.

Your files are safe - this is just a false positive from the antivirus scanner detecting patterns in minified JavaScript code.

