import "dotenv/config";
import connectDB from "../config/Db.js";
import { User } from "../modules/user.model.js";
import Post from "../modules/post.js";
import ActivityLog from "../modules/ActivityLog.js";
import Generation from "../modules/Generation.js";
import { Account } from "../modules/Account.js";

async function clearDatabase() {
    try {
        console.log("Connecting to Database...");
        await connectDB();

        console.log("Clearing all MongoDB collection data...");

        const [users, posts, activities, generations, accounts] = await Promise.all([
            User.deleteMany({}),
            Post.deleteMany({}),
            ActivityLog.deleteMany({}),
            Generation.deleteMany({}),
            Account.deleteMany({}),
        ]);

        console.log("-----------------------------------------");
        console.log(`Deleted Users: ${users.deletedCount}`);
        console.log(`Deleted Posts: ${posts.deletedCount}`);
        console.log(`Deleted Activity Logs: ${activities.deletedCount}`);
        console.log(`Deleted AI Generations: ${generations.deletedCount}`);
        console.log(`Deleted Accounts: ${accounts.deletedCount}`);
        console.log("-----------------------------------------");
        console.log("Database cleared successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error clearing database:", error);
        process.exit(1);
    }
}

clearDatabase();
