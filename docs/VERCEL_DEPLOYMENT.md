# TradeVision — Vercel Deployment Guide

Deploy TradeVision to Vercel with Clerk authentication and Neon Postgres for per-user learning progress.

**Repo:** https://github.com/vevadeco/tradevision

---

## Prerequisites

- GitHub account with the `tradevision` repo pushed
- [Vercel account](https://vercel.com/signup) (free tier works)
- [Clerk account](https://clerk.com) (free tier works)
- [Neon account](https://neon.tech) (free tier works) — or use Vercel Postgres (Neon-backed)

Estimated setup time: **15–20 minutes**

---

## Architecture on Vercel

| Component | Service | Purpose |
|-----------|---------|---------|
| App | Vercel | Next.js 16 hosting, serverless API routes |
| Auth | Clerk | Sign-in, sign-up, session management |
| Database | Neon Postgres | Per-user XP, scores, completions, badges |
| Charts | MEXC public API | Futures + spot klines (no keys required) |

---

## Step 1 — Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. **Import** `vevadeco/tradevision` from GitHub.
3. Framework preset should auto-detect **Next.js**.
4. **Do not deploy yet** — add environment variables first (Step 2–3).

Default build settings (no changes needed):

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `.next` (default) |
| Install command | `npm install` |
| Node.js version | 20.x (recommended) |

No `vercel.json` is required for this project.

---

## Step 2 — Set up Clerk

### Create a Clerk application

1. Open [dashboard.clerk.com](https://dashboard.clerk.com) → **Add application**.
2. Name it `TradeVision` (or similar).
3. Enable sign-in methods you want (Email, Google, etc.).

### Copy API keys

From **Configure → API Keys**:

| Vercel env var | Clerk value |
|----------------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key (`pk_test_…` or `pk_live_…`) |
| `CLERK_SECRET_KEY` | Secret key (`sk_test_…` or `sk_live_…`) |

Also set these (match the app defaults):

```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Add keys to Vercel

In your Vercel project → **Settings → Environment Variables**, add all four variables above for **Production**, **Preview**, and **Development**.

> Use **test** keys (`pk_test_` / `sk_test_`) for preview deployments; switch to **live** keys when you go to production.

---

## Step 3 — Set up Postgres (Neon)

TradeVision stores each user's progress in a `user_progress` table via Drizzle ORM.

### Option A — Vercel Postgres (recommended)

1. Vercel project → **Storage** tab → **Create Database** → **Postgres**.
2. Vercel provisions a Neon database and auto-injects `DATABASE_URL` into your project.
3. Copy the **pooled** connection string if both pooled and direct are shown (serverless-friendly).

### Option B — Standalone Neon project

1. Create a project at [console.neon.tech](https://console.neon.tech).
2. Copy the connection string (must include `?sslmode=require`).
3. Add to Vercel as `DATABASE_URL` for all environments.

Example format:

```
postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

---

## Step 4 — Push the database schema

Run once per database (local, preview, production):

```bash
cd tradevision
DATABASE_URL="your-neon-connection-string" npm run db:push
```

This creates the `user_progress` table:

```sql
user_id          text PRIMARY KEY   -- Clerk user ID
xp               integer
total_score      integer
completed_lessons, completed_case_studies, badges  jsonb
completed_tutorials  jsonb
updated_at       timestamptz
```

Verify with Drizzle Studio (optional):

```bash
DATABASE_URL="..." npm run db:studio
```

> **Important:** Run `db:push` against your **production** `DATABASE_URL` before users sign up in production.

---

## Step 5 — Optional MEXC API keys

Public kline endpoints work **without** authentication. Keys are only needed for future authenticated MEXC contract endpoints.

| Variable | Required |
|----------|----------|
| `MEXC_API_KEY` | No |
| `MEXC_API_SECRET` | No |

Add in Vercel → Environment Variables if you have them. Never commit real keys to Git.

---

## Step 6 — Deploy

1. Click **Deploy** (or push to `master` if already connected).
2. Wait for the build — `npm run build` must complete successfully.
3. Note your deployment URL, e.g. `https://tradevision-xxx.vercel.app`.

---

## Step 7 — Configure Clerk for your Vercel domain

After the first deploy, update Clerk so auth redirects work:

1. Clerk dashboard → your app → **Configure → Paths** (or **Domains**).
2. Add your Vercel URLs:
   - Production: `https://your-app.vercel.app`
   - Preview (optional): `https://*.vercel.app`
3. Under **Allowed redirect URLs**, include:
   - `https://your-app.vercel.app/*`
   - `https://your-app.vercel.app/sign-in`
   - `https://your-app.vercel.app/sign-up`
4. Save changes.

Redeploy if needed after env var updates: **Deployments → … → Redeploy**.

---

## Step 8 — Verify the deployment

Checklist:

- [ ] Homepage loads at your Vercel URL
- [ ] **Learn**, **Case Studies**, **Tutorials** pages load (public, no sign-in)
- [ ] Candlestick charts render (MEXC data or fallbacks)
- [ ] **Sign up** / **Sign in** works via Clerk
- [ ] Complete a lesson quiz while signed in — XP should persist after refresh
- [ ] Sign out and sign back in — progress is still there (Postgres)

### Test the progress API

While signed in, open DevTools → Network and complete a module. You should see:

- `GET /api/progress` → 200 with your progress JSON
- `PUT /api/progress` → 200 after completing content

---

## Environment variables reference

| Variable | Required | Environments |
|----------|----------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | All |
| `CLERK_SECRET_KEY` | Yes | All |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Yes | All |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Yes | All |
| `DATABASE_URL` | Yes | All |
| `MEXC_API_KEY` | No | All |
| `MEXC_API_SECRET` | No | All |

Copy from `.env.example` locally:

```bash
cp .env.example .env.local
```

---

## Custom domain (optional)

1. Vercel project → **Settings → Domains** → add your domain.
2. Update DNS as instructed by Vercel.
3. Add the custom domain to Clerk **Allowed origins** and **Redirect URLs**.
4. Redeploy.

---

## Troubleshooting

### `MIDDLEWARE_INVOCATION_FAILED` (500)

This almost always means **Clerk environment variables are missing** on Vercel.

1. Vercel project → **Settings → Environment Variables**
2. Add for **Production** (and Preview):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = `pk_test_…` or `pk_live_…`
   - `CLERK_SECRET_KEY` = `sk_test_…` or `sk_live_…`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL` = `/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL` = `/sign-up`
3. **Redeploy** (Deployments → … → Redeploy) — env vars do not apply to past builds.

Without these keys the app will load in browse-only mode but sign-in and progress saving will not work.

### Build fails on Vercel

- Check **Deployment logs** for TypeScript or missing env errors.
- Clerk keys are not required at build time, but `DATABASE_URL` may be needed if any build step touches the DB (this project uses fallbacks at build — should not block).

### Sign-in redirects to wrong URL

- Confirm Clerk redirect URLs include your exact Vercel domain (with `https://`).
- Ensure `NEXT_PUBLIC_CLERK_SIGN_IN_URL` and `NEXT_PUBLIC_CLERK_SIGN_UP_URL` are set in Vercel.

### Progress not saving

- Confirm `DATABASE_URL` is set in Vercel for the active environment.
- Run `npm run db:push` against that database.
- Check Vercel **Functions** logs for `/api/progress` errors.
- User must be **signed in** — progress is not stored for anonymous users.

### Charts empty

- MEXC public API may rate-limit or be unreachable — embedded fallbacks should still render candles.
- Check `/api/klines` in Network tab for 502 errors.

### Preview deployments vs production

- Use separate Clerk **test** keys for preview branches if desired.
- Use the same or a separate Neon branch/database for preview (Neon supports database branching).

---

## Deploy via Vercel CLI (alternative)

```bash
npm i -g vercel
cd tradevision
vercel login
vercel link          # link to your Vercel project
vercel env pull      # pull env vars to .env.local
vercel --prod        # production deploy
```

---

## Going to production checklist

- [ ] Switch Clerk to **live** keys (`pk_live_` / `sk_live_`)
- [ ] Production `DATABASE_URL` with schema pushed via `db:push`
- [ ] Custom domain configured (optional)
- [ ] Clerk production domain allowlist updated
- [ ] Rotate any API keys that were ever shared in chat or logs
- [ ] Enable Vercel **Deployment Protection** if the app is not public yet

---

*Educational purposes only. Not financial advice.*
