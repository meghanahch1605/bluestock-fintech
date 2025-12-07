import express from "express";
import {
  postJob,
  fetchAllJobs,
  fetchJobDetails,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Job (Company Only)
router.post("/post", authMiddleware, postJob);

// Get all jobs (Public)
router.get("/", fetchAllJobs);

// Get job by ID (Public)
router.get("/:id", fetchJobDetails);

// Update job (Company Only)
router.put("/:id", authMiddleware, updateJob);

// Delete job (Company Only)
router.delete("/:id", authMiddleware, deleteJob);

export default router;
