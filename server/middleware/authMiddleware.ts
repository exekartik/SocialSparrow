import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/user.model.js";

/**
 * ===========================================================
 *   AUTHENTICATION MIDDLEWARE
 * 
 *   Purpose:
 *   Intercepts incoming requests, extracts the JWT access token
 *   from the Authorization header, verifies it, fetches the
 *   corresponding user from MongoDB, and attaches the user
 *   object to the request.
 * ===========================================================
 */

/**
 * Custom request interface extending Express.Request to include
 * authenticated user details and optional token/provider context.
 */
export interface AuthRequest extends Request {
    user?: any; // The authenticated user document
    token?: string;
    provider?: string;
}

/**
 * Decoded JWT access token payload structure.
 */
interface DecodedToken {
    id: string;
    iat?: number;
    exp?: number;
}

/**
 * Middleware function to enforce authentication on protected routes.
 * 
 * Flow:
 * 1. Read authorization header.
 * 2. Extract bearer token.
 * 3. Verify token signature against JWT_SECRET.
 * 4. Retrieve user from MongoDB by the decoded user ID.
 * 5. Attach user to the request object.
 * 6. Call next() to proceed to the route controller.
 */
export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    // 1. Extract the token from the Authorization header (expects "Bearer <token>")
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith("Bearer ") 
        ? authHeader.split(" ")[1] 
        : authHeader?.split(" ")[1]; // Fallback to raw split if not prefixed

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // 2. Verify the JWT token
        const decodedToken = jwt.verify(
            token, 
            process.env.JWT_SECRET || "fallbackSecret"
        ) as DecodedToken;

        // 3. Retrieve the user from database to ensure they still exist
        // Exclude the password field for security
        const user = await User.findById(decodedToken.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found or invalid token." });
        }

        // 4. Attach user data to request object
        req.user = user;
        req.token = token;

        next();
    } catch (error: any) {
        console.error("Auth Middleware Error:", error?.message || error);
        res.status(401).json({ message: "Invalid or expired token." });
    }
};