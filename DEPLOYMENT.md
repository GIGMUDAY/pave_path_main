# Vercel Deployment Setup

## Automatic Deployment from GitHub to Vercel

Follow these steps to set up automatic deployments:

### Step 1: Push Your Code to GitHub

1. Make sure your code is committed and pushed to your GitHub repository
2. If you haven't created a repository yet:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Step 2: Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or create an account)
2. Click on **"Add New..."** → **"Project"**
3. Import your GitHub repository:
   - Click **"Import Git Repository"**
   - Select your repository from the list
   - Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect your Vite project, but verify these settings:

- **Framework Preset**: Vite (should be auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (already in vercel.json)
- **Output Directory**: `dist` (already in vercel.json)
- **Install Command**: `npm install` (already in vercel.json)

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your project
   - Deploy it automatically

### Step 5: Automatic Deployments

Once connected, Vercel will automatically:
- ✅ Deploy every time you push to the `main` branch (production)
- ✅ Create preview deployments for pull requests
- ✅ Rebuild on every commit

### Environment Variables (if needed)

If you have any environment variables:
1. Go to your project settings in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables there

### Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions

---

**Note**: The `vercel.json` file has been created in your project root with the correct configuration for Vite + React.

