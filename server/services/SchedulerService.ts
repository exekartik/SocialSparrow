import cron from "node-cron";
import Post from "../modules/post.js";
import { Account } from "../modules/Account.js";
import zernio from "../config/Zernio.js";
import { logActivity } from "../controllers/Acticity.controller.js";

/**
 * Initialize the background scheduler cron job
 * Runs every minute to find scheduled posts that are due,
 * publishes them via the Zernio SDK to the user's connected social platforms,
 * and updates their status in MongoDB.
 */
export const initScheduler = (): void => {
    // Run every minute
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();
            
            // Find posts scheduled for publication that are due or overdue (<= now)
            const postsToPublish = await Post.find({
                status: "scheduled",
                scheduledFor: { $lte: now }
            });

            if (postsToPublish.length === 0) {
                return;
            }

            console.log(`[SCHEDULER] Found ${postsToPublish.length} posts to publish at ${now.toISOString()}`);

            for (const post of postsToPublish) {
                try {
                    // Extract target platforms safely
                    let platformList: string[] = [];
                    if (Array.isArray(post.platforms)) {
                        platformList = post.platforms;
                    } else if (typeof post.platforms === "string") {
                        platformList = post.platforms.split(",").map(p => p.trim());
                    } else if (post.platform) {
                        platformList = [post.platform];
                    }

                    // Find connected social accounts of the user matching the target platforms
                    const accounts = await Account.find({
                        user: post.user,
                        platform: { $in: platformList },
                        status: "connected"
                    } as any);

                    if (accounts.length === 0) {
                        console.warn(`[SCHEDULER] No connected accounts found for post ${post._id} platforms: ${platformList}`);
                        post.status = "published_failed";
                        await post.save();

                        await logActivity(
                            post.user.toString(),
                            "post",
                            `Failed to publish scheduled post: No connected social account found for target platforms (${platformList.join(", ")}).`,
                            post._id
                        );
                        continue;
                    }

                    // Format platforms list as Zernio expects: [{ platform: string, accountId: string }]
                    const platformsData = accounts.map((acc: any) => ({
                        platform: acc.platform,
                        accountId: acc.zernioAccountId
                    }));

                    console.log(`[SCHEDULER] Publishing post ${post._id} to Zernio accounts:`, platformsData);

                    // Call Zernio API to publish the post
                    const { data: zPost } = await zernio.posts.createPost({
                        body: {
                            content: post.content,
                            platforms: platformsData,
                            mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
                            publishNow: true
                        }
                    });

                    // Mark post as published on success
                    post.status = "published";
                    await post.save();

                    const connectedPlatformsStr = accounts.map((a: any) => a.platform).join(", ");
                    await logActivity(
                        post.user.toString(),
                        "post",
                        `Successfully published scheduled post to: ${connectedPlatformsStr}`,
                        post._id
                    );

                    console.log(`[SCHEDULER] Successfully published post ${post._id} to: ${connectedPlatformsStr}`);

                } catch (publishError: any) {
                    console.error(`[SCHEDULER] Error publishing post ${post._id}:`, publishError?.message || publishError);
                    
                    post.status = "published_failed";
                    await post.save();

                    await logActivity(
                        post.user.toString(),
                        "post",
                        `Failed to publish scheduled post: ${publishError?.message || "Internal publishing error"}`,
                        post._id
                    );
                }
            }
        } catch (error: any) {
            console.error("[SCHEDULER CRITICAL ERROR] Cron execution failed:", error?.message || error);
        }
    });
};

// Alias for spelling compatibility
export const initScheuler = initScheduler;
export default initScheduler;