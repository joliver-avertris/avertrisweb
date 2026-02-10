# Avertris Website — Deployment Guide

## Project Structure

```
avertris-website/
├── index.html          ← Entry point (meta tags, fonts, global CSS)
├── package.json        ← Dependencies (React + Vite)
├── vite.config.js      ← Build config
└── src/
    ├── main.jsx        ← React root mount
    └── App.jsx         ← Full website (all pages, i18n, responsive)
```

---

## Step 1: Push to GitHub

1. Create a new repo on GitHub (e.g. `avertris-website`)
2. From the `avertris-website` folder on your computer, run:

```bash
git init
git add .
git commit -m "Initial commit — Avertris website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/avertris-website.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel (Recommended — free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `avertris-website` repo
4. Vercel auto-detects Vite — just click **"Deploy"**
5. Wait ~60 seconds. You'll get a live URL like `avertris-website.vercel.app`

### Alternative: Netlify

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **"Add new site" → "Import an existing project"**
3. Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click **"Deploy site"**

---

## Step 3: Connect Your Domain via GHL DNS

Assuming your domain is `avertris.com` and DNS is managed in Go High Level:

### For Vercel:

1. In Vercel, go to **Project Settings → Domains**
2. Add `avertris.com` and `www.avertris.com`
3. Vercel will tell you what DNS records to add

4. In **Go High Level → Settings → Domains → DNS Records**, add:

| Type  | Name | Value                      |
|-------|------|----------------------------|
| A     | @    | 76.76.21.21                |
| CNAME | www  | cname.vercel-dns.com       |

5. Back in Vercel, click **"Verify"** — SSL is issued automatically

### For Netlify:

1. In Netlify, go to **Domain Management → Add custom domain**
2. Add `avertris.com`

3. In **Go High Level DNS**, add:

| Type  | Name | Value                              |
|-------|------|------------------------------------|
| A     | @    | 75.2.60.5                          |
| CNAME | www  | your-site-name.netlify.app         |

4. Enable HTTPS in Netlify under **Domain Management → HTTPS**

---

## Step 4: Verify

- Visit `https://avertris.com` — should load the website
- Visit `https://www.avertris.com` — should also work
- Test on mobile to confirm responsive design
- Toggle EN/ES to confirm bilingual works
- DNS propagation can take 5 minutes to 48 hours (usually under 30 min)

---

## Local Development

To run locally before deploying:

```bash
cd avertris-website
npm install
npm run dev
```

Opens at `http://localhost:5173`

To preview the production build:

```bash
npm run build
npm run preview
```

---

## Updating the Site

After making changes to `src/App.jsx`:

```bash
git add .
git commit -m "Update website"
git push
```

Vercel/Netlify auto-deploys on every push to `main`.

---

## Important Notes

- The Poppins font loads from Google Fonts (CDN)
- Hero background images load from Unsplash — replace with your own for production
- Update `hello@avertris.com` and social links in the code with real URLs
- For SEO: update the `<title>` and `<meta description>` in `index.html`
- For analytics: add your Google Analytics or GHL tracking script to `index.html`
