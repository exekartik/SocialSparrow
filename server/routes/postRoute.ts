import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload } from "../config/multer.js";
import {
    genreatepost,
    getGenerations,
    schedulePost,
    getPosts,
    sharePost,
    deletePost
} from "../controllers/postController.js";

const postRoute = Router();

// AI Generation Routes
postRoute.post("/generate", authMiddleware, genreatepost);
postRoute.get("/generations", authMiddleware, getGenerations);

// Post Management & Scheduling Routes (supports optional file uploads via multer)
postRoute.post("/schedule", authMiddleware, upload.single("media"), schedulePost);
postRoute.post("/", authMiddleware, upload.single("media"), schedulePost);
postRoute.get("/", authMiddleware, getPosts);
postRoute.post("/share/:id", authMiddleware, sharePost);
postRoute.delete("/:id", authMiddleware, deletePost);

export default postRoute;
