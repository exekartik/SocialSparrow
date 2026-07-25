import multer from "multer";

// Use memory storage for serverless environments (Vercel, etc.)
// Disk storage is not supported in read-only serverless filesystems.
const storage = multer.memoryStorage();

export const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});
export default upload;