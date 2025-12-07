import bcrypt from "bcrypt";
import { createCompany, findCompanyByEmail } from "../models/companyModel.js";
import { generateToken } from "../utils/jwt.js";
import { uploadImage } from "../services/cloudinaryService.js";
import { updateCompanyProfile } from "../services/companyService.js";

/* ----------------------- REGISTER COMPANY ----------------------- */
export const registerCompany = async (req, res) => {
  try {
    const { name, email, password, address, website } = req.body;

    const existing = await findCompanyByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const companyData = {
      name,
      email,
      password: hashedPassword,
      address,
      website,
      logo_url: null, // will be updated later
    };

    const company = await createCompany(companyData);

    return res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
  } catch (error) {
    console.error("Company Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ----------------------- LOGIN COMPANY ----------------------- */
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await findCompanyByEmail(email);
    if (!company) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      id: company.id,
      email: company.email,
      role: "company",
    });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      company: {
        id: company.id,
        name: company.name,
        email: company.email,
        address: company.address,
        website: company.website,
        logo_url: company.logo_url,
      },
    });
  } catch (error) {
    console.error("Company Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ----------------------- GET PROFILE (Protected) ----------------------- */
export const getCompanyProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      message: "Authorized request",
      company: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ----------------------- UPDATE PROFILE ----------------------- */
export const updateCompany = async (req, res) => {
  try {
    const companyId = req.user.id; // FIXED (req.user, not req.company)

    const { name, address, website } = req.body;

    let logoUrl = null;

    if (req.file) {
      logoUrl = await uploadImage(req.file.path);
    }

    const updatedCompany = await updateCompanyProfile(companyId, {
      name,
      address,
      website,
      ...(logoUrl && { logo_url: logoUrl }),
    });

    return res.json({
      success: true,
      message: "Company profile updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};
