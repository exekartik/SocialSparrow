import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAccounts, addAccount, disconnectAccount } from "../controllers/accountController.js";

const accountRoute = Router();

// Connected Accounts Routes
accountRoute.get("/get-account", authMiddleware, getAccounts);
accountRoute.get("/", authMiddleware, getAccounts);

accountRoute.post("/add-account", authMiddleware, addAccount);
accountRoute.post("/", authMiddleware, addAccount);

accountRoute.delete("/:id", authMiddleware, disconnectAccount);

export default accountRoute;
