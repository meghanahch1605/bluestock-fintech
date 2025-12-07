import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validateInput.js";
import {
  register,
  login,
  verifyEmail,
  verifyMobile
} from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/register",
  validate([
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("full_name").notEmpty(),
    body("gender").isIn(["m", "f", "o"]),
    body("mobile_no").isMobilePhone()
  ]),
  register
);

router.post(
  "/login",
  validate([
    body("email").isEmail(),
    body("password").notEmpty()
  ]),
  login
);

router.get("/verify-email", verifyEmail);

router.post(
  "/verify-mobile",
  validate([body("mobile_no").isMobilePhone()]),
  verifyMobile
);

export default router;
