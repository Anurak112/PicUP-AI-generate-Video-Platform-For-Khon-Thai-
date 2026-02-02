'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';
import { generateImage, generateVideo } from '@/lib/ai/fal';
import { GenerationType, GenerationStatus } from '@prisma/client';

export async function startGeneration(formData: {
    prompt: string,
    type: 'IMAGE' | 'VIDEO',
    subject?: string,
    environment?: string,
    cinematic?: string,
    style?: string,
}) {
    // 1. Create a pending generation record
    const generation = await prisma.generation.create({
        data: {
            prompt: formData.prompt,
            type: formData.type as any,
            status: 'PENDING',
            subject: formData.subject,
            environment: formData.environment,
            cinematic: formData.cinematic,
            style: formData.style,
            modelName: formData.type === 'IMAGE' ? 'flux-schnell' : 'hunyuan-video',
        }
    });

    // 2. Trigger async generation (in a real app, you might use a background job/webhook)
    try {
        const genFn = formData.type === 'IMAGE' ? generateImage : generateVideo;
        const result = await genFn({ prompt: formData.prompt });

        // 3. Update record with success
        await prisma.generation.update({
            where: { id: generation.id },
            data: {
                status: 'COMPLETED',
                outputUrl: result.url,
                falRequestId: result.requestId,
                completedAt: new Date(),
            }
        });

        revalidatePath('/studio');
        return { success: true, data: result };
    } catch (error: any) {
        // 4. Update record with failure
        await prisma.generation.update({
            where: { id: generation.id },
            data: {
                status: 'FAILED',
                config: { error: error.message } as any
            }
        });

        return { success: false, error: error.message };
    }
}
