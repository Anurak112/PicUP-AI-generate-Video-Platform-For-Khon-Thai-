import { PrismaClient, UserRole, LicenseType, Visibility, VideoStatus, FileType, EmbeddingType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Clean existing data
    console.log('🧹 Cleaning existing data...')
    await prisma.download.deleteMany()
    await prisma.processingJob.deleteMany()
    await prisma.videoEmbedding.deleteMany()
    await prisma.videoTag.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.videoFile.deleteMany()
    await prisma.aiMetadata.deleteMany()
    await prisma.video.deleteMany()
    await prisma.category.deleteMany()
    await prisma.apiKey.deleteMany()
    await prisma.user.deleteMany()

    // Create Users
    console.log('👤 Creating users...')
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'admin@pixel.ai',
                username: 'admin',
                displayName: 'Admin User',
                role: UserRole.ADMIN,
                bio: 'Platform administrator',
            },
        }),
        prisma.user.create({
            data: {
                email: 'creator1@pixel.ai',
                username: 'ai_artist',
                displayName: 'AI Artist',
                role: UserRole.CREATOR,
                bio: 'Creating stunning AI videos with Runway and Pika',
                website: 'https://aiartist.com',
            },
        }),
        prisma.user.create({
            data: {
                email: 'creator2@pixel.ai',
                username: 'motion_master',
                displayName: 'Motion Master',
                role: UserRole.CREATOR,
                bio: 'Specializing in cinematic AI animations',
            },
        }),
        prisma.user.create({
            data: {
                email: 'user@pixel.ai',
                username: 'regular_user',
                displayName: 'Regular User',
                role: UserRole.USER,
            },
        }),
    ])

    // Create Categories
    console.log('📁 Creating categories...')
    const categories = await Promise.all([
        prisma.category.create({
            data: {
                name: 'Photorealistic',
                slug: 'photorealistic',
                description: 'Ultra-realistic AI-generated videos',
                icon: '📸',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Cartoon',
                slug: 'cartoon',
                description: 'Animated cartoon-style videos',
                icon: '🎨',
            },
        }),
        prisma.category.create({
            data: {
                name: '3D Animation',
                slug: '3d-animation',
                description: '3D rendered animations',
                icon: '🎬',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Anime',
                slug: 'anime',
                description: 'Anime-style AI videos',
                icon: '⚡',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Abstract',
                slug: 'abstract',
                description: 'Abstract and artistic videos',
                icon: '🌀',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Nature',
                slug: 'nature',
                description: 'Natural landscapes and wildlife',
                icon: '🌿',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Urban',
                slug: 'urban',
                description: 'City and urban environments',
                icon: '🏙️',
            },
        }),
        prisma.category.create({
            data: {
                name: 'Sci-Fi',
                slug: 'sci-fi',
                description: 'Science fiction and futuristic',
                icon: '🚀',
            },
        }),
    ])

    // Create Tags
    console.log('🏷️ Creating tags...')
    const tagNames = [
        'cinematic', 'drone-shot', 'sunset', 'ocean', 'mountains',
        'city', 'night', 'slow-motion', 'time-lapse', 'aerial',
        'portrait', 'landscape', 'abstract', 'colorful', 'minimalist',
        'fantasy', 'realistic', 'artistic', 'dramatic', 'peaceful',
        'dynamic', 'smooth', 'epic', 'beautiful', 'stunning',
    ]

    const tags = await Promise.all(
        tagNames.map((name) =>
            prisma.tag.create({
                data: {
                    name,
                    slug: name.toLowerCase().replace(/\s+/g, '-'),
                    usageCount: Math.floor(Math.random() * 50),
                },
            })
        )
    )

    // Create Videos with metadata
    console.log('🎥 Creating videos...')
    const videoData = [
        {
            title: 'Cinematic Sunset Over Ocean Waves',
            description: 'A breathtaking AI-generated sunset scene with gentle ocean waves and golden hour lighting. Perfect for meditation or background content.',
            category: categories[0], // Photorealistic
            tags: ['cinematic', 'sunset', 'ocean', 'peaceful', 'beautiful'],
            prompt: 'Cinematic drone shot of sunset over calm ocean, golden hour, volumetric lighting, 4k quality',
            model: 'Runway Gen-2',
        },
        {
            title: 'Futuristic City Flythrough',
            description: 'High-tech cyberpunk city with neon lights and flying vehicles. Smooth camera movement through towering skyscrapers.',
            category: categories[7], // Sci-Fi
            tags: ['sci-fi', 'city', 'night', 'cinematic', 'epic'],
            prompt: 'Futuristic cyberpunk city at night, neon lights, flying cars, cinematic camera movement',
            model: 'Pika 1.0',
        },
        {
            title: 'Anime Character Walking in Rain',
            description: 'Beautiful anime-style character walking through rainy Tokyo streets with umbrella. Lofi aesthetic.',
            category: categories[3], // Anime
            tags: ['anime', 'city', 'night', 'artistic', 'dramatic'],
            prompt: 'Anime girl walking in rain, Tokyo street, neon signs, umbrella, lofi aesthetic, studio ghibli style',
            model: 'Stable Diffusion Video',
        },
        {
            title: 'Abstract Fluid Motion',
            description: 'Mesmerizing abstract fluid simulation with vibrant colors morphing and flowing.',
            category: categories[4], // Abstract
            tags: ['abstract', 'colorful', 'dynamic', 'artistic', 'smooth'],
            prompt: 'Abstract fluid simulation, vibrant colors, smooth motion, 60fps, high quality',
            model: 'Runway Gen-2',
        },
        {
            title: 'Mountain Landscape Time-lapse',
            description: 'Stunning mountain range with moving clouds and changing light. Captured in time-lapse style.',
            category: categories[5], // Nature
            tags: ['mountains', 'nature', 'time-lapse', 'landscape', 'stunning'],
            prompt: 'Mountain landscape time-lapse, moving clouds, dramatic lighting, 4k cinematic',
            model: 'Pika 1.0',
        },
        {
            title: '3D Character Animation Loop',
            description: 'Stylized 3D character performing a dance loop. Perfect for game development or motion graphics.',
            category: categories[2], // 3D Animation
            tags: ['3d', 'animation', 'dynamic', 'smooth', 'artistic'],
            prompt: '3D character dancing, stylized render, smooth animation loop, Pixar style',
            model: 'Runway Gen-2',
        },
        {
            title: 'Cartoon Forest Adventure',
            description: 'Whimsical cartoon forest with animated animals and magical atmosphere.',
            category: categories[1], // Cartoon
            tags: ['cartoon', 'nature', 'colorful', 'fantasy', 'beautiful'],
            prompt: 'Cartoon forest scene, cute animals, magical atmosphere, Disney style animation',
            model: 'Stable Diffusion Video',
        },
        {
            title: 'Urban Street Photography Style',
            description: 'AI-generated urban street scene with realistic pedestrians and traffic.',
            category: categories[6], // Urban
            tags: ['city', 'realistic', 'urban', 'cinematic', 'dramatic'],
            prompt: 'Urban street photography, realistic people, traffic, cinematic color grading',
            model: 'Runway Gen-2',
        },
    ]

    for (let i = 0; i < videoData.length; i++) {
        const data = videoData[i]
        const uploader = users[1 + (i % 2)] // Alternate between creators

        const video = await prisma.video.create({
            data: {
                uploaderId: uploader.id,
                title: data.title,
                description: data.description,
                slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                categoryId: data.category.id,
                licenseType: i % 3 === 0 ? LicenseType.ATTRIBUTION : LicenseType.FREE,
                visibility: Visibility.PUBLIC,
                status: VideoStatus.READY,
                featured: i < 3, // First 3 are featured
                viewCount: Math.floor(Math.random() * 10000),
                downloadCount: Math.floor(Math.random() * 1000),
                likeCount: Math.floor(Math.random() * 500),
                publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
            },
        })

        // Add tags
        const videoTags = data.tags.map((tagName) => {
            const tag = tags.find((t) => t.name === tagName)
            return tag ? { videoId: video.id, tagId: tag.id } : null
        }).filter(Boolean)

        await prisma.videoTag.createMany({
            data: videoTags as any,
        })

        // Add AI metadata
        await prisma.aiMetadata.create({
            data: {
                videoId: video.id,
                modelName: data.model,
                modelVersion: '1.0',
                generatorApp: data.model.split(' ')[0],
                prompt: data.prompt,
                negativePrompt: 'blurry, low quality, distorted',
                seed: BigInt(Math.floor(Math.random() * 1000000)),
                steps: 50,
                guidanceScale: 7.5,
                sampler: 'DPM++ 2M Karras',
                generatedAt: new Date(),
            },
        })

        // Add video files
        await prisma.videoFile.createMany({
            data: [
                {
                    videoId: video.id,
                    fileType: FileType.ORIGINAL,
                    storageKey: `videos/${uploader.id}/${video.id}/original.mp4`,
                    cdnUrl: `https://cdn.pixel.ai/videos/${video.id}/original.mp4`,
                    sizeBytes: BigInt(Math.floor(Math.random() * 100000000) + 50000000), // 50-150MB
                    checksum: `sha256-${Math.random().toString(36).substring(7)}`,
                    mimeType: 'video/mp4',
                    width: 1920,
                    height: 1080,
                    fps: 30,
                    duration: 180, // 3 minutes
                    bitrate: 5000,
                    codec: 'h264',
                },
                {
                    videoId: video.id,
                    fileType: FileType.PREVIEW_MP4,
                    storageKey: `videos/${uploader.id}/${video.id}/preview.mp4`,
                    cdnUrl: `https://cdn.pixel.ai/videos/${video.id}/preview.mp4`,
                    sizeBytes: BigInt(30000000), // 30MB
                    checksum: `sha256-${Math.random().toString(36).substring(7)}`,
                    mimeType: 'video/mp4',
                    width: 1280,
                    height: 720,
                    fps: 30,
                    duration: 180,
                    bitrate: 2000,
                    codec: 'h264',
                },
                {
                    videoId: video.id,
                    fileType: FileType.THUMBNAIL,
                    storageKey: `videos/${uploader.id}/${video.id}/thumb.jpg`,
                    cdnUrl: `https://cdn.pixel.ai/videos/${video.id}/thumb.jpg`,
                    sizeBytes: BigInt(150000), // 150KB
                    checksum: `sha256-${Math.random().toString(36).substring(7)}`,
                    mimeType: 'image/jpeg',
                    width: 1920,
                    height: 1080,
                },
            ],
        })

        /* 
        // Add mock embedding (in production, this would be generated by OpenAI)
        const mockEmbedding = Array.from({ length: 1536 }, () => Math.random())
        await prisma.videoEmbedding.create({
            data: {
                videoId: video.id,
                embeddingType: EmbeddingType.COMBINED,
                embedding: `[${mockEmbedding.join(',')}]` as any,
                sourceText: `${data.title} ${data.description} ${data.prompt}`,
            },
        })
        */

        console.log(`  ✅ Created video: ${data.title}`)
    }

    // Update category video counts
    console.log('📊 Updating category counts...')
    for (const category of categories) {
        const count = await prisma.video.count({
            where: { categoryId: category.id },
        })
        await prisma.category.update({
            where: { id: category.id },
            data: { videoCount: count },
        })
    }

    // Update user stats
    console.log('👥 Updating user stats...')
    for (const user of users) {
        const videos = await prisma.video.findMany({
            where: { uploaderId: user.id },
            include: { _count: { select: { downloads: true } } },
        })

        const totalVideos = videos.length
        const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0)
        const totalDownloads = videos.reduce((sum, v) => sum + v.downloadCount, 0)

        await prisma.user.update({
            where: { id: user.id },
            data: { totalVideos, totalViews, totalDownloads },
        })
    }

    console.log('✨ Seed completed successfully!')
    console.log(`   - ${users.length} users created`)
    console.log(`   - ${categories.length} categories created`)
    console.log(`   - ${tags.length} tags created`)
    console.log(`   - ${videoData.length} videos created`)
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
