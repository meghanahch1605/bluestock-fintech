import pool from "../config/db.js";

export const createCandidate = async (data) => {
  const { name, email, password, phone } = data;

  const result = await pool.query(
    `INSERT INTO candidates (name, email, password, phone)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, email, password, phone]
  );

  return result.rows[0];
};

export const findCandidateByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM candidates WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};

export const getCandidateById = async (id) => {
  const result = await pool.query(
    `SELECT * FROM candidates WHERE id = $1`,
    [id]
  );

  return result.rows[0];
};

export const updateCandidateById = async (id, data) => {
  const { name, phone, skills, experience, resume_url } = data;

  const result = await pool.query(
    `UPDATE candidates SET
       name = COALESCE($1, name),
       phone = COALESCE($2, phone),
       skills = COALESCE($3, skills),
       experience = COALESCE($4, experience),
       resume_url = COALESCE($5, resume_url)
     WHERE id = $6
     RETURNING *`,
    [name, phone, skills, experience, resume_url, id]
  );

  return result.rows[0];
};
