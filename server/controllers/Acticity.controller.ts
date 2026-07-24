import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import ActivityLog from "../modules/ActivityLog.js";

/**
 * Fetch recent activity logs for the authenticated user
 * GET /api/activity
 */
export const getActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const logs = await ActivityLog.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .limit(50);
            
        res.status(200).json({
            success: true,
            data: logs
        });
    } catch (error: any) {
        console.error("Fetch Activity Logs Error:", error);
        res.status(500).json({ 
            success: false, 
            message: error?.message || "Failed to fetch activity logs" 
        });
    }
};

/**
 * Delete an activity log entry
 * DELETE /api/activity/:id
 */
export const deleteActivityLog = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        await ActivityLog.findOneAndDelete({ _id: id, user: req.user._id });
        res.status(200).json({
            success: true,
            message: "Activity log deleted successfully"
        });
    } catch (error: any) {
        console.error("Delete Activity Log Error:", error);
        res.status(500).json({
            success: false,
            message: error?.message || "Failed to delete activity log"
        });
    }
};

/**
 * Utility function to log an activity internally in other controllers
 */
export const logActivity = async (
    userId: string,
    actionType: "post" | "comment" | "share" | "account_connect" | "account_disconnect" | "generate" | "schedule" | "delete",
    description: string,
    relatedPostId?: any,
    platform?: string
): Promise<void> => {
    try {
        await ActivityLog.create({
            user: userId,
            actionType,
            description,
            relatedPost: relatedPostId,
            platform
        });
    } catch (error) {
        console.error("Internal Log Activity Error:", error);
    }
};

export default getActivityLogs;
