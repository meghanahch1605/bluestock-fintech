import multer from "multer";
import fs from "fs";

// Ensure uploads folder exists
const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Store files in uploads/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Create multer upload instance
const upload = multer({ storage });

// MUST export default for your import to work
export default upload;
