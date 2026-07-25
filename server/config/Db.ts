import mongoose from "mongoose";

// Cache the connection for serverless (Vercel) environments
let isConnected = false;

const connectDB = async () => {
    if (isConnected && mongoose.connection.readyState === 1) {
        return; // Already connected, reuse existing connection
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables. " +
                "If you are running on Vercel, please add MONGODB_URI under Settings -> Environment Variables in the Vercel Dashboard, then redeploy."
            );
        }
        
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000, // 10s timeout for serverless
            socketTimeoutMS: 45000,
        });
        
        isConnected = true;
        console.log("Database Connected Successfully");
    } catch (error: any) {
        isConnected = false;
        console.error("Database Connection Error:", error.message || error);
        throw error;
    }
}

export default connectDB;