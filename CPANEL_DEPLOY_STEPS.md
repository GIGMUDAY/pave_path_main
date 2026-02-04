# How to Deploy to cPanel - Quick Steps

## Method 1: Build Locally & Upload (Easiest)

### Step 1: Build on Your Computer
```bash
npm run build
```
This creates the `dist` folder automatically.

### Step 2: Upload to cPanel
1. Open **cPanel File Manager**
2. Navigate to `public_html` (or your domain folder)
3. Upload **ALL contents** from the `dist` folder:
   - `index.html`
   - `assets/` folder (with all files inside)
   - `favicon.ico`
   - `pave_logo.jpg`
   - `placeholder.svg`
   - `robots.txt`
4. Upload `.htaccess` file to the same location (root of `public_html`)

### Step 3: Set Permissions
In cPanel File Manager:
- Right-click `.htaccess` → Change Permissions → Set to `644`

### Done! Your site should be live.

---

## Method 2: Build on cPanel Server (Without Creating dist Locally)

### Step 1: Upload Project Files
Upload your entire project to cPanel (via FTP or File Manager) to `public_html` or `~/pavepathdesign.com`

### Step 2: Setup Node.js in cPanel (FIXES "npm: command not found")

**Option A: Using cPanel Node.js Selector (Recommended)**

1. Go to **Node.js Selector** in cPanel
2. Click **Create Application**
3. Settings:
   - **Application root**: `pavepathdesign.com` (or `public_html`)
   - **Application URL**: Your domain
   - **Application startup file**: `server.js`
   - **Node.js version**: Latest LTS (e.g., 20.x or 18.x)
4. Click **Create**

**Option B: Using NVM (Node Version Manager) in Terminal**

If Node.js Selector is not available, try loading Node.js via nvm:

```bash
# Load nvm
source ~/.nvm/nvm.sh

# Install Node.js (if not installed)
nvm install 20
nvm use 20

# Verify npm is available
npm --version
```

**Option C: Use Full Path to Node.js**

Sometimes Node.js is installed but not in PATH. Try:

```bash
# Find Node.js installation
which node
which npm

# Or use full paths (common locations)
/opt/cpanel/ea-nodejs20/bin/npm --version
/usr/local/bin/npm --version
```

### Step 3: Build on Server

Once npm is available, run:

```bash
cd ~/pavepathdesign.com
npm install
npm run build
```

This creates the `dist` folder automatically on the server.

### Step 4: Deploy the Built Files

**If using Node.js server:**
1. Go back to **Node.js Selector** in cPanel
2. Click **Start** on your application

**If using Apache only (static files):**
1. Copy contents from `dist` folder to root:
   ```bash
   cd ~/pavepathdesign.com
   cp -r dist/* .
   cp dist/.htaccess . 2>/dev/null || echo ".htaccess already exists"
   ```
2. Make sure `.htaccess` is in root with permissions 644

### Done! Your site should be live.

---

## Important Notes:
- The `dist` folder is **automatically created** by `npm run build` - you don't create it manually
- If using Method 1, you only upload the **contents** of `dist`, not the folder itself
- Make sure `.htaccess` is in the same folder as `index.html`

