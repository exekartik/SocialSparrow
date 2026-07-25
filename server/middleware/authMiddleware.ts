import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user.model";
import { getAccessSecret } from "../utils/jwt";

export interface AuthRequest extends Request {
    user?: any;
    token?: string;
    provider?: string;
}

interface DecodedToken {
    id: string;
    iat?: number;
    exp?: number;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    let secret: string;
    try {
        secret = getAccessSecret();
    } catch (error) {
        next(error);
        return;
    }

    try {
        const decodedToken = jwt.verify(token, secret) as DecodedToken;

        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found or invalid token." });
        }

        req.user = user;
        req.token = token;

        next();
    } catch (error: any) {
        console.error("Auth Middleware Error:", error?.message || error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};
