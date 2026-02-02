'use server';

import { fal } from "@fal-ai/client";

/**
 * Basic wrapper for fal.ai generation requests.
 * In a real production environment, you would use secret environment variables.
 */

export interface GenerationOptions {
    prompt: string;
    negative_prompt?: string;
    aspect_ratio?: "16:9" | "9:16" | "1:1";
    image_size?: any; // fal-ai types are complex, using any for now or specific strings
}

/**
 * Generate an image using Flux.1 [schnell] for high speed
 */
export async function generateImage(options: GenerationOptions) {
    try {
        const result: any = await fal.subscribe("fal-ai/flux/schnell", {
            input: {
                prompt: options.prompt,
                image_size: options.image_size || "landscape_16_9",
                num_inference_steps: 4,
                enable_safety_checker: true
            } as any,
            logs: true,
            onQueueUpdate: (update) => {
                console.log("Queue Update:", update.status);
            },
        });

        return {
            url: result.images[0].url,
            requestId: result.request_id,
        };
    } catch (error) {
        console.error("Fal Image Generation Error:", error);
        throw error;
    }
}

/**
 * Generate a video using HunyuanVideo (fast and high quality)
 */
export async function generateVideo(options: GenerationOptions) {
    try {
        const result: any = await fal.subscribe("fal-ai/hunyuan-video", {
            input: {
                prompt: options.prompt,
                video_size: "landscape_16_9",
                duration: "5", // seconds
            } as any,
            logs: true,
            onQueueUpdate: (update) => {
                console.log("Queue Update:", update.status);
            },
        });

        return {
            url: result.video.url,
            requestId: result.request_id,
        };
    } catch (error) {
        console.error("Fal Video Generation Error:", error);
        throw error;
    }
}
