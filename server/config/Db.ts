import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables. " +
                "If you are running on Vercel, please add MONGODB_URI under Settings -> Environment Variables in the Vercel Dashboard, then redeploy."
            );
        }
        await mongoose.connect(uri);
        console.log("Database Connected Successfully");
    } catch (error: any) {
        console.error("Database Connection Error:", error.message || error);
        throw error;
    }
}

export default connectDB;