# Database Setup Guide

This guide will walk you through setting up the database for the Pixel AI Video Platform.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- A Cloudflare account with R2 enabled

---

## Step 1: Install Dependencies

```bash
cd pixel-ai-video
npm install @prisma/client @supabase/supabase-js @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
npm install -D prisma tsx
```

---

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `pixel-ai-video`
   - **Database Password**: (save this!)
   - **Region**: Choose closest to you
4. Wait for project to be created (~2 minutes)

### Get Connection Strings

1. In your Supabase project, go to **Settings** → **Database**
2. Scroll to **Connection String** section
3. Copy the **URI** (connection pooling) - this is your `DATABASE_URL`
4. Copy the **Direct connection** string - this is your `DIRECT_URL`
5. Replace `[YOUR-PASSWORD]` with your database password

### Enable pgvector Extension

1. In Supabase, go to **Database** → **Extensions**
2. Search for `vector`
3. Enable the `vector` extension

### Get API Keys

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

## Step 3: Create Cloudflare R2 Bucket

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **R2** in the sidebar
3. Click **Create bucket**
4. Name it: `pixel-ai-videos`
5. Click **Create bucket**

### Get R2 Credentials

1. Go to **R2** → **Manage R2 API Tokens**
2. Click **Create API token**
3. Give it a name: `pixel-ai-video-app`
4. Permissions: **Object Read & Write**
5. Click **Create API Token**
6. Save:
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`
7. Your Account ID is shown in the R2 overview → `R2_ACCOUNT_ID`

### Configure CORS (Optional, for direct uploads)

1. In your bucket settings, go to **Settings** → **CORS Policy**
2. Add this configuration:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

---

## Step 4: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in all the values you collected:

```env
# Database (from Supabase)
DATABASE_URL="postgresql://postgres.xxx:password@aws-0-region.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.xxx:password@aws-0-region.compute.amazonaws.com:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGc..."

# Cloudflare R2
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key"
R2_SECRET_ACCESS_KEY="your-secret-key"
R2_BUCKET_NAME="pixel-ai-videos"
R2_PUBLIC_URL="https://your-account-id.r2.cloudflarestorage.com"

# OpenAI (optional, for embeddings)
OPENAI_API_KEY="sk-..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

---

## Step 5: Initialize Database

### Generate Prisma Client

```bash
npx prisma generate
```

### Create Initial Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in your Supabase database
- Generate the Prisma client
- Ask if you want to run the seed (say yes!)

### Manually Run Seed (if needed)

```bash
npx tsx prisma/seed.ts
```

---

## Step 6: Verify Setup

### Check Database in Supabase

1. Go to **Table Editor** in Supabase
2. You should see all tables:
   - users
   - videos
   - video_files
   - ai_metadata
   - video_embeddings
   - categories
   - tags
   - video_tags
   - downloads
   - api_keys
   - processing_jobs

### Check Seed Data

Run this query in Supabase SQL Editor:

```sql
SELECT COUNT(*) FROM videos;
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM categories;
```

You should see:
- 8 videos
- 4 users
- 8 categories

---

## Step 7: Test Database Connection

Create a test file `test-db.ts`:

```typescript
import prisma from './src/lib/db'

async function test() {
  const videos = await prisma.video.findMany({
    take: 5,
    include: {
      uploader: true,
      category: true,
    },
  })

  console.log('Videos:', videos)
}

test()
```

Run it:
```bash
npx tsx test-db.ts
```

---

## Common Issues

### Issue: "Can't reach database server"

**Solution**: Check your `DATABASE_URL` and `DIRECT_URL` are correct. Make sure you replaced `[YOUR-PASSWORD]` with your actual password.

### Issue: "Extension 'vector' does not exist"

**Solution**: Enable the pgvector extension in Supabase (Database → Extensions → vector).

### Issue: "Prisma Client not generated"

**Solution**: Run `npx prisma generate` again.

### Issue: Migration fails

**Solution**: 
1. Reset the database: `npx prisma migrate reset`
2. Run migration again: `npx prisma migrate dev --name init`

---

## Next Steps

After setup is complete:

1. **Start the dev server**: `npm run dev`
2. **Create API routes** for video upload/download
3. **Build the frontend** for browsing videos
4. **Implement video processing** workers
5. **Add authentication** with Supabase Auth

---

## Useful Commands

```bash
# Generate Prisma Client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio

# Run seed
npx tsx prisma/seed.ts

# Format schema
npx prisma format
```

---

## Production Deployment

When deploying to production:

1. Use production Supabase project
2. Set all environment variables in your hosting platform
3. Run migrations: `npx prisma migrate deploy`
4. Don't run seed in production!
5. Set up database backups in Supabase
6. Enable Row Level Security (RLS) policies

---

## Cost Monitoring

### Supabase Free Tier Limits
- 500MB database storage
- 1GB file storage
- 2GB bandwidth
- Unlimited API requests

### When to Upgrade
- Upgrade to Pro ($25/month) when you exceed free tier
- Monitor usage in Supabase dashboard

### R2 Costs
- Storage: $0.015/GB/month
- No egress fees!
- 10 million Class A operations free/month

---

## Support

If you encounter issues:
1. Check Supabase logs (Logs & Analytics)
2. Check Prisma logs in terminal
3. Verify environment variables
4. Check this guide's Common Issues section
