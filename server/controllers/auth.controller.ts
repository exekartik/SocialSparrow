import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user.model";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import { hashToken } from "../utils/hash";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidatedRegistration = {
    name: string;
    email: string;
    password: string;
};

const getRegistrationData = (body: unknown): ValidatedRegistration | { message: string } => {
    const { name, email, password } = (body ?? {}) as Record<string, unknown>;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return { message: "Name, email and password are required." };
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 50) {
        return { message: "Name must be between 2 and 50 characters." };
    }
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
        return { message: "Enter a valid email address." };
    }
    if (password.length < 8 || password.length > 128) {
        return { message: "Password must be between 8 and 128 characters." };
    }

    return { name: normalizedName, email: normalizedEmail, password };
};

const isValidationMessage = (value: ValidatedRegistration | { message: string }): value is { message: string } =>
    "message" in value;

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
        const registration = getRegistrationData(req.body);
        if (isValidationMessage(registration)) {
            res.status(400).json({ message: registration.message });
            return;
        }

        // 2. Check for existing user
        const userExists = await User.findOne({ email: registration.email });

        if (userExists) {
            res.status(400).json({
                message: "User already exists with this email",
            });
            return;
        }

        // 3. Create the user
        // Note: We don't hash the password here because the Mongoose pre-save hook in user.model.ts handles it!
        const user = await User.create({
            ...registration,
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
            token: accessToken,
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
        const { email, password } = (req.body ?? {}) as Record<string, unknown>;
        if (typeof email !== "string" || typeof password !== "string") {
            res.status(400).json({ message: "Email and password are required." });
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!EMAIL_PATTERN.test(normalizedEmail) || password.length === 0) {
            res.status(400).json({ message: "Enter a valid email address and password." });
            return;
        }

        // We must use .select("+password") because we set `select: false` in the User schema
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

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
            token: accessToken,
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
