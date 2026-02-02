# Next Steps: Database Setup

## ✅ What's Been Completed

1. **Database Schema** - Prisma schema created with 11 tables
2. **Dependencies Installed** - All required packages added
3. **Prisma Client Generated** - Type-safe database client ready
4. **Utilities Created** - Query helpers and storage utilities
5. **Documentation** - Setup guide and quick reference

---

## 🚀 What You Need to Do Next

### Step 1: Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project:
   - Name: `pixel-ai-video`
   - Database Password: (save this!)
   - Region: Choose closest to you
3. Wait for project creation (~2 minutes)

**Get your credentials:**
- Settings → Database → Connection String (URI) → Copy
- Settings → API → Copy Project URL and API keys

### Step 2: Set Up Cloudflare R2 (5 minutes)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to R2 → Create bucket → Name: `pixel-ai-videos`
3. Create API token:
   - R2 → Manage R2 API Tokens → Create API Token
   - Permissions: Object Read & Write
   - Save Access Key ID and Secret Access Key

### Step 3: Configure Environment Variables (2 minutes)

1. Create `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials in `.env.local`:
   ```env
   DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
   DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
   NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-KEY]"
   SUPABASE_SERVICE_ROLE_KEY="[YOUR-KEY]"
   R2_ACCOUNT_ID="[YOUR-ID]"
   R2_ACCESS_KEY_ID="[YOUR-KEY]"
   R2_SECRET_ACCESS_KEY="[YOUR-SECRET]"
   R2_BUCKET_NAME="pixel-ai-videos"
   ```

### Step 4: Enable pgvector Extension (1 minute)

In Supabase:
1. Go to Database → Extensions
2. Search for "vector"
3. Enable the `vector` extension

### Step 5: Run Database Migration (1 minute)

```bash
npm run db:migrate
```

This will:
- Create all tables in Supabase
- Set up indexes and constraints
- Ask if you want to seed data (say yes for development!)

### Step 6: Verify Setup (1 minute)

```bash
# Open Prisma Studio to view your database
npm run db:studio
```

You should see all tables with seed data!

---

## 📊 What You'll Have

After completing these steps:

- ✅ **11 database tables** with relationships
- ✅ **8 sample videos** with metadata
- ✅ **4 sample users** (admin, creators, user)
- ✅ **8 categories** (photorealistic, cartoon, 3D, etc.)
- ✅ **25 tags** for search
- ✅ **Vector search** ready with pgvector
- ✅ **R2 storage** configured for videos

---

## 🎯 After Setup

Once your database is ready, you can:

1. **Build the video upload API** (`/api/videos`)
2. **Create the browse page** with search and filters
3. **Implement video player** with HLS streaming
4. **Add authentication** with Supabase Auth
5. **Build admin dashboard** for moderation

---

## 📚 Reference Documents

- **Full Setup Guide**: `DATABASE_SETUP.md`
- **Quick Reference**: `DATABASE_REFERENCE.md`
- **Schema File**: `prisma/schema.prisma`
- **Query Examples**: `src/lib/queries/`

---

## 💡 Tips

- Use **Prisma Studio** (`npm run db:studio`) to browse data visually
- Check **Supabase logs** if migrations fail
- The seed data is perfect for **development and testing**
- Don't run seed in production!

---

## ❓ Need Help?

Common issues and solutions are in `DATABASE_SETUP.md` under "Common Issues"

---

## 💰 Cost Reminder

**Current setup costs:**
- Supabase: **FREE** (up to 500MB database)
- R2: **~$0.02/month** (for seed data)

**At scale (10,000 videos):**
- Supabase Pro: **$25/month**
- R2 Storage: **$21/month**
- **Total: ~$46/month**

---

Ready to proceed? Follow the steps above and you'll have a production-ready database in about 15 minutes! 🚀
