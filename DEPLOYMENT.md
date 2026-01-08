# Deployment Guide - Cosentus Landing Page

## 🚀 Deploy to Vercel

### Prerequisites
- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free tier works great)

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Cosentus landing page"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Done!** Your site will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/alexkashkarian/Desktop/cosentusaitest
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new one
   - Confirm settings
   - Deploy!

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## 🔧 Configuration

The project is already configured for Vercel:
- ✅ `vercel.json` - Deployment configuration
- ✅ `next.config.js` - Next.js settings
- ✅ `.gitignore` - Excludes build files and dependencies

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update your DNS records as instructed

## 📊 Features Included

### Landing Page
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Baby blue, white, and gray color scheme
- ✅ Hero section with company info
- ✅ Feature cards showcasing RCM solutions
- ✅ Professional navigation and footer

### Chat Widget
- ✅ **Integrated with Cosentus AI SDK**
- ✅ Oval-shaped input with send button
- ✅ Expands when messages are sent
- ✅ Scrollable message area with max height
- ✅ Real-time AI responses via Cosentus Chat Assistant
- ✅ Loading indicator with typing animation
- ✅ Error handling and fallback messages
- ✅ Smooth animations and transitions

### SDK Integration
- ✅ Cosentus Voice SDK loaded from CDN
- ✅ Chat Assistant initialized on page load
- ✅ Event-driven architecture (message, loading, error events)
- ✅ Automatic retry and error recovery
- ✅ User-friendly error messages

## 🧪 Testing Before Deployment

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build (Test Locally)
```bash
npm run build
npm start
```

### What to Test
1. ✅ Chat widget appears on homepage
2. ✅ Typing a message and sending works
3. ✅ Chat expands when first message is sent
4. ✅ AI responses appear after sending
5. ✅ Loading indicator shows while waiting
6. ✅ Scroll works when many messages
7. ✅ Responsive on mobile devices
8. ✅ Error handling if SDK fails to load

## 🔒 Environment Variables

No environment variables needed! The SDK is loaded from the Cosentus CDN and handles all API communication internally.

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Chat not responding?
- Check browser console for errors
- Verify SDK is loaded: `window.CosentusVoice` should be defined
- Check network tab for API calls to `cosentusai.vercel.app`

### Build fails?
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Deployment fails on Vercel?
- Ensure all files are committed to Git
- Check build logs in Vercel dashboard
- Verify Next.js version compatibility

## 📞 Support

For SDK-related issues:
- Contact: support@cosentus.com
- SDK Documentation: See Cosentus integration guide

For deployment issues:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

## 🎉 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Chat widget is visible
- [ ] Can send and receive messages
- [ ] Mobile responsive design works
- [ ] All links work (navigation, footer)
- [ ] Custom domain configured (if applicable)
- [ ] Analytics added (optional)
- [ ] SSL certificate active (automatic with Vercel)

---

**Built with Next.js 14 + TypeScript + Cosentus AI**

Ready to deploy! 🚀

