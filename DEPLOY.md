# Vercel Deployment Guide — Swiggy Chatbot Case Study

## Pre-Deployment Checklist

| Item | Status |
|------|--------|
| `vercel.json` configured | ✅ Already present |
| Build command | `npm run build` |
| Output directory | `.next` |
| Framework preset | `nextjs` |
| Node.js version | ≥ 18 |

## Vercel Dashboard Environment Variables

> **None required.** This is a fully static Next.js application with no server-side API routes or secrets.

## Deployment Steps

### Option 1: Git Integration (Recommended)
```bash
# 1. Push this directory to a GitHub/GitLab/Bitbucket repository
git init && git add . && git commit -m "Initial commit"
git remote add origin <YOUR_REPO_URL>
git push -u origin main

# 2. Import the repository on Vercel Dashboard
#    → https://vercel.com/new
#    → Set "Root Directory" to: case-study
#    → Framework will auto-detect as Next.js
```

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from the case-study directory
cd "Swiggy Chatbot Issue/case-study"
vercel --prod
```

## Existing `vercel.json` Audit

```json
{
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "framework": "nextjs"
}
```

**Verdict:** ✅ Configuration is correct and complete. No changes needed.

## Free Tier Limits

| Resource | Vercel Free Tier | This Project |
|----------|-----------------|--------------|
| Bandwidth | 100 GB/month | ~1 MB/visit — well within limits |
| Serverless Functions | 50 MB bundle | No serverless functions |
| Build Time | 6,000 min/month | ~30 seconds per build |
| Deployments | Unlimited | ✅ |

## Cold Start Behavior

This is a statically-exported Next.js app — **no cold starts**. Pages are served from Vercel's edge CDN.
