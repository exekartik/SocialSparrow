import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getActivityLogs, deleteActivityLog } from "../controllers/Acticity.controller.js";

const activityRouter = Router();

// GET /api/activity - Fetch user's activity logs
activityRouter.get("/", authMiddleware, getActivityLogs);

// DELETE /api/activity/:id - Delete an activity log entry
activityRouter.delete("/:id", authMiddleware, deleteActivityLog);

export default activityRouter;
