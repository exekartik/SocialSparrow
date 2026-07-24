import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import Generation from "../modules/Generation.js";
import Post from "../modules/post.js";
import cloudinary from "../config/cloudnary.js";
import { logActivity } from "../controllers/Acticity.controller.js";

/**
 * ===========================================================
 *   POST & AI GENERATION CONTROLLER
 * 
 *   Purpose:
 *   Handles AI-powered post generation (Gemini text + Pollinations image),
 *   generation history retrieval, post scheduling, and post publishing.
 * ===========================================================
 */

export interface IGeneratedAIResult {
    content: string;
    imagePrompt: string;
}

/**
 * Helper to call Gemini AI with teacher's JSON structure (content + imagePrompt)
 */
const generateWithGemini = async (prompt: string, tone?: string): Promise<IGeneratedAIResult> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in environment variables");
    }

    const ai = new GoogleGenAI({ apiKey });
    const formattedPrompt = `Generate a social media post based on this prompt: ${prompt}
Tone: ${tone || "Professional and engaging"}
Include relevant hashtags.

Format the response strictly as valid JSON with "content" and "imagePrompt" fields.
The "imagePrompt" should be a highly descriptive, vivid prompt for an image generator.

JSON Format Example:
{
  "content": "Your social media post copy here with emojis and hashtags",
  "imagePrompt": "A highly detailed, beautiful, vivid scene description for image generation"
}`;

    const candidateModels = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash"];
    
    for (const model of candidateModels) {
        try {
            const response = await ai.models.generateContent({
                model,
                contents: formattedPrompt
            });
            if (response && response.text) {
                const text = response.text.trim();
                const jsonMatch = text.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsed = JSON.parse(jsonMatch[0]);
                    return {
                        content: parsed.content || text,
                        imagePrompt: parsed.imagePrompt || prompt
                    };
                }
            }
        } catch (err: any) {
            console.warn(`Gemini model ${model} failed/quota hit, trying next model... (${err?.message || err})`);
        }
    }

    // Fallback if AI service is temporarily rate limited or unreachable
    return {
        content: `🚀 ${prompt}\n\nAutomate and scale your social media strategy effortlessly with SocialSparrow!\n\n#SocialSparrow #SocialMedia #Growth`,
        imagePrompt: prompt
    };
};

/**
 * Helper to verify that an image URL was successfully generated and is accessible.
 * Logs diagnostic details for easy debugging if verification fails.
 */
const verifyGeneratedImageUrl = async (url: string): Promise<{ success: boolean; status?: number; error?: string }> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(url, { method: "HEAD", signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            return { success: true, status: res.status };
        }

        // Try GET if HEAD request is restricted
        const getRes = await fetch(url, { method: "GET", signal: controller.signal });
        if (getRes.ok) {
            return { success: true, status: getRes.status };
        }

        return {
            success: false,
            status: getRes.status,
            error: `Image service returned HTTP ${getRes.status}`
        };
    } catch (err: any) {
        return {
            success: false,
            error: err?.message || "Network error while connecting to image generation service"
        };
    }
};

/**
 * Generate Post Content using Gemini AI + Pollinations.ai for Images
 * POST /api/posts/generate
 */
