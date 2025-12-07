import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import pool from "../config/db.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `SELECT * FROM admins WHERE email = $1`,
      [email]
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: "admin"
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ===========================================
// 1️⃣ Get all companies
// ===========================================
export const getAllCompanies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM companies ORDER BY created_at DESC");

    return res.json({ success: true, companies: result.rows });
  } catch (error) {
    console.error("Admin Get Companies Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================================
// 2️⃣ Get all candidates
// ===========================================
export const getAllCandidates = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM candidates ORDER BY created_at DESC");

    return res.json({ success: true, candidates: result.rows });
  } catch (error) {
    console.error("Admin Get Candidates Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================================
// 3️⃣ Get all jobs
// ===========================================
export const getAllJobs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM jobs ORDER BY created_at DESC");

    return res.json({ success: true, jobs: result.rows });
  } catch (error) {
    console.error("Admin Get Jobs Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================================
// 4️⃣ Get all applications
// ===========================================
export const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT applications.*, candidates.name AS candidate_name, companies.name AS company_name
      FROM applications
      JOIN candidates ON candidates.id = applications.candidate_id
      JOIN companies ON companies.id = applications.job_id
      ORDER BY applications.created_at DESC
    `);

    return res.json({ success: true, applications: result.rows });
  } catch (error) {
    console.error("Admin Get Applications Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===========================================
// Delete APIs
// ===========================================
export const deleteCompany = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM companies WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ success: false, message: "Company not found" });

    return res.json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Delete Company Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM candidates WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ success: false, message: "Candidate not found" });

    return res.json({ success: true, message: "Candidate deleted successfully" });
  } catch (error) {
    console.error("Delete Candidate Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM jobs WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);

    if (result.rowCount === 0)
      return res.status(404).json({ success: false, message: "Job not found" });

    return res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
