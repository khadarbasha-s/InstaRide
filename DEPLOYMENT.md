# Deploying FastRental to Vercel

Total time: **~20 minutes** for a first deploy.

You'll need free accounts on **GitHub** (or GitLab/Bitbucket), **Vercel**, and **Neon** (Postgres).

---

## Why these choices

| Service | Why | Cost |
|---|---|---|
| **Vercel** | Built for Next.js. Auto-deploys on git push. Free for hobby projects. | Free tier covers this site |
| **Neon** | Serverless Postgres. Free tier with 0.5GB storage. Native pgbouncer for serverless apps. | Free |
| **Resend** *(optional)* | Sends lead notification emails. Skip if you'll handle leads from the admin dashboard manually. | Free 100 emails/day |

SQLite is **not** an option on Vercel — serverless functions are stateless and can't reliably write to a file system. That's the only mandatory change from the local setup.

---

## Step 1 — Push your code to GitHub

```bash
cd ~/Documents/Claude/Projects/fastrental

# If git isn't set up yet:
git init
git add .
git commit -m "Initial commit"

# Create a new repo on github.com (private is fine), then:
git remote add origin https://github.com/YOUR_USERNAME/fastrental.git
git branch -M main
git push -u origin main
```

> **Note:** `prisma/dev.db` is in `.gitignore` — your local SQLite data is NOT pushed. You'll re-seed fresh data on Neon.

---

## Step 2 — Create a Neon Postgres database

1. Go to **https://neon.tech** and sign up (use GitHub for SSO — fastest)
2. Click **"Create a project"**
3. Project settings:
   - Name: `fastrental`
   - Postgres version: 16 (default)
   - Region: pick one near your customers (e.g. `Asia Pacific (Mumbai)` or `Asia Pacific (Singapore)`)
4. After creation, you'll see a **connection string** that looks like:
   ```
   postgresql://USER:PASS@ep-xxx.aws.neon.tech/neondb?sslmode=require
   ```
5. **Copy two versions** of this URL from the Neon dashboard:
   - **Pooled connection** (with `pgbouncer=true` in the URL) — use this for `DATABASE_URL` in Vercel
   - **Direct connection** (without pgbouncer) — use this only for migrations from your laptop

> Tip: Click "Connection details" in the Neon UI → toggle the "Pooled connection" switch to see both URLs.

---

## Step 3 — Switch your local project to Postgres + seed Neon

Run these in your terminal:

```bash
cd ~/Documents/Claude/Projects/fastrental

# 1. Switch schema to Postgres (one-time)
pnpm db:use-postgres

# 2. Point at your Neon database — use the DIRECT (non-pooled) URL
export DATABASE_URL="postgresql://USER:PASS@ep-xxx.aws.neon.tech/neondb?sslmode=require"

# 3. Create all tables in Neon
pnpm prisma db push

# 4. Seed cities, locations, cars, FAQs, blogs, admin user
pnpm db:seed
```

You should see:
```
✓ Seeded.
   - admin user: admin@fastrental.local
   - Cities: 3 active (Goa, Jaipur, Chandigarh)
   - Cars: 72 total
   - Locations: 6 (Goa)
   - FAQs: 8
   - Blog posts: 3
```

> The `prisma/schema.prisma` file is now the Postgres version. The SQLite version is preserved at `prisma/schema.postgres.prisma` if you want to switch back for local dev. Or just keep using Neon for both dev and prod.

Commit and push:

```bash
git add prisma/schema.prisma
git commit -m "Switch to Postgres for deployment"
git push
```

---

## Step 4 — Generate a strong NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output. You'll paste this into Vercel in step 5.

---

## Step 5 — Create the Vercel project

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **"Add New" → "Project"**
3. Import your `fastrental` GitHub repo
4. Framework should auto-detect as **Next.js**
5. Before clicking Deploy, expand **"Environment Variables"** and add all of these:

