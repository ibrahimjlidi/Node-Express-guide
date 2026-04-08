# 🚀 Deployment Guide

This document covers deploying your Next.js documentation site to GitHub and Netlify.

---

## 📋 Prerequisites

- GitHub account (free)
- Netlify account (free)
- Git installed locally
- Node.js 20+ installed

---

## 1️⃣ GitHub Setup

### Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Create a new repository:
   - **Repository name**: `docs-node` (or your preferred name)
   - **Description**: "Node.js & Express API Documentation Site"
   - **Public** or **Private** (your choice)
   - Do NOT initialize with README (we already have one)
3. Click **Create repository**

### Step 2: Push Code to GitHub

Open PowerShell in your project directory and run:

```powershell
# Initialize git if not already done
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/docs-node.git

# Stage all files
git add .

# Commit initial code
git commit -m "Initial commit: Complete API documentation site"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify Repository

1. Visit `https://github.com/YOUR_USERNAME/docs-node`
2. Verify all files are uploaded
3. Check that:
   - ✅ `.gitignore` is active (node_modules not listed)
   - ✅ `.github/workflows/deploy.yml` exists (CI/CD automation)
   - ✅ `netlify.toml` exists (Netlify config)
   - ✅ All documentation pages are present

---

## 2️⃣ Netlify Deployment

### Option A: Connect via GitHub (Recommended - Auto-Deploy)

1. **Link GitHub to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up (free)
   - Click **"Add new site"** → **"Import an existing project"**
   - Select **GitHub** as provider
   - Authorize Netlify to access your GitHub account
   - Select your `docs-node` repository

2. **Configure Build Settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 20.11.0 (or latest LTS)
   - Click **Deploy site**

3. **Wait for Deployment**:
   - Netlify will build and deploy automatically
   - You'll get a notification when complete
   - Your site will be live at `https://your-site-name.netlify.app`

4. **Set Custom Domain** (Optional):
   - In Netlify dashboard: **Settings** → **Domain management**
   - Add your custom domain (e.g., `docs.yourdomain.com`)
   - Follow DNS setup instructions

5. **Enable Continuous Deployment**:
   - Once connected, every push to `main` branch auto-deploys
   - Pull requests show preview URLs
   - Failed builds send email notifications

### Option B: Manual Deployment

1. **Build locally**:
```powershell
npm run build
```

2. **Install Netlify CLI** (optional):
```powershell
npm install -g netlify-cli
```

3. **Login to Netlify CLI**:
```powershell
netlify login
```

4. **Deploy manually**:
```powershell
netlify deploy --prod --dir=.next
```

---

## 3️⃣ Environment Variables (If Needed)

### Setting Env Vars in Netlify

1. Go to **Netlify Dashboard** → Your Site → **Settings** → **Environment variables**
2. Click **Add a variable**
3. Add key-value pairs (from `.env.example` if needed)
4. Redeploy site after adding variables

Example variables:
- `NEXT_TELEMETRY_DISABLED=1`
- `NEXT_PUBLIC_API_URL=https://api.example.com` (if using live API)

---

## 4️⃣ GitHub Actions CI/CD (Optional but Recommended)

The `.github/workflows/deploy.yml` enables automatic deployment on every push.

### Setup (One-time):

1. **Create Netlify Auth Token**:
   - Go to [netlify.com/user/applications](https://app.netlify.com/user/applications)
   - Click **New access token**
   - Copy the token

2. **Add Secret to GitHub**:
   - Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: Paste your Netlify token
   - Click **Add secret**

3. **Verify Workflow**:
   - Go to **Actions** tab in GitHub
   - You should see "Deploy to Netlify" workflow
   - Next time you push, it will auto-run

---

## 5️⃣ Testing Before Deployment

### Local Testing

```powershell
# Build production version
npm run build

# Start production server
npm start

# Visit http://localhost:3000
```

### Build Status Check

```powershell
# Check for build errors
npm run build

# Output should show: "✓ Compiled successfully"
# And "✓ Generating static pages (34/34)"
```

---

## 6️⃣ Monitoring & Maintenance

### Monitor Site Health

1. **Netlify Dashboard**:
   - View build logs: **Deploys** tab
   - Check analytics: **Analytics** tab
   - Monitor errors: **Functions** tab

2. **GitHub**:
   - Monitor workflows: **Actions** tab
   - Review deployments: **Deployments** tab
   - Track issues: **Issues** tab

### Common Deployment Issues

| Issue | Solution |
|-------|----------|
| Build fails with "command not found: npm" | Set Node version to 20.x in Netlify settings |
| 404 on sub-pages | Ensure `netlify.toml` redirect rule is present |
| Slow site | Check Core Web Vitals in Netlify Analytics |
| Cache not updating | Purge cache in Netlify: Site settings → Delete cache |

---

## 7️⃣ Rollback & Redeployment

### Revert to Previous Version (Netlify)

1. Go to **Deploys** tab
2. Find previous successful deployment
3. Click **...** menu → **Publish deploy**
4. Site reverts to that version

### Redeploy Latest

```powershell
git push origin main
# or manually trigger in Netlify dashboard
```

---

## 8️⃣ SSL/HTTPS & Security

✅ **Automatically handled by Netlify**:
- Free SSL certificate from Let's Encrypt
- Auto-renews every 90 days
- HTTPS enforced by default

### Additional Security (Optional)

In `netlify.toml`, custom headers are already configured for:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Content-Security-Policy

No additional action needed! ✅

---

## 📊 Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to `main` branch
- [ ] Netlify connected to GitHub
- [ ] Build settings configured correctly
- [ ] Site deployed successfully
- [ ] All pages accessible (34/34)
- [ ] Custom domain configured (optional)
- [ ] CI/CD workflow enabled
- [ ] Environment variables set (if needed)
- [ ] HTTPS verified (should be automatic)

---

## 🔗 Useful Links

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Netlify CLI Docs](https://cli.netlify.com/)

---

## ❓ Troubleshooting

### Site not updating after push
- Check GitHub Actions status
- Check Netlify build logs
- Clear browser cache (Ctrl+Shift+Delete)

### Pages show 404
- Verify all 34 pages built successfully
- Check `netlify.toml` has redirect rule
- Test locally: `npm run build && npm start`

### Build fails on Netlify
- Check Node version matches locally (20.x)
- Verify `package.json` dependencies installed
- Check build logs for specific errors

### Performance issues
- Check Netlify Analytics for bottlenecks
- Verify images are optimized
- Consider adding CDN caching (included with Netlify)

---

**Your documentation site is now production-ready! 🎉**
