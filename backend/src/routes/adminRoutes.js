import express from "express";
import { adminLogin,
    getAllCompanies,
    getAllCandidates,
    getAllJobs,
    getAllApplications,
    deleteCompany,
    deleteCandidate,
    deleteJob
 } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);

// Dashboard Data
router.get("/companies", authMiddleware, getAllCompanies);
router.get("/candidates", authMiddleware, getAllCandidates);
router.get("/jobs", authMiddleware, getAllJobs);
router.get("/applications", authMiddleware, getAllApplications);

// Delete (admin only)
router.delete("/delete/company/:id", authMiddleware, deleteCompany);
router.delete("/delete/candidate/:id", authMiddleware, deleteCandidate);
router.delete("/delete/job/:id", authMiddleware, deleteJob);

export default router;
