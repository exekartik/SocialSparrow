import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDNARY_CLOUD_NAME || "dpmayijgs",
  api_key: process.env.CLOUDINARY_API_KEY || process.env.CLOUDNARY_CLOUD_API_KEY || "456895165363741",
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.CLOUDNARY_CLOUD_API_SECRET || "3UPX3lTqML8aidVQsSBLt_9jSP8",
});

export default cloudinary;