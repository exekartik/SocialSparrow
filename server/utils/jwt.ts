import jwt from "jsonwebtoken";
import { Types } from "mongoose";

const getAccessSecret = () => {
    return process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET || "fallbackSecret";
};

const getRefreshSecret = () => {
    return process.env.JWT_REFRESH_SECRET || "fallbackRefreshSecret";
};

/**
 * Generates an Access Token for a given user ID.
 * Defaults to 7d in development to prevent frequent session expiration.
 */
export const generateAccessToken = (userId: Types.ObjectId | string): string => {
    return jwt.sign(
        { id: userId.toString() },
        getAccessSecret(),
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || process.env.JWT_ACCESS_EXPIRES || "7d") as jwt.SignOptions["expiresIn"],
        }
    );
};

/**
 * Generates a Refresh Token for a given user ID.
 */
export const generateRefreshToken = (userId: Types.ObjectId | string): string => {
    return jwt.sign(
        { id: userId.toString() },
        getRefreshSecret(),
        {
            expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || process.env.JWT_REFRESH_EXPIRES || "30d") as jwt.SignOptions["expiresIn"],
        }
    );
};