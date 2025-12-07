import {
  applyToJob,
  checkExistingApplication,
  getApplicationsByCandidate,
  getApplicantsForJob,
  updateApplicationStatus,
  getApplicationsByCompany,
  getApplicationsByJob,
  getApplicationById,
} from "../models/applicationModel.js";

// 1️⃣ Candidate applies to a job
export const applyJob = async (req, res) => {
  try {
    const candidate_id = req.user.id;  // from JWT
    const { job_id } = req.body;

    // Check duplicate application
    const existing = await checkExistingApplication(candidate_id, job_id);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already applied for this job",
      });
    }

    const application = await applyToJob({ candidate_id, job_id });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

  } catch (error) {
    console.error("Apply Job Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ Candidate views their applications
export const myApplications = async (req, res) => {
  try {
    const candidate_id = req.user.id;

    const applications = await getApplicationsByCandidate(candidate_id);

    return res.json({ success: true, applications });

  } catch (error) {
    console.error("My Applications Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3️⃣ Company views applicants for a job
export const jobApplicants = async (req, res) => {
  try {
    const job_id = req.params.id;

    const applicants = await getApplicantsForJob(job_id);

    return res.json({ success: true, applicants });

  } catch (error) {
    console.error("Job Applicants Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const changeStatus = async (req, res) => {
  try {
    const { application_id, status } = req.body;

    const valid = ["shortlisted", "rejected", "selected"];

    if (!valid.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updated = await updateApplicationStatus(application_id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
      application: updated,
    });

  } catch (error) {
    console.error("Status Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { application_id, status } = req.body;

    const valid = ["applied", "shortlisted", "rejected", "selected"];
    if (!valid.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updated = await updateApplicationStatus(application_id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Status updated to ${status}`,
      application: updated,
    });
  } catch (error) {
    console.error("Status Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// 1️⃣ All applications received by company
export const getCompanyApplications = async (req, res) => {
  try {
    const companyId = req.user.id;

    const applications = await getApplicationsByCompany(companyId);

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error("Company Applications Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ All applicants for a single job
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await getApplicationsByJob(jobId);

    return res.status(200).json({
      success: true,
      applications,
    });

  } catch (error) {
    console.error("Job Applications Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3️⃣ Single application details
export const getApplicationDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await getApplicationById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });

  } catch (error) {
    console.error("Application Detail Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