export const genreatepost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        if (!prompt) {
            res.status(400).json({ message: "Prompt is required" });
            return;
        }

        // 1. Generate post content and image prompt using Gemini AI
        const { content, imagePrompt } = await generateWithGemini(prompt, tone);

        // 2. Generate and verify Image URL using Pollinations.ai
        let mediaUrl: string | undefined = undefined;
        let mediaType: "image" | "video" | undefined = undefined;

        if (generateImage !== false) {
            const encodedPrompt = encodeURIComponent(imagePrompt || prompt);
            const candidateUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

            // Verify image generation
            const verification = await verifyGeneratedImageUrl(candidateUrl);

            if (!verification.success) {
                console.error(`[IMAGE GENERATION ERROR] Image generation check failed for prompt: "${imagePrompt || prompt}". Error: ${verification.error}`);
                
                res.status(502).json({
                    success: false,
                    message: "Image generation failed. Could not verify generated image URL.",
                    debug: {
                        attemptedUrl: candidateUrl,
                        imagePrompt: imagePrompt || prompt,
                        error: verification.error,
                        status: verification.status
                    }
                });
                return;
            }

            try {
                // upload to cloudinary for persistence
                const uploadResult = await cloudinary.uploader.upload(candidateUrl, {
                    folder: "ai-generations"
                });
                mediaUrl = uploadResult.secure_url;
                mediaType = "image";
            } catch (uploadErr: any) {
                console.error("Image generation failed (Cloudinary upload error):", uploadErr);
                res.status(502).json({
                    success: false,
                    message: "Image generation failed during persistence upload.",
                    debug: { error: uploadErr?.message || uploadErr }
                });
                return;
            }
        }

        // 3. Save generation record to MongoDB
        const generation = await Generation.create({
            user: req.user._id,
            prompt,
            content,
            mediaUrl,
            mediaType,
            tone: tone || "Professional"
        });

        // Log the activity
        await logActivity(
            req.user._id,
            "generate",
            `Generated post copy with AI: "${prompt.substring(0, 30)}${prompt.length > 30 ? '...' : ''}"`,
            generation._id
        );

        res.status(200).json({
            success: true,
            data: generation
        });

    } catch (error: any) {
        console.error("Generate Post Error:", error);
        res.status(500).json({ 
            success: false,
            message: error?.message || "Failed to generate post content",
            debug: { error: error?.stack || error }
        });
    }
};

/**
 * Get all AI generations history for the user
 * GET /api/posts/generations
 */
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const generations = await Generation.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(generations);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

/**
 * Alias for getGenerations (for backwards compatibility)
 * GET /api/posts/generation
 */
export const getGenerated = async (req: AuthRequest, res: Response): Promise<void> => {
    return getGenerations(req, res);
};

export const getGenration = async (req: AuthRequest, res: Response): Promise<void> => {
    return getGenerations(req, res);
};

/**
 * Schedule a new post (handles string & FormData with media upload to Cloudinary)
 * POST /api/posts/schedule OR POST /api/posts
 */
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { content, platforms, scheduledFor, status } = req.body;

        // Parse platforms if it comes as a stringified array from FormData
        let parsedPlatforms = platforms;
        if (typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms);
            } catch (e) {
                parsedPlatforms = platforms.split(",");
            }
        }

        let mediaUrl: string | undefined = req.body.mediaUrl;
        let mediaType: "image" | "video" | undefined = req.body.mediaType;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
            });
            mediaUrl = result.secure_url;
            mediaType = result.resource_type === "video" ? "video" : "image";
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms,
            mediaUrl,
            mediaType,
            scheduledFor,
            status: status || "scheduled",
        });

        // Log the activity
        const platformString = Array.isArray(parsedPlatforms) ? parsedPlatforms.join(", ") : String(parsedPlatforms || "");
        await logActivity(
            req.user._id,
            "schedule",
            `Scheduled new post for platform(s): ${platformString}`,
            post._id
        );

        res.json(post);

    } catch (error: any) {
        console.error("Schedule Post Error:", error);
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

/**
 * Get all scheduled and published posts for the user
 * GET /api/posts
 */
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(posts);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

/**
 * Share / Publish post directly
 * POST /api/posts/share/:id
 */
export const sharePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const post = await Post.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { status: "published" },
            { new: true }
        );

        if (post) {
            // Log the activity
            await logActivity(
                req.user._id,
                "share",
                `Published post directly: "${post.content.substring(0, 30)}${post.content.length > 30 ? '...' : ''}"`,
                post._id
            );
        }

        res.json(post);
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};