import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    platform?: string;
    platforms?: string[] | string;
    scheduledFor: Date;
    status: "draft" | "scheduled" | "published" | "published_failed";
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ["image", "video"] },
    platform: { type: String },
    platforms: { type: Schema.Types.Mixed },
    scheduledFor: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ["draft", "scheduled", "published", "published_failed"], 
        default: "scheduled" 
    }
}, { timestamps: true });

export const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;