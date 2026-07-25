import jwt from "jsonwebtoken";
import { Types } from "mongoose";

type ConfigError = Error & { statusCode: number };

const missingSecretError = (name: string): ConfigError => {
    const error = new Error(`${name} is not configured. Add it to the server environment variables.`) as ConfigError;
    error.statusCode = 503;
    return error;
};

export const getAccessSecret = (): string => {
    const secret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET;
    if (!secret) {
        throw missingSecretError("JWT_ACCESS_SECRET");
    }
    return secret.trim();
};

const getRefreshSecret = (): string => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throw missingSecretError("JWT_REFRESH_SECRET");
    }
    return secret.trim();
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
