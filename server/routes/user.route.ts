import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const authRouter = Router();

// Public Authentication Routes (no token required)
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

// Protected Auth / User Profile Route
authRouter.get("/me", authMiddleware, (req: any, res: any) => {
    res.status(200).json({ success: true, user: req.user });
});

export default authRouter;