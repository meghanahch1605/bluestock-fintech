import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
} from "../models/jobModel.js";

// 1️⃣ Post Job
export const postJob = async (req, res) => {
  try {
    const companyId = req.user.id;
    const { title, description, location, salary, job_type } = req.body;

    const newJob = await createJob({
      company_id: companyId,
      title,
      description,
      location,
      salary,
      job_type,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Job Post Error:", error);
    return res.status(500).json({ success: false, message: "Job posting failed" });
  }
};

// 2️⃣ Get All Jobs
export const fetchAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    return res.status(200).json({ success: true, jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// 3️⃣ Get Job Details
export const fetchJobDetails = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);

    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    return res.status(200).json({ success: true, job });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 4️⃣ Update Job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const companyId = req.user.id;

    const existingJob = await getJobById(jobId);

    if (!existingJob)
      return res.status(404).json({ success: false, message: "Job not found" });

    if (existingJob.company_id !== companyId)
      return res.status(403).json({ success: false, message: "Not authorized" });

    const updatedJob = await updateJobById(jobId, req.body);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};

// 5️⃣ Delete Job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const companyId = req.user.id;

    const existingJob = await getJobById(jobId);

    if (!existingJob)
      return res.status(404).json({ success: false, message: "Job not found" });

    if (existingJob.company_id !== companyId)
      return res.status(403).json({ success: false, message: "Not authorized" });

    await deleteJobById(jobId);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed" });
  }
};
