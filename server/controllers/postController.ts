import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { GoogleGenAI } from "@google/genai";
import Generation from "../modules/Generation.js";
import Post from "../modules/post.js";
import cloudinary from "../config/cloudnary.js";
import { logActivity } from "../controllers/Acticity.controller.js";

export interface IGeneratedAIResult {
    content: string;
    imagePrompt: string;
}

/**
 * Helper to build visual image prompts tailored to user topics for Pollinations.ai
 */
const buildVisualImagePrompt = (rawPrompt: string): string => {
    const cleanTopic = rawPrompt
        .replace(/^(write|create|generate|make|post|compose)\s+(a\s+)?(tweet|post|caption|article|content)?\s*(on|about|for)?\s*/i, '')
        .trim();

    const topic = cleanTopic.toLowerCase();

    if (topic.includes("java") || topic.includes("hosting") || topic.includes("server") || topic.includes("code")) {
        return "Modern 3D digital illustration of cloud hosting server rack with glowing blue and orange ethernet cables, Java code streams, high tech dark ambient lighting, 8k resolution, cinematic render";
    }
    if (topic.includes("neet") || topic.includes("exam") || topic.includes("student") || topic.includes("medical")) {
        return "Photorealistic 3D scene of a medical student study desk with stethoscope, entrance exam textbooks, glowing laptop screen, warm lighting, ultra detailed digital art";
    }
    if (topic.includes("news") || topic.includes("update") || topic.includes("trending")) {
        return "Futuristic newsroom broadcast display screen with 3D glowing world map, orange accent lighting, breaking news graphic header, modern 8k digital art";
    }
    if (topic.includes("ai") || topic.includes("tech") || topic.includes("software")) {
        return "Sleek 3D illustration of artificial intelligence neural network node connections, glowing orange and cyan light lines, dark graphite background, futuristic digital render";
    }

    return `High resolution 3D digital illustration of ${cleanTopic}, vibrant orange lighting accents, dark graphite background, modern tech aesthetic, 8k resolution, highly detailed`;
};

/**
 * Helper to build dynamic, high-quality post copy tailored to topic & tone
 */
const buildDynamicPostCopy = (rawPrompt: string, tone: string = "Casual & Friendly"): string => {
    const cleanTopic = rawPrompt
        .replace(/^(write|create|generate|make|post|compose)\s+(a\s+)?(tweet|post|caption|article|content)?\s*(on|about|for)?\s*/i, '')
        .trim();
    
    const formattedTopic = cleanTopic.charAt(0).toUpperCase() + cleanTopic.slice(1);
    const tagKeyword = cleanTopic.replace(/[^a-zA-Z0-9]/g, '');
    const hashtags = `#${tagKeyword || 'Tech'} #SocialSparrow #Growth #ContentCreator`;

    switch (tone.toLowerCase()) {
        case "professional":
            return `📌 Key Insights on ${formattedTopic}\n\nStaying ahead requires leveraging the right tools and strategies. Here are 3 vital takeaways:\n\n• Efficiency & Performance optimization\n• Seamless integration into daily workflows\n• Scalable growth strategies for creators & teams\n\nWhat are your thoughts on ${cleanTopic}? Let's connect below! 👇\n\n${hashtags}`;
        case "viral / hype":
        case "viral":
            return `🔥 GAME CHANGER ALERT: Everything you need to know about ${formattedTopic}! 🚀\n\nThis is blowing up right now and you don't want to miss it:\n\n⚡ Next-gen performance\n⚡ Instant automation & workflow speed\n⚡ Maximum impact across all social platforms\n\nDrop a 🔥 in the comments if you're ready!\n\n${hashtags}`;
        case "educational":
            return `💡 Quick Guide: Understanding ${formattedTopic}\n\nHere is a quick breakdown to help you master this concept today:\n\n1️⃣ The Core Fundamentals\n2️⃣ Key Best Practices & Implementation\n3️⃣ Common Pitfalls to Avoid\n\nSave this post for later reference! 📌\n\n${hashtags}`;
        case "storytelling":
            return `📖 The Story Behind ${formattedTopic}...\n\nWhen we started looking deeper into ${cleanTopic}, everything changed. Innovation happens when you stop doing things the old manual way and start building smarter systems.\n\nHere's what we learned along the journey:\n✨ Consistency is key\n✨ Automation frees up creative energy\n✨ Great tools make all the difference\n\nWhat's your story with ${cleanTopic}?\n\n${hashtags}`;
        case "casual & friendly":
        default:
            return `✨ Thinking about ${cleanTopic} today!\n\nWhether you're building, learning, or scaling your project, having the right approach makes all the difference.\n\nHere's a quick checklist:\n✅ Keep it simple & clean\n✅ Automate repetitive tasks\n✅ Stay consistent\n\nHow do you handle ${cleanTopic} in your routine? Let me know below! 👇\n\n${hashtags}`;
    }
};

/**
 * Helper to call Gemini AI with structured fallback
 */
