import mongoose, { Document, Schema } from 'mongoose';

export interface IGeneration extends Document {
    user: mongoose.Types.ObjectId;
    prompt: string;
    content: string;
    mediaUrl?: string;
    mediaType?: "image" | "video";
    tone?: string;
    createdAt: Date;
    updatedAt: Date;
}

const generationSchema = new Schema<IGeneration>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String },
    mediaType: { type: String, enum: ["image", "video"], default: "image" },
    tone: { type: String, default: "Professional" }
}, { timestamps: true });

export const Generation = mongoose.model<IGeneration>("Generation", generationSchema);
export default Generation;