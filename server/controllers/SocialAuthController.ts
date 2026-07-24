import { Request, Response, NextFunction } from "express";
import zernio from "../config/Zernio.js"; // Corrected casing to match Zernio.ts
import { User } from "../modules/user.model.js"; // Path to User model
import { Account } from "../modules/Account.js"; // Path to Account model
import { AuthRequest } from "../middleware/authMiddleware.js";

/**
 * ===========================================================
 *  
 *
 *   Role of this file:
 *   Handles OAuth 2.0 flows and account syncing for social platforms
 *   using the Zernio SDK.
 * ===========================================================
 */

/**
 * Helper to ensure a user has a Zernio Profile.
 * 
 * Flow:
 * 1. Checks Zernio for any existing profiles.
 * 2. If a profile exists, links its ID (pid) to our local User document.
 * 3. If no profile exists, creates one in Zernio first, then links it to the user.
 * 
 * Why? (Advanced concept):
 * Zernio uses "Profiles" as workspaces to group social accounts. We must associate
 * our local User with a Zernio Profile before connecting any social accounts.
 */
const getOrCreateZernioProfile = async (user: any): Promise<string> => {
    try {
        // 1. Fetch profiles associated with the Zernio account
        const result = await zernio.profiles.listProfiles();
        const data = result.data as any;
        const profiles: any[] = Array.isArray(data) ? data : data?.profiles || data?.data || [];
        
        // If a profile already exists, link it to the user and return the ID
        if (profiles.length > 0) {
            const pid = profiles[0]._id || profiles[0].id;
            await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
            return pid;
        }

        // 2. Otherwise, create a new profile in Zernio
        const createResult = await zernio.profiles.createProfile({
            body: { name: `${user.name || user.email}'s workspace` } as any,
        });
        
        // Extract the new profile data safely
        const created = (createResult.data as any)?.profile || createResult.data;
        const pid = created?._id || created?.id;
        
        if (!pid) {
            throw new Error("Failed to create Zernio profile - no ID returned");
        }
        
        // Save the new Zernio profile ID on our User document in MongoDB
        await User.findByIdAndUpdate(user._id, { zernioProfileId: pid });
        return pid;
        
    } catch (error: any) {
        console.error("getOrCreateZernioProfile Error:", error?.message || error);
        throw error;
    }
};

/**
 * Generate OAuth authorization URL
 * GET /api/auth/:platform/url
 * 
 * Flow:
 * 1. Grab platform from URL path and the current user.
 * 2. Ensure the user has a Zernio Profile ID.
 * 3. Generate the redirect URL (where Zernio sends the user after connection).
 * 4. Call Zernio's connect.getConnectUrl SDK method to obtain the OAuth redirect link.
 * 5. Return the URL to the frontend client.
 */
export const generateAuthUrl = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { platform } = req.params;
        
        // Safely extract the authenticated user from request (cast req to any for TS flexibility)
        // Fallback to findOne for easier local debugging if req.user is not populated yet
        const user = (req as any).user || await User.findOne(); 
        
        if (!user) {
            res.status(401).json({ message: "User must be authenticated" });
            return;
        }

        // Ensure user has a Zernio Profile ID
        const profileId = await getOrCreateZernioProfile(user);

        // Redirect URL where the user will land after authenticating with their social network
        const redirectUrl = process.env.ZERNIO_REDIRECT_URI || "http://localhost:3000/api/auth/callback";

        // Request the connection URL from Zernio
        const result = await zernio.connect.getConnectUrl({
            path: { platform: platform as any },
            query: {
                profileId,
                redirect_url: redirectUrl
            }
        });

        const data = result.data as any;
        console.log("getConnectUrl response:", JSON.stringify(data, null, 2));

        const authUrl = data.authUrl;
        if (!authUrl) {
            throw new Error(`Zernio returned no authUrl. Full response: ${JSON.stringify(data)}`);
        }

        // Return the login URL to the client
        res.json({ url: authUrl });

    } catch (error: any) {
        console.error("Error generating Auth URL:", error);
        res.status(500).json({ message: error?.message || "Failed to generate authorization URL" });
    }
};

/**
 * Sync connected accounts from Zernio into MongoDB
 * GET /api/auth/sync
 * 
 * Flow:
 * 1. Fetch all accounts connected to the user's Zernio profile.
 * 2. Iterate through them, filtering only supported platforms.
 * 3. Store/Update the details of these accounts in our MongoDB.
 * 4. Return the list of synced accounts.
 */
export const syncAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Safely get user (cast req to any for TS flexibility)
        const user = (req as any).user || await User.findOne();

        if (!user) {
            res.status(401).json({ message: "User must be authenticated" });
            return;
        }

        // Get profile ID
        const profileId = await getOrCreateZernioProfile(user);

        // Get connected accounts from Zernio
        const result = await zernio.accounts.listAccounts({
            query: { profileId } as any
        });

        const data = result.data as any;
        const zernioAccounts: any[] = data?.accounts || (Array.isArray(data) ? data : []);
        const supportedPlatforms = ["twitter", "linkedin", "facebook", "instagram"];
        const syncedAccounts = [];

        // Loop through all accounts from Zernio
        for (const zAccount of zernioAccounts) {
            const zid = zAccount._id || zAccount.id;
            if (!zid) {
                console.warn("Skipping account with no ID:", zAccount);
                continue;
            }

            const rawPlatform = zAccount.platform;
            // Normalize platform to match our supported list
            const normalizedPlatform = supportedPlatforms.find(p => rawPlatform?.toLowerCase().includes(p));

            if (!normalizedPlatform) {
                console.log(`Skipping unsupported platform: "${rawPlatform}"`);
                continue;
            }

            // Sync/Upsert (Update or Insert) the account details in our MongoDB database
            const account = await Account.findOneAndUpdate(
                { zernioAccountId: zid },
                {
                    user: user._id,
                    platform: normalizedPlatform as any,
                    handle: zAccount.username || zAccount.name || zAccount.handle || "Unknown",
                    zernioAccountId: zid,
                    status: "connected",
                    avatarUrl: zAccount.avatarUrl || zAccount.picture || zAccount.profile_image_url || ""
                },
                { upsert: true, new: true }
            );

            syncedAccounts.push(account);
        }

        res.status(200).json({ success: true, accounts: syncedAccounts });

    } catch (error: any) {
        console.error("Sync accounts error:", error);
        res.status(500).json({ message: error?.message || "Failed to sync accounts" });
    }
};