const generateWithGemini = async (prompt: string, tone?: string): Promise<IGeneratedAIResult> => {
    const apiKey = process.env.GEMINI_API_KEY;
    const fallbackImagePrompt = buildVisualImagePrompt(prompt);
    const fallbackCopy = buildDynamicPostCopy(prompt, tone);

    if (apiKey && apiKey.startsWith("AIzaSy")) {
        const ai = new GoogleGenAI({ apiKey });
        const formattedPrompt = `Generate a social media post based on this prompt: ${prompt}
Tone: ${tone || "Casual & Friendly"}
Include relevant hashtags.

Format the response strictly as valid JSON with "content" and "imagePrompt" fields.
The "imagePrompt" should be a vivid, highly descriptive prompt for an image generator (no conversational text).

JSON Format Example:
{
  "content": "Your social media post copy here with emojis and hashtags",
  "imagePrompt": "A highly detailed, 3D render scene description for image generation"
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
                            content: parsed.content || fallbackCopy,
                            imagePrompt: parsed.imagePrompt ? buildVisualImagePrompt(parsed.imagePrompt) : fallbackImagePrompt
                        };
                    }
                }
            } catch (err: any) {
                console.warn(`Gemini model ${model} failed, using intelligent fallback...`);
            }
        }
    }

    // Dynamic, high-quality fallback generator
    return {
        content: fallbackCopy,
        imagePrompt: fallbackImagePrompt
    };
};

/**
 * Helper to verify that an image URL is accessible.
 */
const verifyGeneratedImageUrl = async (url: string): Promise<{ success: boolean; status?: number; error?: string }> => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(url, { method: "HEAD", signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            return { success: true, status: res.status };
        }

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
 * Generate Post Content using AI + Pollinations.ai for Images
 * POST /api/posts/generate
 */
export const genreatepost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        if (!prompt) {
            res.status(400).json({ message: "Prompt is required" });
            return;
        }

        // 1. Generate post content and image prompt
        const { content, imagePrompt } = await generateWithGemini(prompt, tone);

        // 2. Generate and verify Image URL using Pollinations.ai
        let mediaUrl: string | undefined = undefined;
        let mediaType: "image" | "video" | undefined = undefined;

        if (generateImage !== false) {
            const encodedPrompt = encodeURIComponent(imagePrompt);
            const candidateUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

            const verification = await verifyGeneratedImageUrl(candidateUrl);

            if (!verification.success) {
                console.error(`[IMAGE GENERATION ERROR] Image check failed for prompt: "${imagePrompt}". Error: ${verification.error}`);
                res.status(502).json({
                    success: false,
                    message: "Image generation failed. Could not verify generated image URL.",
                    debug: {
                        attemptedUrl: candidateUrl,
                        imagePrompt,
                        error: verification.error,
                        status: verification.status
                    }
                });
                return;
            }

            try {
                // Upload to Cloudinary for persistence
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

        // 4. Log clean activity description for dashboard
        const cleanPrompt = prompt.replace(/^(write|create|generate|make|post|compose)\s+(a\s+)?(tweet|post|caption|article|content)?\s*(on|about|for)?\s*/i, '').trim();
        await logActivity(
            req.user._id,
            "generate",
            `Created AI post draft on "${cleanPrompt || prompt}"`,
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
            message: error?.message || "Failed to generate post" 
        });
    }
};

/**
 * Get AI Generation History
 * GET /api/posts/generations
 */
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const generations = await Generation.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(20);

        res.status(200).json({
            success: true,
            data: generations
        });
    } catch (error: any) {
        console.error("Get Generations Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch generation history" });
    }
};

/**
 * Schedule Post
 * POST /api/posts/schedule
 */
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { content, platforms, scheduledFor, mediaUrl: bodyMediaUrl, mediaType: bodyMediaType } = req.body;

        if (!content) {
            res.status(400).json({ message: "Post content is required" });
            return;
        }

        let parsedPlatforms: string[] = [];
        if (typeof platforms === "string") {
            try {
                parsedPlatforms = JSON.parse(platforms);
            } catch (e) {
                parsedPlatforms = [platforms];
            }
        } else if (Array.isArray(platforms)) {
            parsedPlatforms = platforms;
        }

        let mediaUrl = bodyMediaUrl;
        let mediaType = bodyMediaType;

        // If file uploaded via Multer
        if (req.file) {
            try {
                const uploadResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "post-media"
                });
                mediaUrl = uploadResult.secure_url;
                mediaType = req.file.mimetype.startsWith("video") ? "video" : "image";
            } catch (uploadErr: any) {
                console.error("Multer file upload to Cloudinary failed:", uploadErr);
                res.status(500).json({ message: "Failed to upload attached media file" });
                return;
            }
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms.length > 0 ? parsedPlatforms : ["twitter"],
            scheduledFor: scheduledFor ? new Date(scheduledFor) : new Date(Date.now() + 60000),
            mediaUrl,
            mediaType,
            status: "scheduled"
        });

        await logActivity(
            req.user._id,
            "schedule",
            `Scheduled post for ${parsedPlatforms.join(", ") || "social platform"}`,
            post._id
        );

        res.status(201).json({
            success: true,
            data: post
        });

    } catch (error: any) {
        console.error("Schedule Post Error:", error);
        res.status(500).json({ success: false, message: error?.message || "Failed to schedule post" });
    }
};

/**
 * Get Posts Queue & History
 * GET /api/posts
 */
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .sort({ scheduledFor: -1 });

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error: any) {
        console.error("Get Posts Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch posts" });
    }
};

/**
 * Share/Publish Post immediately
 * POST /api/posts/share/:id
 */
export const sharePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const post = await Post.findOne({ _id: id, user: req.user._id });

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        post.status = "published";
        await post.save();

        await logActivity(
            req.user._id,
            "post",
            `Published post across platforms`,
            post._id
        );

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error: any) {
        console.error("Share Post Error:", error);
        res.status(500).json({ success: false, message: "Failed to publish post" });
    }
};