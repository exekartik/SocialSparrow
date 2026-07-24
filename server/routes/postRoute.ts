import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";
import {
    genreatepost,
    getGenerations,
    getGenerated,
    getGenration,
    schedulePost,
    getPosts,
    sharePost
} from "../controllers/postController.js";

const postRoute = Router();

// AI Generation Routes
postRoute.post("/generate", authMiddleware, genreatepost);
postRoute.get("/generations", authMiddleware, getGenerations);
postRoute.get("/generation", authMiddleware, getGenerated);

// Post Management & Scheduling Routes (supports optional file uploads via multer)
postRoute.post("/schedule", authMiddleware, upload.single("media"), schedulePost);
postRoute.post("/", authMiddleware, upload.single("media"), schedulePost);
postRoute.get("/", authMiddleware, getPosts);
postRoute.post("/share/:id", authMiddleware, sharePost);

export default postRoute;
