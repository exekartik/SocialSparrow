import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getActivityLogs } from "../controllers/Acticity.controller.js";

const activityRouter = Router();

// GET /api/activity - Fetch user's activity logs
activityRouter.get("/", authMiddleware, getActivityLogs);

export default activityRouter;
