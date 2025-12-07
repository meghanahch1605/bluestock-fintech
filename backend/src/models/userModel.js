import pool from "../config/db.js";

export const createUser = async ({
  email,
  password,
  full_name,
  gender,
  mobile_no,
  signup_type
}) => {
  const query = `
    INSERT INTO users 
    (email, password, full_name, gender, mobile_no, signup_type) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [email, password, full_name, gender, mobile_no, signup_type];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const verifyEmailInDB = async (email) => {
  const result = await pool.query(
    "UPDATE users SET is_email_verified = true WHERE email = $1 RETURNING *",
    [email]
  );
  return result.rows[0];
};

export const verifyMobileInDB = async (mobile_no) => {
  const result = await pool.query(
    "UPDATE users SET is_mobile_verified = true WHERE mobile_no = $1 RETURNING *",
    [mobile_no]
  );
  return result.rows[0];
};