| Variable | Value | Where to get it |
|---|---|---|
| `DATABASE_URL` | `postgresql://...?pgbouncer=true&connection_limit=1` | **Pooled** URL from Neon |
| `NEXTAUTH_SECRET` | (base64 string) | The `openssl` output from step 4 |
| `NEXTAUTH_URL` | `https://YOUR-PROJECT.vercel.app` | The URL Vercel will assign — see below |
| `NEXT_PUBLIC_SITE_URL` | `https://YOUR-PROJECT.vercel.app` | Same as above |
| `NEXT_PUBLIC_PHONE` | `+918824583708` | Your business number |
| `NEXT_PUBLIC_PHONE_DISPLAY` | `+91 88245 83708` | Display format |
| `NEXT_PUBLIC_WHATSAPP` | `918824583708` | No `+` for WhatsApp URLs |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `bookings@yourdomain.com` | Your email |
| `ADMIN_EMAIL` | `you@example.com` | Admin login email (already created in step 3) |
| `ADMIN_PASSWORD` | (strong password) | Admin password (already created in step 3) |
| `ADMIN_NAME` | `Your Name` | Admin display name |

**For NEXTAUTH_URL**: Vercel assigns a URL based on your project name. You can:
- Set it to `https://${VERCEL_URL}` placeholder, OR
- Deploy once first, see the URL Vercel gives you, then update this var

Easiest: deploy first with any placeholder, then come back and set it to the real Vercel URL.

6. Click **Deploy**

---

## Step 6 — Watch the build

The first deploy takes ~3 minutes. Vercel will:
1. Install dependencies with pnpm
2. Run `prisma generate` (via the postinstall hook)
3. Build with `next build`
4. Deploy 39 pages + 72 car detail pages + API routes

If the build fails:
- **"Environment variable not found: DATABASE_URL"** → You forgot to set env vars before clicking Deploy. Go to Project Settings → Environment Variables, add them, then redeploy from the Deployments tab.
- **"Cannot find module @prisma/client"** → Postinstall didn't run. Try: in Vercel project settings → "Override" the install command to `pnpm install && pnpm prisma generate`

---

## Step 7 — Configure NEXTAUTH_URL

Once deployed, Vercel gives you a URL like `https://fastrental-xyz.vercel.app`.

1. Go to **Project Settings → Environment Variables**
2. Edit `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to that exact URL (with `https://`, no trailing slash)
3. Go to **Deployments → click the latest → "Redeploy"** (with "Use existing build cache" unchecked)

---

## Step 8 — Verify it's working

Visit your Vercel URL. Check:

- [ ] **Homepage** renders with hero, cities, all sections
- [ ] **`/goa/self-drive-car-rental-goa`** shows 31 cars
- [ ] **`/jaipur/self-drive-car-rental-jaipur`** shows 29 cars
- [ ] **`/chandigarh/self-drive-car-rental-chandigarh`** shows 12 cars
- [ ] Click any car → detail page loads with images
- [ ] **Contact form** at `/contact-us` — submit a test lead, you should get a success toast
- [ ] **`/admin/login`** — sign in with the admin credentials you set
- [ ] **`/admin/leads`** — the test lead you just submitted should appear here

---

## Optional: Custom domain

