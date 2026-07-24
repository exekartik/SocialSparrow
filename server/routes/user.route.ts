import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import {authMiddleware} from "../middleware/authMiddleware.js"
const authRouter = Router();

authRouter.post("/register", authMiddleware, registerUser);
authRouter.post("/login", authMiddleware,loginUser);

export default authRouter;