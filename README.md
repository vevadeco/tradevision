# TradeVision

Interactive crypto trading academy — futures perps and spot — with personal progress tracking, XP, badges, and MEXC chart data.

## Features

- **Futures (L1–L3)** — USDT-M perp courses from candlestick basics to confluence strategies
- **Spot** — Cash-market lessons, case studies, and pattern drills
- **Personal accounts** — Sign in with Clerk; progress saved to Postgres per user
- **Gamification** — XP, levels, scores, badges
- **Live charts** — MEXC futures + spot klines with offline fallbacks

## Local Development

```bash
npm install
cp .env.example .env.local
# Fill in Clerk keys + DATABASE_URL (see below)
npm run db:push    # create tables
npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `DATABASE_URL` | Yes | Postgres connection string (Neon recommended) |
| `MEXC_API_KEY` | No | Optional MEXC authenticated endpoints |
| `MEXC_API_SECRET` | No | Optional MEXC secret |

Never commit `.env.local` or real secrets.

## Database

**Stack:** Drizzle ORM + Neon Postgres (works with Vercel Postgres)

**Schema:** `user_progress` table — one row per Clerk `userId` with XP, scores, completed modules, badges (JSONB).

```bash
npm run db:push      # push schema to DATABASE_URL
npm run db:studio    # optional Drizzle Studio
```

## Auth

**Provider:** [Clerk](https://clerk.com) — sign-in/sign-up via `/sign-in` and `/sign-up`.

- Browse courses without an account
- **Sign in required** to persist XP, completions, and badges
- Progress API: `GET/PUT /api/progress` (authenticated)

## Data Sources

- **Futures:** `GET https://contract.mexc.com/api/v1/contract/kline/{symbol}`
- **Spot:** `GET https://api.mexc.com/api/v3/klines`

Embedded fallbacks used when APIs are unavailable.

## Deploy to Vercel

See **[docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md)** for the full step-by-step guide (Clerk, Neon Postgres, env vars, schema push, and verification).

Quick overview:

1. Import [github.com/vevadeco/tradevision](https://github.com/vevadeco/tradevision) on Vercel
2. Add Clerk + `DATABASE_URL` environment variables
3. Run `DATABASE_URL="..." npm run db:push` against production
4. Configure Clerk redirect URLs for your Vercel domain
5. Deploy

## Stack

- Next.js 16 (App Router)
- React 19 · TypeScript · Tailwind CSS 4
- Clerk · Drizzle · Neon Postgres

---

*Educational purposes only. Not financial advice.*
