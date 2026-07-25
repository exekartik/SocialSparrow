import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/Db";
import authRouter from "./routes/user.route";
import socialAuthRouter from "./routes/SocialAuthRouters";
import accountRoute from "./routes/accountRoute";
import postRoute from "./routes/postRoute";
import activityRouter from "./routes/activityroute";
import internalRouter from "./routes/internalRoute";

const app = express();

// ─── CORS (MUST be first — handles OPTIONS preflight before anything else) ─────
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:4173",
    "https://social-sparrow-one.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, mobile apps, server-to-server)
        if (!origin) return callback(null, true);
        
        // Allow any local development origin (localhost or 127.0.0.1 on any port)
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }

        // Allow explicitly configured origins
        if (allowedOrigins.some(allowed => origin === allowed || origin.startsWith(allowed))) {
            return callback(null, true);
        }

        // Allow all *.vercel.app subdomains dynamically (preview deployments)
        if (origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }

        // Reject cleanly without crashing express
        callback(null, false);
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
    import("./services/SchedulerService").then((m) => m.initScheduler()).catch((err) => {
        console.warn("Scheduler init warning:", err?.message || err);
    });
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
app.use("/api/internal", internalRouter);

// ─── 404 Fallback Handler (ensures serverless never hangs) ────────────────────
app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: "API Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
        console.error("Global API Error:", err);
        const isDuplicateKey = err?.code === 11000;
        const isValidationError = err?.name === "ValidationError" || err?.name === "CastError";
        const message = isDuplicateKey
            ? "An account with this email already exists."
            : isValidationError
                ? "The submitted data is invalid. Please review the form and try again."
                : err?.response?.data?.message || err?.message || "Internal Server Error";
        const status = isDuplicateKey ? 409 : isValidationError ? 400 : err?.status || err?.statusCode || 500;
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
