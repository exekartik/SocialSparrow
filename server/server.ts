import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/Db";
import authRouter from "./routes/user.route";
import socialAuthRouter from "./routes/SocialAuthRouters";
import accountRoute from "./routes/accountRoute";
import postRoute from "./routes/postRoute";
import activityRouter from "./routes/activityroute";
import { initScheduler } from "./services/SchedulerService";

const app = express();

// ─── CORS (MUST be first — handles OPTIONS preflight before anything else) ─────
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    "https://social-sparrow-one.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, mobile apps, server-to-server)
        if (!origin) return callback(null, true);
        // Allow whitelisted origins
        if (allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed))) {
            return callback(null, true);
        }
        // Allow all *.vercel.app subdomains dynamically (preview deployments)
        if (origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }
        callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// ─── Body Parser ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Database Connection Middleware (lazy connect — safe for Vercel serverless) ─
app.use(async (_req: Request, res: Response, next: NextFunction) => {
    try {
        await connectDB();
        next();
    } catch (err: any) {
        console.error("DB connection middleware error:", err.message);
        res.status(503).json({ message: "Service temporarily unavailable. Database connection failed." });
    }
});

// ─── Scheduler (only in non-serverless / long-running environments) ────────────
if (process.env.NODE_ENV !== "production") {
    initScheduler();
}

const port = process.env.PORT || 3000;

// ─── Health Check (handles both / and /api) ──────────────────────────────────
app.get(["/", "/api"], (_req: Request, res: Response) => {
    res.json({ status: "ok", message: "SocialSparrow API Server is Live!" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRouter);
app.use("/api/social", socialAuthRouter);
app.use("/api/accounts", accountRoute);
app.use("/api/posts", postRoute);
app.use("/api/activity", activityRouter);

// ─── 404 Fallback Handler (ensures serverless never hangs) ────────────────────
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "API Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error("Global API Error:", err);
        const message = err?.response?.data?.message || err?.message || "Internal Server Error";
        const status = err?.status || err?.statusCode || 500;
        res.status(status).json({ message });
    }
);

// ─── Local Dev Server ─────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== "production") {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app;