import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
    user: mongoose.Types.ObjectId;
    actionType: "post" | "comment" | "share" | "account_connect" | "account_disconnect" | "generate" | "schedule";
    description: string;
    relatedPost?: mongoose.Types.ObjectId;
    platform?: string;
    createdAt: Date;
    updatedAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionType: { 
        type: String, 
        required: true, 
        enum: ["post", "comment", "share", "account_connect", "account_disconnect", "generate", "schedule"] 
    },
    description: { type: String, required: true },  
    relatedPost: { type: Schema.Types.ObjectId, ref: "Post" },
    platform: { type: String }
}, { timestamps: true });

export const ActivityLog = mongoose.model<IActivityLog>("ActivityLog", activityLogSchema);
export default ActivityLog;