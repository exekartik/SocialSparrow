import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { hashToken } from "../utils/hash.js";

/**
 * ===========================================================
 *   AUTH CONTROLLER
 * 
 *   Purpose:
 *   Handles incoming HTTP requests related to user authentication
 *   (Registration, Login, etc.)
 * ===========================================================
 */

/**
 * Register a new user
 * 
 * Flow:
 * 1. Extract name, email, password from request body
 * 2. Validate inputs
 * 3. Check if a user with the email already exists
 * 4. Create the new user in the database (password is hashed automatically by Mongoose pre-save hook)
 * 5. Generate Access & Refresh tokens
 * 6. Hash the refresh token and save it to the user document
 * 7. Send success response with tokens and user data
 */
export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            res.status(400).json({
                message: "Name, email and password are required",
            });
            return;
        }

        // 2. Check for existing user
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({
                message: "User already exists with this email",
            });
            return;
        }

        // 3. Create the user
        // Note: We don't hash the password here because the Mongoose pre-save hook in user.model.ts handles it!
        const user = await User.create({
            name,
            email,
            password,
        });

        // 4. Generate Tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // 5. Hash and store the refresh token for security
        user.refreshToken = hashToken(refreshToken);
        await user.save();

        // 6. Return response (excluding password and refresh token from the returned user object)
        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            refreshToken, // Send the raw refresh token to the client
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        });

    } catch (error: any) {
        next(error);
    }
};

/**
 * Login an existing user
 * 
 * Flow:
 * 1. Extract email and password
 * 2. Find user by email (explicitly selecting the password field since it's select:false by default)
 * 3. Compare passwords using the instance method from the User model
 * 4. Generate new Access & Refresh tokens
 * 5. Hash and save the new refresh token to the database
 * 6. Send response
 */
export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }

        // We must use .select("+password") because we set `select: false` in the User schema
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Compare the provided password with the hashed password in the DB
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }

        // Generate Tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Update the refresh token in the database
        user.refreshToken = hashToken(refreshToken);
        await user.save();

        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        });

    } catch (error: any) {
        next(error);
    }
};