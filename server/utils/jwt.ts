import jwt from "jsonwebtoken";
import { Types } from "mongoose";

/**
 * ===========================================================
 *   JWT UTILITIES
 * 
 *   Purpose:
 *   Handles the generation of JSON Web Tokens for authentication.
 * ===========================================================
 */

/**
 * Generates an Access Token for a given user ID.
 * Access tokens are typically short-lived and used for authenticating API requests.
 * 
 * @param userId - The MongoDB ObjectId of the user
 * @returns The signed JWT access token string
 */
export const generateAccessToken = (userId: Types.ObjectId | string): string => {
    return jwt.sign(
        { id: userId.toString() },
        process.env.JWT_SECRET || "fallbackSecret",
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as jwt.SignOptions["expiresIn"],
        }
    );
};

/**
 * Generates a Refresh Token for a given user ID.
 * Refresh tokens are long-lived and used to request new access tokens without logging in again.
 * 
 * @param userId - The MongoDB ObjectId of the user
 * @returns The signed JWT refresh token string
 */
export const generateRefreshToken = (userId: Types.ObjectId | string): string => {
    return jwt.sign(
        { id: userId.toString() },
        process.env.JWT_REFRESH_SECRET || "fallbackRefreshSecret",
        {
            expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"],
        }
    );
};