import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/Db.js";
import authRouter from "./routes/user.route.js";
import socialAuthRouter from "./routes/SocialAuthRouters.js";
import accountRoute from "./routes/accountRoute.js";
import postRoute from "./routes/postRoute.js";
import activityRouter from "./routes/activityroute.js";
import { initScheduler } from "./services/SchedulerService.js";

const app = express();

// Connect Database
connectDB().catch((err) => {
    console.error("Initial database connection error:", err.message);
});

// Initialize scheduler service
initScheduler();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
    res.send("SocialSparrow API Server is Live!");
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/social", socialAuthRouter);
app.use("/api/accounts", accountRoute);
app.use("/api/posts", postRoute);
app.use("/api/activity", activityRouter);

// Global Error Handler
app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error("Global API Error:", err);
        res.status(500).json({
            message: err?.response?.data?.message || err?.message || "Internal Server Error"
        });
    }
);

if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app;