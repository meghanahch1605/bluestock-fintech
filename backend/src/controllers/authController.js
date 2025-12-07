import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  verifyEmailInDB,
  verifyMobileInDB
} from "../models/userModel.js";
import {
  createFirebaseUser,
  sendEmailVerificationLink
} from "../services/firebaseService.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, full_name, gender, mobile_no } = req.body;

    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Firebase user
    await createFirebaseUser(email, password);

    // Save user in PostgreSQL
    const user = await createUser({
      email,
      password: hashedPassword,
      full_name,
      gender,
      mobile_no,
      signup_type: "e"
    });

    // Generate email verification link
    const emailLink = await sendEmailVerificationLink(email);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      verify_email_link: emailLink
    });

  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      success: true,
      token,
      data: { user_id: user.id }
    });

  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    const updated = await verifyEmailInDB(email);

    res.json({
      success: true,
      message: "Email verified",
      data: updated
    });

  } catch (err) {
    next(err);
  }
};

export const verifyMobile = async (req, res, next) => {
  try {
    const { mobile_no } = req.body;

    const updated = await verifyMobileInDB(mobile_no);

    res.json({
      success: true,
      message: "Mobile verified",
      data: updated
    });

  } catch (err) {
    next(err);
  }
};
