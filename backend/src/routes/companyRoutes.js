import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyProfile,
  updateCompany
} from "../controllers/companyController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import  upload  from "../middleware/upload.js";

const router = express.Router();

// Register
router.post("/register", registerCompany);

// Login
router.post("/login", loginCompany);

// Get Profile (Protected)
router.get("/profile", authMiddleware, getCompanyProfile);

// Update Profile (Protected + Upload)
router.put("/update", authMiddleware, upload.single("logo"), updateCompany);

export default router;
