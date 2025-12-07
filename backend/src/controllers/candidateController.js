import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import {
  createCandidate,
  findCandidateByEmail,
  getCandidateById,
  updateCandidateById,
} from "../models/candidateModel.js";
import { uploadResume } from "../services/cloudinaryService.js";

// 1️⃣ Register Candidate
export const registerCandidate = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await findCandidateByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const candidate = await createCandidate({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      success: true,
      message: "Candidate registered successfully",
      candidate,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 2️⃣ Login Candidate
export const loginCandidate = async (req, res) => {
  try {
    const { email, password } = req.body;

    const candidate = await findCandidateByEmail(email);
    if (!candidate) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken({
      id: candidate.id,
      email: candidate.email,
      role: "candidate",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      candidate,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 3️⃣ Get Candidate Profile
export const getCandidateProfile = async (req, res) => {
  try {
    const candidate = await getCandidateById(req.user.id);
    return res.status(200).json({ success: true, profile: candidate });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 4️⃣ Update Candidate Profile + Resume Upload
export const updateCandidateProfile = async (req, res) => {
  try {
    const candidateId = req.user.id;
    const { name, phone, skills, experience } = req.body;

    let resumeUrl = null;

    if (req.file) {
      resumeUrl = await uploadResume(req.file.path);
    }

    const updated = await updateCandidateById(candidateId, {
      name,
      phone,
      skills,
      experience,
      resume_url: resumeUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      candidate: updated,
    });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(500).json({ success: false, message: "Update failed" });
  }
};
