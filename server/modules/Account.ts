import mongoose, { Document, Model } from "mongoose";

export interface IAccount extends Document {
    user: mongoose.Types.ObjectId;
    platform: "twitter" | "instagram" | "youtube" | "tiktok" | "facebook" | "facebook_page" | "linkedin_page" | "google_business";
    platformUserId?: string;
    accessToken?: string;
    refreshToken?: string;
    avatarUrl: string;
    handle: string;
    status: "connected" | "disconnected";
    zernioAccountId: string;
}

const accountSchema = new mongoose.Schema<IAccount>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    platform: { 
        type: String, 
        enum: ["twitter", "instagram", "youtube", "tiktok", "facebook", "facebook_page", "linkedin_page", "google_business"], 
        required: true 
    },
    platformUserId: { type: String, required: false, default: "" },
    accessToken: { type: String, required: false, default: "" },
    refreshToken: { type: String, required: false, default: "" },
    avatarUrl: { type: String, required: true },
    handle: { type: String, required: true },
    status: { type: String, enum: ["connected", "disconnected"], required: true, default: "connected" },
    zernioAccountId: { type: String, required: true }
}, { timestamps: true });

export const Account: Model<IAccount> = mongoose.model<IAccount>("Account", accountSchema);