import crypto from "crypto";
import { NextFunction, Request, Response, Router } from "express";
import { publishDuePosts } from "../services/SchedulerService";

const internalRouter = Router();

const safeEqual = (left: string, right: string): boolean => {
    const leftBuffer = Buffer.from(left);
    const rightBuffer = Buffer.from(right);
    return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const requireCronSecret = (req: Request, res: Response, next: NextFunction): void => {
    const expectedSecret = process.env.CRON_SECRET;
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "");

    if (!expectedSecret) {
        res.status(503).json({ message: "Scheduled publishing is not configured." });
        return;
    }
    if (!token || !safeEqual(token, expectedSecret)) {
        res.status(401).json({ message: "Unauthorized scheduled publishing request." });
        return;
    }
    next();
};

internalRouter.get("/publish-due", requireCronSecret, async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const summary = await publishDuePosts();
        if (summary.skipped) {
            res.status(503).json({ message: "Scheduled publishing is not configured or is already running." });
            return;
        }
        res.status(200).json({ success: true, data: summary });
    } catch (error) {
        next(error);
    }
});

export default internalRouter;
