import { Router } from "express";
import { generateAuthUrl, syncAccounts } from "../controllers/SocialAuthController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const socialAuthRouter = Router();

// Social OAuth Integration Routes
socialAuthRouter.get("/auth/:platform", authMiddleware, generateAuthUrl);
socialAuthRouter.get("/sync", authMiddleware, syncAccounts);

export default socialAuthRouter;