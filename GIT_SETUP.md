# Git Setup & Deployment Guide

## Quick Start - Push to Git and Deploy

### Step 1: Initialize Git Repository

```bash
cd /Users/alexkashkarian/Desktop/cosentusaitest
git init
git add .
git commit -m "Initial commit: Cosentus landing page with AI chat"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `cosentus-landing` or `cosentusaitest`
3. Don't initialize with README (we already have files)
4. Copy the repository URL

### Step 3: Push to GitHub

```bash
# Replace YOUR_GITHUB_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in (or create account)
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub repository
5. Vercel will auto-detect Next.js settings - just click **"Deploy"**
6. Wait 1-2 minutes for deployment to complete
7. Your site will be live at `https://your-project-name.vercel.app`

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Making Updates After Initial Deployment

### Update and Redeploy

```bash
# Make your changes to the code
# Then commit and push:

git add .
git commit -m "Description of your changes"
git push

# Vercel will automatically redeploy!
```

## Custom Domain Setup (Optional)

After deployment, you can add a custom domain:

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain (e.g., `cosentus.com`)
4. Follow DNS instructions provided by Vercel
5. SSL certificate is automatically provisioned

## Environment Variables (If Needed Later)

If you need to add environment variables:

1. In Vercel Dashboard, go to **"Settings"** → **"Environment Variables"**
2. Add variables like `NEXT_PUBLIC_API_KEY=your_key`
3. Redeploy to apply changes

**Note:** Currently, no environment variables are needed. The Cosentus SDK handles all API communication.

## Troubleshooting

### Push Rejected?
```bash
# If you get errors, try:
git pull origin main --rebase
git push origin main
```

### Deployment Failed?
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally first
- Verify all files are committed to Git

### Chat Widget Not Working?
- Check browser console for errors
- Verify SDK is loading: Open DevTools → Console → Type `window.CosentusVoice`
- Check Network tab for API calls to `cosentusai.vercel.app`

## Project Status

✅ Next.js 14 with TypeScript  
✅ Cosentus AI Chat SDK integrated  
✅ Responsive design (mobile, tablet, desktop)  
✅ Production build tested and working  
✅ Ready for Vercel deployment  
✅ No environment variables needed  
✅ No backend server required  

## Next Steps

1. ✅ Push to GitHub (see Step 1-3 above)
2. ✅ Deploy to Vercel (see Step 4 above)
3. 🎉 Share your live URL!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Cosentus Support: support@cosentus.com

