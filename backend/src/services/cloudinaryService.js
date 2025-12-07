import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Load Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===============================
// 🔹 Upload Company Logo (Image)
// ===============================
export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "company_logos",
      resource_type: "image",
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Image Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

// ===============================
// 🔹 Upload Candidate Resume (PDF/DOC/Image)
// ===============================
export const uploadResume = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "candidate_resumes",
      resource_type: "raw",  // ⭐ IMPORTANT for PDFs, DOCX, etc.
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Resume Upload Error:", error);
    throw new Error("Resume upload failed");
  }
};
