# Podcast Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a GitHub Pages site for a podcast using Astro and the Starpod theme, featuring YouTube video listings and the latest social media posts from Mastodon and Threads.

**Architecture:** A static site generated via Astro. Data from YouTube, Mastodon, and Threads will be fetched at build time. GitHub Actions will handle regular site deployment and the periodic rotation of the Meta Threads access token.

**Tech Stack:** Astro, Tailwind CSS, YouTube Data API v3, Mastodon Public API, Threads Graph API, GitHub Actions.

---

### Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`

**Step 1: Scaffold Astro project**
Run: `npm create astro@latest . -- --template basic --install --no-git`
Expected: Astro project initialized.

**Step 2: Add Tailwind CSS**
Run: `npx astro add tailwind -y`
Expected: Tailwind is installed and configured.

**Step 3: Setup basic layout structure (Starpod-inspired)**
Modify `src/pages/index.astro` and `src/layouts/Layout.astro` to have basic metadata and a simple container layout.

**Step 4: Commit**
```bash
git add .
git commit -m "chore: initialize astro project with tailwind"
```

### Task 2: Implement Data Fetchers

**Files:**
- Create: `src/utils/api.js`

**Step 1: Implement YouTube fetcher**
Write a function `fetchYouTubeVideos()` in `api.js` using the `/playlistItems` endpoint to fetch the latest 40 videos from the channel's Uploads playlist. Use `import.meta.env.YOUTUBE_API_KEY`.

**Step 2: Implement Mastodon fetcher**
Write a function `fetchMastodonPost()` to query the Mastodon public API for the latest status.

**Step 3: Implement Threads fetcher**
Write a function `fetchThreadsPost()` to query the Threads Graph API (`/v1.0/me/threads`) using `import.meta.env.THREADS_ACCESS_TOKEN`.

**Step 4: Commit**
```bash
git add src/utils/api.js
git commit -m "feat: implement data fetchers for YouTube, Mastodon, Threads"
```

### Task 3: Build the Homepage and Videos Section

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/pages/videos.astro`
- Create: `src/components/SocialCard.astro`
- Create: `src/components/VideoGrid.astro`

**Step 1: Create SocialCard component**
Create a component to display Mastodon and Threads posts.

**Step 2: Create VideoGrid component**
Create a responsive grid layout to display YouTube thumbnails, titles, and links.

**Step 3: Update Homepage and Videos page**
Update `index.astro` to call `fetchMastodonPost` and `fetchThreadsPost` and display them using `SocialCard`.
Update `videos.astro` to call `fetchYouTubeVideos` and render the `VideoGrid`.

**Step 4: Commit**
```bash
git add src/
git commit -m "feat: build homepage and videos layout"
```

### Task 4: Setup GitHub Actions Automation

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.github/workflows/rotate-threads-token.yml`

**Step 1: Setup Deployment Workflow**
Create `deploy.yml` to build the Astro site and deploy to GitHub Pages. Set it to trigger on `push` and via a daily `cron` schedule. Ensure it injects environment variables.

**Step 2: Setup Threads Token Rotation Workflow**
Create `rotate-threads-token.yml` to run a monthly `cron` schedule. This will call the Meta `refresh_access_token` endpoint and use `gh secret set` with `GH_PAT` to update the `THREADS_ACCESS_TOKEN` repository secret.

**Step 3: Commit**
```bash
git add .github/
git commit -m "ci: add github actions for deploy and token rotation"
```
