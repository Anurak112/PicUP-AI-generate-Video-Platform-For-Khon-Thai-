# Database Schema Quick Reference

## 📊 Database Overview

**Provider**: Supabase (PostgreSQL)  
**ORM**: Prisma  
**Storage**: Cloudflare R2  
**Vector Search**: pgvector extension

---

## 📁 File Structure

```
pixel-ai-video/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.ts                # Sample data for development
│   └── migrations/            # Database migrations (auto-generated)
├── src/
│   └── lib/
│       ├── db.ts              # Prisma client singleton
│       ├── storage.ts         # R2 storage utilities
│       └── queries/
│           ├── videos.ts      # Video CRUD operations
│           └── search.ts      # Vector search functions
├── .env.local                 # Environment variables (create from .env.example)
├── .env.example               # Environment template
└── DATABASE_SETUP.md          # Full setup guide
```

---

## 🗄️ Database Tables

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| **users** | User accounts | email, username, role |
| **videos** | Video metadata | title, description, status |
| **video_files** | File storage refs | storageKey, fileType, cdnUrl |
| **ai_metadata** | AI generation info | prompt, modelName, seed |
| **video_embeddings** | Vector search | embedding (1536d) |
| **categories** | Video categories | name, slug, icon |
| **tags** | Searchable tags | name, usageCount |
| **video_tags** | Video-tag relation | videoId, tagId |
| **downloads** | Download tracking | videoId, userId, ipAddress |
| **api_keys** | API authentication | keyHash, permissions |
| **processing_jobs** | Background jobs | jobType, status, progress |

---

## 🔑 Key Relationships

```
User (1) ──→ (N) Video
Video (1) ──→ (N) VideoFile
Video (1) ──→ (1) AiMetadata
Video (1) ──→ (N) VideoEmbedding
Video (N) ──→ (N) Tag (through VideoTag)
Video (N) ──→ (1) Category
```

---

## 🎯 Common Queries

### Get Video with All Relations
```typescript
import prisma from '@/lib/db'

const video = await prisma.video.findUnique({
  where: { id: videoId },
  include: {
    uploader: true,
    category: true,
    tags: { include: { tag: true } },
    files: true,
    aiMetadata: true,
  },
})
```

### Search Videos
```typescript
import { searchVideos } from '@/lib/queries/videos'

const results = await searchVideos(
  'sunset ocean',           // query
  { categoryId: 'xxx' },    // filters
  { page: 1, limit: 20 }    // pagination
)
```

### Semantic Search
```typescript
import { semanticSearch, generateEmbedding } from '@/lib/queries/search'

const embedding = await generateEmbedding('cinematic drone shot')
const similar = await semanticSearch(embedding, 10)
```

### Find Similar Videos
```typescript
import { findSimilarVideos } from '@/lib/queries/search'

const similar = await findSimilarVideos(videoId, 10)
```

---

## 📦 Storage Structure (R2)

```
videos/
├── {userId}/
│   └── {videoId}/
│       ├── original_{timestamp}.mp4      # Original upload
│       ├── preview_{timestamp}.mp4       # Web-optimized
│       ├── hls_master_{timestamp}.m3u8   # HLS playlist
│       ├── hls_segment_*.ts              # HLS segments
│       ├── thumb_{timestamp}.jpg         # Thumbnail
│       └── preview_{timestamp}.gif       # GIF preview
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Create database schema
npm run db:migrate

# Seed with sample data
npm run db:seed

# Open database GUI
npm run db:studio

# Reset database (WARNING: deletes all data)
npm run db:reset
```

---

## 🔐 Environment Variables

Required variables (see `.env.example`):

```env
DATABASE_URL              # Supabase connection string
DIRECT_URL                # Direct connection for migrations
NEXT_PUBLIC_SUPABASE_URL  # Supabase project URL
SUPABASE_SERVICE_ROLE_KEY # Admin key
R2_ACCOUNT_ID             # Cloudflare account
R2_ACCESS_KEY_ID          # R2 access key
R2_SECRET_ACCESS_KEY      # R2 secret
R2_BUCKET_NAME            # Bucket name
OPENAI_API_KEY            # For embeddings (optional)
```

---

## 📈 Database Indexes

Performance-critical indexes:

```sql
-- Video search
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_videos_category ON videos(category_id);
CREATE INDEX idx_videos_created_at ON videos(created_at DESC);

-- Vector search (pgvector)
CREATE INDEX idx_embeddings_vector ON video_embeddings 
  USING ivfflat (embedding vector_cosine_ops) 
  WITH (lists = 100);

-- Full-text search
CREATE INDEX idx_videos_search ON videos 
  USING GIN(to_tsvector('english', title || ' ' || description));
```

---

## 🎨 Enums

### VideoStatus
- `UPLOADING` - Upload in progress
- `PROCESSING` - Being transcoded
- `READY` - Available for viewing
- `FAILED` - Processing failed
- `DELETED` - Soft deleted

### FileType
- `ORIGINAL` - Original upload
- `PREVIEW_MP4` - Web preview
- `HLS_MASTER` - HLS playlist
- `HLS_SEGMENT` - HLS chunk
- `THUMBNAIL` - Image thumbnail
- `GIF_PREVIEW` - Animated preview

### LicenseType
- `FREE` - Free, no attribution
- `ATTRIBUTION` - Free with credit
- `COMMERCIAL` - Paid license
- `PERSONAL` - Personal use only

### Visibility
- `PUBLIC` - Everyone can see
- `UNLISTED` - Only with link
- `PRIVATE` - Owner only

---

## 💡 Best Practices

1. **Always use transactions** for multi-table updates
2. **Use select** to limit returned fields
3. **Paginate** large result sets
4. **Index** frequently queried fields
5. **Use prepared statements** (Prisma does this automatically)
6. **Cache** expensive queries
7. **Monitor** slow queries in Supabase

---

## 🔍 Debugging

### View Generated SQL
```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
})
```

### Check Connection
```bash
npx prisma db pull  # Pull schema from database
npx prisma validate # Validate schema file
```

### Common Errors

**"Can't reach database"**
→ Check DATABASE_URL in .env.local

**"Table does not exist"**
→ Run `npm run db:migrate`

**"Prisma Client not found"**
→ Run `npm run db:generate`

---

## 📚 Resources

- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [pgvector Guide](https://github.com/pgvector/pgvector)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)

---

## 💰 Cost Estimates

**For 10,000 videos (3 min each)**:

| Service | Monthly Cost |
|---------|--------------|
| Supabase Pro | $25 |
| R2 Storage (1.4TB) | $21 |
| R2 Bandwidth | $0 (no egress fees!) |
| **Total** | **~$46/month** |

Scale to 100,000 videos: ~$310/month
