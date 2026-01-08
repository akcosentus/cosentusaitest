# Cosentus - Medical RCM Landing Page

A modern, responsive landing page for Cosentus Medical Revenue Cycle Management with a fully integrated AI chat assistant.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue) ![Status](https://img.shields.io/badge/Status-Ready%20to%20Deploy-success)

## ✨ Features

- 🎨 **Beautiful Design** - Baby blue, white, and gray color scheme
- 💬 **AI Chat Widget** - Fully integrated with Cosentus AI SDK
- 📱 **Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast** - Built with Next.js 14 and TypeScript
- 🚀 **Deploy Ready** - One-click deployment to Vercel
- 🔒 **Secure** - No API keys needed, SDK handles everything

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Deploy to Vercel

```bash
# Push to Git
git init
git add .
git commit -m "Initial commit"
git push -u origin main

# Then go to vercel.com and import your repository
```

**See [GIT_SETUP.md](GIT_SETUP.md) for detailed deployment instructions**

## 💬 Chat Widget

The chat widget is **fully integrated** with the Cosentus AI SDK:

- ✅ Real-time AI responses from Cosentus Chat Assistant
- ✅ Expandable interface (starts compact, expands on first message)
- ✅ Scrollable message area with typing indicators
- ✅ Error handling and automatic reconnection
- ✅ Beautiful animations and smooth transitions

### How It Works

1. SDK loads from Cosentus CDN: `https://cosentusai.vercel.app/cosentus-voice.js`
2. Chat assistant initializes via `CosentusVoice.createChatAssistant()`
3. User sends message → SDK handles API call → AI responds
4. No backend needed, no API keys required!

## 📚 Documentation

- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment guide and troubleshooting
- **[GIT_SETUP.md](GIT_SETUP.md)** - Step-by-step Git and Vercel setup

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS Modules (no external dependencies)
- **AI Integration:** Cosentus Voice SDK (chat assistant)
- **Deployment:** Vercel

## 📁 Project Structure

```
cosentusaitest/
├── app/
│   ├── components/
│   │   ├── ChatWidget.tsx          # AI chat widget
│   │   └── ChatWidget.module.css   # Chat styles
│   ├── layout.tsx                  # Root layout (loads SDK)
│   ├── page.tsx                    # Landing page
│   ├── page.module.css             # Page styles
│   └── globals.css                 # Global styles
├── package.json
├── tsconfig.json
├── next.config.js
└── vercel.json
```

## ✅ Status

**Ready to Deploy!** Everything is built, tested, and working:

- [x] Landing page with responsive design
- [x] AI chat widget fully integrated
- [x] Production build tested (89.6 kB First Load JS)
- [x] No linter errors
- [x] Vercel configuration complete
- [x] Documentation complete

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Support

### For Development Issues
- Check [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
- Review browser console for errors

### For Cosentus SDK Issues
- Email: support@cosentus.com
- SDK Docs: See Cosentus Integration Guide

## 📝 License

© 2026 Cosentus. All rights reserved.

---

**Ready to deploy?** See [GIT_SETUP.md](GIT_SETUP.md) for step-by-step instructions! 🚀

