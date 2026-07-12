# Carousel Agent

An autonomous agent that designs an on-brand carousel every day and publishes it to **Instagram**, **Threads**, and **LinkedIn**.

```
brand/brandbook.yml ──▶ Claude writes the copy ──▶ HTML/CSS slides rendered to PNG ──▶ published to all 3 platforms
        (you)              (generate)                     (render)                          (publish, daily cron)
```

- **Your brand book is the single source of truth.** Colors, fonts, layout, voice, content pillars, CTA — all in [`brand/brandbook.yml`](brand/brandbook.yml). Change it, commit, and every future carousel follows it.
- **Claude Opus writes the content** — hook slide, one idea per slide, CTA slide, caption, and hashtags — steered by your voice rules and topic queue.
- **Slides are real HTML/CSS** rendered with headless Chromium at 1080×1350, so the design is fully controllable and pixel-perfect.
- **GitHub Actions runs it daily** and keeps a history so topics never repeat.

## Quick start (see your brand style in 2 minutes)

```bash
npm install
npx playwright install chromium   # once, if no system Chromium
npm run preview                   # renders a sample carousel to out/<today>/
```

Open `out/<today>/slide-*.png`, then tweak `brand/brandbook.yml` (colors, fonts, layout) and re-run `npm run preview` until it looks like *your* brand.

## Full local run

```bash
cp .env.example .env   # fill in your keys
set -a; source .env; set +a
npm run run-all -- --no-publish   # generate + render, don't post
npm run run-all                   # generate + render + post everywhere
```

Individual steps: `npm run generate`, `npm run render`, `npm run publish`. Use `PLATFORMS=linkedin npm run publish` to post to a subset.

## Credentials you need (one-time setup)

| Secret | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys |
| `IG_USER_ID`, `IG_ACCESS_TOKEN` | Meta developer app → Instagram Graph API. Your Instagram must be a **Business/Creator** account linked to a Facebook Page. Token needs `instagram_basic`, `instagram_content_publish`, `pages_read_engagement`. Use a long-lived token. |
| `THREADS_USER_ID`, `THREADS_ACCESS_TOKEN` | Meta developer app with the **Threads API** use case. Token needs `threads_basic`, `threads_content_publish`. |
| `LINKEDIN_ACCESS_TOKEN`, `LINKEDIN_AUTHOR_URN` | LinkedIn developer app with **Share on LinkedIn** (member posts, `w_member_social`) or **Community Management API** (company pages). URN is `urn:li:person:...` or `urn:li:organization:...`. |

Add these as **repository secrets** (Settings → Secrets and variables → Actions) for the daily automation.

### Image hosting (Instagram & Threads only)

Meta's APIs fetch images from a public URL. By default the workflow commits each day's slides to `published/<date>/` and serves them via `raw.githubusercontent.com` — **this requires the repo to be public**. If you want the repo private, set `PUBLIC_IMAGE_BASE_URL` to any public host (S3, Cloudflare R2, etc.) and upload the files there before publishing. LinkedIn is unaffected (binary upload).

### Token lifetimes — worth knowing

- Instagram & Threads long-lived tokens last ~60 days. Refresh them periodically or the workflow will start failing with an auth error.
- LinkedIn member tokens last ~60 days and can't be auto-refreshed without OAuth; plan to rotate them.
- The workflow fails loudly per-platform: if one platform's token expires, the others still post.

## Daily automation

[`.github/workflows/daily-carousel.yml`](.github/workflows/daily-carousel.yml) runs at **03:30 UTC (09:00 IST)** daily:

1. Claude generates the plan (topic queue in `content/topics.yml`, deduped against `content/history.json`)
2. Slides render to PNG
3. Slides are committed to `published/<date>/` so Meta can fetch them
4. Posts go out to all three platforms
5. History is committed

You can also trigger it manually from the Actions tab (with an option to skip posting — good for testing). To limit platforms without editing code, set a repository **variable** `PLATFORMS` (e.g. `linkedin` while your Meta app review is pending).

## Customizing the design

Everything visual lives in `brand/brandbook.yml`; the slide markup lives in [`src/template.js`](src/template.js). Slide kinds:

- `hook` — big serif title, "SWIPE →" prompt
- `content` — numbered kicker badge, title + supporting body
- `cta` — accent card with your handle/site, CTA text

Change format to `square` (1080×1080) in the brand book if you prefer; portrait 4:5 gets the most feed real estate on all three platforms.

## Project layout

```
brand/brandbook.yml    ← your visual identity + voice (edit this!)
content/topics.yml     ← optional topic queue
content/history.json   ← what's been posted (auto-maintained)
src/generate.js        ← Claude → structured carousel plan
src/template.js        ← brand tokens → slide HTML
src/render.js          ← HTML → PNG via Playwright
src/publish/*.js       ← Instagram / Threads / LinkedIn API clients
src/index.js           ← CLI: generate | render | publish | run | preview
out/<date>/            ← daily artifacts (gitignored)
published/<date>/      ← publicly hosted slides (committed by the workflow)
```
