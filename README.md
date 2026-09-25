# Fixora

**A full-stack home repair service booking platform** — customers request services like plumbing, electrical, AC repair, and more; admins manage and track every request through its full lifecycle with live status updates.

🔗 **Live Demo:** [fixora-repair.vercel.app](https://fixora-repair.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma) ![PostgreSQL](https://img.shields.io/badge/Postgres-Supabase-3ECF8E?logo=supabase&logoColor=white) ![Tailwind](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## What it does

Fixora connects homeowners with trusted technicians for common home repair problems — plumbing, electrical, AC repair, fan repair, painting, and appliance repair. Customers browse services, submit a request through a guided multi-step form, and track its progress in real time. Admins review, approve, schedule, and complete requests through a dedicated dashboard.

It's built as a complete two-sided platform: a customer-facing app and an internal admin panel, sharing one codebase, one database, and one auth system with role-based access control.

## Key Features

**Customer-facing**

- Browse service categories with pricing and estimated duration
- 4-step guided request wizard (service details → schedule → photo upload → review & submit)
- Personal dashboard with live stats (active, completed, pending requests, total spent)
- Real-time request tracking — status updates push to the browser instantly via Server-Sent Events, no polling or manual refresh
- Full request history and profile management
- Photo uploads (via Cloudinary) attached to a request for context

**Admin panel**

- Dashboard with revenue, request volume, and status-breakdown charts
- Request management with search and status filtering
- Controlled status workflow (Pending → Reviewing → Approved → Scheduled → In Progress → Completed) with validated transitions — an admin can't skip steps or complete a request without setting a final price
- Full status-change audit trail per request

**Platform**

- Credential-based authentication with JWT sessions and two roles (`USER` / `ADMIN`), each walled off from the other's routes
- Responsive design with scroll-reveal and micro-interaction animations
- Custom error, loading, and 404 states — consistent with the rest of the UI instead of framework defaults

## Tech Stack

| Layer             | Choice                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Framework         | Next.js 16 (App Router, Turbopack, Server Components + Server Actions) |
| Language          | TypeScript                                                             |
| UI                | Tailwind CSS v4 + daisyUI, Framer Motion                               |
| Forms             | React Hook Form                                                        |
| Database          | PostgreSQL (Supabase)                                                  |
| ORM               | Prisma 7 with the `@prisma/adapter-pg` driver adapter                  |
| Auth              | NextAuth (Credentials provider, JWT sessions)                          |
| Real-time updates | Server-Sent Events (native `EventSource`, no external service)         |
| Image storage     | Cloudinary                                                             |
| Hosting           | Vercel                                                                 |

## A few engineering decisions worth noting

- **Live status tracking without a websocket server.** Request tracking updates in real time using a lightweight SSE endpoint (`/api/requests/[id]/events`) instead of pulling in a full realtime service — simpler infra, no extra moving parts, and it fits the read-heavy, single-direction nature of status updates.
- **Serverless-aware database connections.** Running Prisma against Supabase from Vercel's serverless functions means every concurrent request can open its own DB connection. The app uses Supabase's transaction pooler in production (with a singleton Prisma client to avoid leaking connections across dev hot-reloads) to stay within connection limits under real traffic.
- **Data-level caching over full-page caching.** Pages that check the session (to redirect admins) can't use Next's full route cache, so read-heavy, rarely-changing data (service categories, public stats) is cached at the query level with `unstable_cache` instead — cut a cold service-detail load from ~870ms to ~35ms on a cache hit, without risking stale data on anything user-specific or status-driven.
- **Validated status transitions.** The admin status-update flow enforces both which transitions are legal (e.g. you can't jump from Pending straight to Completed) and business rules on top (a request can't be marked Completed without a final price, since that price feeds the customer's "Total Spent" stat).

## Getting Started

### Prerequisites

- Node.js 20+
- A PostgreSQL database (e.g. a free [Supabase](https://supabase.com) project)
- A [Cloudinary](https://cloudinary.com) account (for photo uploads)

### Setup

```bash
git clone https://github.com/mehedi-hasan02/fixora.git
cd fixora
npm install
```

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_SECRET="a-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Run migrations and start the dev server:

```bash
npx prisma migrate deploy
npm run dev
```

The app will be running at `http://localhost:3000`.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # eslint
npm run seed    # seed the database (prisma/seed.ts)
```

## Project Structure

```
src/
├── app/                  # Next.js App Router — pages, layouts, API routes
│   ├── admin/            # Admin dashboard, request management
│   ├── dashboard/        # Customer dashboard, history, profile
│   ├── services/         # Service browsing, detail, request wizard
│   └── api/               # SSE endpoint for live request tracking
├── action/server/        # Server Actions — all DB writes/reads live here
├── components/           # UI components, organized by feature area
└── lib/                  # Prisma client, auth helpers, shared utilities
prisma/
├── schema.prisma         # Database schema
└── migrations/           # Migration history
```

## Data Model

Five core models: `User`, `ServiceCategory`, `ServiceRequest`, `RequestImage`, and `RequestStatusHistory` — the last one gives every request a full, timestamped audit trail of who changed its status and when.

## Deployment

Deployed on Vercel with a Supabase Postgres database. If you're deploying your own copy:

- Use Supabase's **Transaction pooler** connection string for `DATABASE_URL` on Vercel (session pooler will exhaust its connection limit under serverless concurrency)
- Set the Vercel function region close to your database region to minimize query latency
- Run `npx prisma migrate deploy` against a **session-mode** connection (transaction pooling doesn't support the locks migrations need)

## Author

Built by [Mehedi Hasan](https://github.com/mehedi-hasan02).
