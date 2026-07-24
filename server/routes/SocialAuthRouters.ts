import { Router } from "express";

import { generateAuthUrl, syncAccounts } from "../controllers/SocialAuthController.js"

const router = Router()

router.get("/auth/:platform", generateAuthUrl)

router.get("/sync", syncAccounts)

export default router