import express from "express";
import {
  registerCandidate,
  loginCandidate,
  getCandidateProfile,
  updateCandidateProfile,
} from "../controllers/candidateController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Register
router.post("/register", registerCandidate);

// Login
router.post("/login", loginCandidate);

// Get profile (protected)
router.get("/profile", authMiddleware, getCandidateProfile);

// Update profile + upload resume
router.put("/update", authMiddleware, upload.single("resume"), updateCandidateProfile);

export default router;