1. Buy a domain (Namecheap, Google Domains, etc.)
2. In Vercel: Project Settings → **Domains** → Add your domain
3. Vercel shows you DNS records to add (one A record + one CNAME)
4. Add them at your registrar — propagation takes 5–30 minutes
5. Once verified, **update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL`** to the new domain and redeploy

---

## Optional: Email notifications (Resend)

For lead form notifications to actually send:

1. Sign up at **https://resend.com**
2. Verify a sending domain (or use the test `onboarding@resend.dev` for now)
3. Create an API key
4. Add to Vercel env vars:
   - `RESEND_API_KEY="re_..."`
   - `EMAIL_FROM="FastRental <bookings@yourdomain.com>"`
   - `LEAD_NOTIFY_EMAIL="you@example.com"` (where leads should be sent)
5. Redeploy

Without these set, the form still works — emails just get skipped silently.

---

## Optional: Analytics

Set any of these env vars to enable tracking:

- `NEXT_PUBLIC_GA_ID="G-XXXXX"` — Google Analytics 4
- `NEXT_PUBLIC_CLARITY_ID="xxxxx"` — Microsoft Clarity
- `NEXT_PUBLIC_META_PIXEL_ID="xxxxx"` — Meta Pixel

The script tags need to be wired up in `app/layout.tsx` (not yet implemented — see roadmap).

---

## Day-2 operations

### Push code updates
Just `git push` — Vercel auto-deploys.

### Add/edit cars
- **Quick way**: SSH into nowhere, just connect to Neon via Prisma Studio:
  ```bash
  export DATABASE_URL="postgresql://...?sslmode=require"
  pnpm db:studio
  ```
  Opens a UI at http://localhost:5555 — edit any row, save.
- **Better way**: Use the `/admin/cars` UI in production (toggle availability, edit prices in browser)
- **Bulk way**: Edit `prisma/seed.ts`, then re-run against Neon:
  ```bash
  DATABASE_URL="postgresql://..." pnpm db:seed
  ```

### Reset admin password (if forgotten)
There's no UI for this in v1. Connect to Neon via Studio and update `User.passwordHash` to a bcrypt hash. Or run this one-liner:

```bash
DATABASE_URL="postgresql://..." pnpm tsx -e "
import bcrypt from 'bcryptjs';
import { prisma } from './lib/prisma';
(async () => {
  const hash = await bcrypt.hash('your-new-password', 12);
  await prisma.user.update({
    where: { email: 'admin@fastrental.local' },
    data: { passwordHash: hash }
  });
  console.log('Password reset');
  await prisma.\$disconnect();
})();
"
```

### Monitor errors
Vercel project → **Logs** tab. Filter by "Error" to see runtime errors from API routes.

### Monitor uptime / performance
Vercel project → **Analytics** tab (free) shows Web Vitals.

---

## Cost projection

| Service | Free tier limit | When you'd exceed it |
|---|---|---|
| Vercel | 100GB bandwidth/month, 100GB-hours of function execution | ~10,000 daily visitors |
| Neon | 0.5GB storage, 191 compute hours/month | When the DB grows or stays awake constantly |
| Resend | 100 emails/day (3,000/month) | More than 100 leads/day |

For a small Indian self-drive business with low–medium traffic, **all three stay free**. If you outgrow Neon's free tier, upgrade to their $19/month Launch plan.

---

## Troubleshooting

**Build fails with "DATABASE_URL is missing"**
→ Env vars weren't set before first deploy. Set them in Project Settings → Environment Variables → redeploy.

**Login at `/admin/login` returns "Invalid email or password" even with the right password**
→ Your `ADMIN_EMAIL`/`ADMIN_PASSWORD` env vars are seed inputs, NOT the live login. The actual login uses what's in the Neon `User` table. If they don't match, edit the User row via Prisma Studio or re-run `pnpm db:seed`.

**`/admin/*` redirects in an infinite loop**
→ `NEXTAUTH_URL` doesn't match the URL you're visiting. Set it to the exact deployed URL (https, no trailing slash) and redeploy.

**Contact form returns 500**
→ Check Vercel logs. Usually a transient Neon cold-start. If persistent, verify `DATABASE_URL` uses the pooled connection (`?pgbouncer=true`) for serverless compatibility.

**SVG car images don't render**
→ Make sure `next.config.ts` has `dangerouslyAllowSVG: true` (it does in this project). If you forked and removed it, restore it.

---

## Going back to SQLite for local dev (optional)

If you want to keep developing locally on SQLite while production uses Postgres:

```bash
# In your local checkout (after the postgres switch)
git stash    # save the postgres schema change locally
pnpm prisma generate
```

Then never commit `prisma/schema.prisma` again — keep it pointing at `sqlite` locally, and use `prisma/schema.postgres.prisma` only when deploying.

This is messy though. Easier: just use Neon for both local dev and production. Free tier covers it.
