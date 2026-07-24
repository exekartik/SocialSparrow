import crypto from "crypto";

/**
 * ===========================================================
 *   HASHING UTILITIES
 * 
 *   Purpose:
 *   Provides cryptographic hashing functions for security.
 * ===========================================================
 */

/**
 * Generates a SHA256 hash of a given string.
 * 
 * Why?
 * Used primarily for hashing Refresh Tokens before storing them in the database.
 * This ensures that if the database is compromised, the original tokens cannot be 
 * used by an attacker to authenticate.
 * 
 * @param token - The plain text token (e.g., refresh token) to hash
 * @returns The SHA256 hashed string in hex format
 */
export const hashToken = (token: string): string => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
