import pool from "../config/db.js";

export const createJob = async (data) => {
  const { company_id, title, description, location, salary, job_type } = data;

  const result = await pool.query(
    `INSERT INTO jobs (company_id, title, description, location, salary, job_type)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [company_id, title, description, location, salary, job_type]
  );

  return result.rows[0];
};

export const getAllJobs = async () => {
  const result = await pool.query(`SELECT * FROM jobs ORDER BY created_at DESC`);
  return result.rows;
};

export const getJobById = async (id) => {
  const result = await pool.query(`SELECT * FROM jobs WHERE id = $1`, [id]);
  return result.rows[0];
};

export const updateJobById = async (id, data) => {
  const { title, description, location, salary, job_type } = data;

  const result = await pool.query(
    `UPDATE jobs SET 
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       location = COALESCE($3, location),
       salary = COALESCE($4, salary),
       job_type = COALESCE($5, job_type)
     WHERE id = $6
     RETURNING *`,
    [title, description, location, salary, job_type, id]
  );

  return result.rows[0];
};

export const deleteJobById = async (id) => {
  await pool.query(`DELETE FROM jobs WHERE id = $1`, [id]);
  return true;
};
