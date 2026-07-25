import cron from "node-cron";
import Post from "../modules/post";
import { Account } from "../modules/Account";
import zernio, { isZernioConfigured } from "../config/Zernio";
import { logActivity } from "../controllers/Acticity.controller";

export type PublishSummary = {
    scanned: number;
    published: number;
    failed: number;
    skipped: boolean;
};

let isPublishing = false;

const getTargetPlatforms = (post: InstanceType<typeof Post>): string[] => {
    if (Array.isArray(post.platforms)) {
        return post.platforms;
    }
    if (typeof post.platforms === "string") {
        return post.platforms.split(",").map((platform) => platform.trim()).filter(Boolean);
    }
    return post.platform ? [post.platform] : [];
};

/** Publishes every due post once, either locally or from a Vercel Cron request. */
export const publishDuePosts = async (): Promise<PublishSummary> => {
    if (isPublishing || !isZernioConfigured) {
        return { scanned: 0, published: 0, failed: 0, skipped: true };
    }

    isPublishing = true;
    let published = 0;
    let failed = 0;

    try {
        const postsToPublish = await Post.find({
            status: "scheduled",
            scheduledFor: { $lte: new Date() }
        });

        for (const post of postsToPublish) {
            try {
                const platformList = getTargetPlatforms(post);
                const accounts = await Account.find({
                    user: post.user,
                    platform: { $in: platformList },
                    status: "connected"
                } as any);

                if (accounts.length === 0) {
                    post.status = "published_failed";
                    await post.save();
                    failed += 1;
                    await logActivity(
                        post.user.toString(),
                        "post",
                        `Failed to publish scheduled post: no connected account found for ${platformList.join(", ") || "the selected platform"}.`,
                        post._id
                    );
                    continue;
                }

                await zernio.posts.createPost({
                    body: {
                        content: post.content,
                        platforms: accounts.map((account) => ({
                            platform: account.platform,
                            accountId: account.zernioAccountId
                        })),
                        mediaUrls: post.mediaUrl ? [post.mediaUrl] : undefined,
                        publishNow: true
                    }
                });

                post.status = "published";
                await post.save();
                published += 1;
                await logActivity(
                    post.user.toString(),
                    "post",
                    `Successfully published scheduled post to: ${accounts.map((account) => account.platform).join(", ")}`,
                    post._id
                );
            } catch (error: unknown) {
                post.status = "published_failed";
                await post.save();
                failed += 1;
                const message = error instanceof Error ? error.message : "Internal publishing error";
                await logActivity(post.user.toString(), "post", `Failed to publish scheduled post: ${message}`, post._id);
                console.error(`[SCHEDULER] Error publishing post ${post._id}:`, error);
            }
        }

        return { scanned: postsToPublish.length, published, failed, skipped: false };
    } finally {
        isPublishing = false;
    }
};

/** Starts the developer-machine scheduler. Production uses Vercel Cron. */
export const initScheduler = (): void => {
    cron.schedule("* * * * *", () => {
        void publishDuePosts().catch((error) => {
            console.error("[SCHEDULER] Cron execution failed:", error);
        });
    });
};

export const initScheuler = initScheduler;
export default initScheduler;
