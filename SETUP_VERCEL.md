# Setup Automatic GitHub → Vercel Deployment

## Quick Setup Guide

### Step 1: Initialize Git Repository (if not already done)

```bash
# Make sure you're in the project directory
cd "C:\Users\Dar Computers\Desktop\GVG_blockchain\pave-final\pave_path"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Mobile optimized PavePath website"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name your repository (e.g., `pavepath-website`)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

### Step 3: Connect Local Repository to GitHub

```bash
# Add GitHub remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. If you haven't connected GitHub yet:
   - Click **"Connect GitHub"**
   - Authorize Vercel to access your repositories
   - Select the repositories you want to give access to
5. Select your `pavepath-website` repository
6. Click **"Import"**

### Step 5: Configure Vercel Project

Vercel should auto-detect your Vite project. Verify these settings:

- **Framework Preset**: Vite ✅ (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` ✅ (already configured)
- **Output Directory**: `dist` ✅ (already configured)
- **Install Command**: `npm install` ✅ (already configured)

### Step 6: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. Your site will be live at: `https://your-project-name.vercel.app`

### Step 7: Automatic Deployments (Already Set Up!)

Once connected, Vercel will **automatically**:
- ✅ Deploy every time you push to `main` branch (production)
- ✅ Create preview deployments for pull requests
- ✅ Rebuild on every commit
- ✅ Show deployment status in GitHub

### Future Updates

Now whenever you make changes:

```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically detect the push and deploy your changes within 1-2 minutes! 🚀

---

## Troubleshooting

### If deployment fails:
1. Check the build logs in Vercel dashboard
2. Make sure all dependencies are in `package.json`
3. Verify `vercel.json` is correct (already configured ✅)

### If GitHub connection doesn't work:
1. Make sure you've authorized Vercel in GitHub settings
2. Check repository permissions in GitHub

### Need help?
- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com

