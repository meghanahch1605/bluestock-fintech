import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  applyJob,
  myApplications,
  jobApplicants,
  changeStatus,
  updateStatus,
  getCompanyApplications,
  getJobApplications,
  getApplicationDetails,
} from "../controllers/applicationController.js";


const router = express.Router();

// Candidate apply to job
router.post("/apply", authMiddleware, applyJob);

// Candidate view their applications
router.get("/my", authMiddleware, myApplications);

// Company view all applicants for a job
router.get("/job/:id", authMiddleware, jobApplicants);
router.put("/status", authMiddleware, changeStatus);
router.put("/status", authMiddleware, updateStatus);
// Company → all received applications
router.get("/company", authMiddleware, getCompanyApplications);

// Get applicants for specific job
router.get("/job/:jobId", authMiddleware, getJobApplications);

// Detailed application info
router.get("/:id", authMiddleware, getApplicationDetails);


export default router;
