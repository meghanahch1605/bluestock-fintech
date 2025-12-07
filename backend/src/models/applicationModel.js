import pool from "../config/db.js";

// Apply for a job
export const applyToJob = async ({ candidate_id, job_id }) => {
  const result = await pool.query(
    `INSERT INTO applications (candidate_id, job_id)
     VALUES ($1, $2)
     RETURNING *`,
    [candidate_id, job_id]
  );

  return result.rows[0];
};

// Check if already applied
export const checkExistingApplication = async (candidate_id, job_id) => {
  const result = await pool.query(
    `SELECT * FROM applications WHERE candidate_id = $1 AND job_id = $2`,
    [candidate_id, job_id]
  );
  return result.rows[0];
};

// Candidate: list my applications
export const getApplicationsByCandidate = async (candidate_id) => {
  const result = await pool.query(
    `SELECT a.id, a.status, a.created_at, j.title, j.location, j.salary
     FROM applications a
     JOIN jobs j ON j.id = a.job_id
     WHERE a.candidate_id = $1`,
    [candidate_id]
  );
  return result.rows;
};

// Company: list applicants for a job
export const getApplicantsForJob = async (job_id) => {
  const result = await pool.query(
    `SELECT a.id, a.status, c.name, c.email, c.skills, c.resume_url
     FROM applications a
     JOIN candidates c ON c.id = a.candidate_id
     WHERE a.job_id = $1`,
    [job_id]
  );
  return result.rows;
};
export const updateApplicationStatus = async (application_id, status) => {
  const result = await pool.query(
    `UPDATE applications 
     SET status = $1
     WHERE id = $2
     RETURNING *`,
    [status, application_id]
  );

  return result.rows[0];
};



// 1️⃣ Get all applications for a company
export const getApplicationsByCompany = async (companyId) => {
  const result = await pool.query(
    `SELECT a.*, 
            c.name AS candidate_name,
            c.email AS candidate_email,
            j.title AS job_title
     FROM applications a
     JOIN candidates c ON a.candidate_id = c.id
     JOIN jobs j ON a.job_id = j.id
     WHERE j.company_id = $1
     ORDER BY a.created_at DESC`,
    [companyId]
  );

  return result.rows;
};

// 2️⃣ Get all applicants for a single job
export const getApplicationsByJob = async (jobId) => {
  const result = await pool.query(
    `SELECT a.*, 
            c.name AS candidate_name,
            c.email AS candidate_email
     FROM applications a
     JOIN candidates c ON a.candidate_id = c.id
     WHERE a.job_id = $1
     ORDER BY a.created_at DESC`,
    [jobId]
  );

  return result.rows;
};

// 3️⃣ Get full application details
export const getApplicationById = async (id) => {
  const result = await pool.query(
    `SELECT a.*, 
            c.name AS candidate_name,
            c.email AS candidate_email,
            c.skills,
            c.experience,
            c.resume_url,
            j.title AS job_title,
            j.location,
            j.salary
     FROM applications a
     JOIN candidates c ON a.candidate_id = c.id
     JOIN jobs j ON a.job_id = j.id
     WHERE a.id = $1`,
    [id]
  );

  return result.rows[0];
};
