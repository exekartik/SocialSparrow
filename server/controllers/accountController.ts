import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { Account } from "../modules/Account.js";
import zernio from "../config/Zernio.js";
import { logActivity } from "../controllers/Acticity.controller.js";

/**
 * ===========================================================
 *   ACCOUNT CONTROLLER
 * 
 *   Purpose:
 *   Handles retrieving, adding, and disconnecting/deleting
 *   connected social media accounts.
 * ===========================================================
 */

/**
 * Retrieve all accounts connected to the current user
 * GET /api/accounts/get-account
 * 
 * Flow:
 * 1. Find all accounts matching the authenticated user's ID.
 * 2. Return them in the response.
 */
export const getAccounts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const accounts = await Account.find({ user: req.user._id });
        res.status(200).json({ success: true, data: accounts });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

/**
 * Add a new social account
 * POST /api/accounts/add-account
 * 
 * Flow:
 * 1. Extract platform, handle, avatarUrl, and zernioAccountId from the request body.
 * 2. Create and store the new Account document in MongoDB.
 * 3. Return the created account data.
 */
export const addAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { platform, handle, avatarUrl, zernioAccountId } = req.body;
        
        if (!platform || !handle || !zernioAccountId) {
            res.status(400).json({ message: "Platform, handle, and zernioAccountId are required" });
            return;
        }

        const accounts = await Account.create({
            user: req.user._id,
            platform,
            handle,
            avatarUrl: avatarUrl || "",
            zernioAccountId,
            status: "connected"
        });

        // Log the activity
        await logActivity(
            req.user._id,
            "account_connect",
            `Connected new ${platform} account: ${handle}`,
            undefined,
            platform
        );

        res.status(200).json({ success: true, data: accounts });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

/**
 * Disconnect and delete a social account
 * DELETE /api/accounts/:id
 * 
 * Flow:
 * 1. Find the local account in MongoDB by ID and owner.
 * 2. If it exists, call Zernio SDK to delete the account from the Zernio platform.
 * 3. Delete the local account from MongoDB.
 */
export const disconnectAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const account = await Account.findOne({ _id: id, user: req.user._id });
        
        if (!account) {
            res.status(404).json({ message: "Account not found" });
            return;
        }

        if (account.zernioAccountId) {
            try {
                await zernio.accounts.deleteAccount({
                    path: { accountId: account.zernioAccountId }
                });
            } catch (err: any) {
                console.error("Error deleting account from Zernio:", err?.message || err);
            }
        }

        const platform = account.platform;
        const handle = account.handle;

        await account.deleteOne();

        // Log the activity
        await logActivity(
            req.user._id,
            "account_disconnect",
            `Disconnected ${platform} account: ${handle}`,
            undefined,
            platform
        );

        res.status(200).json({ success: true, message: "Account deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
};

