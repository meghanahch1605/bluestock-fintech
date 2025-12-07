import pool from "../config/db.js";

export const createCompany = async (data) => {
  const { name, email, password, address, website, logo_url } = data;

  const query = `
    INSERT INTO companies (name, email, password, address, website, logo_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, name, email, address, website, logo_url, created_at;
  `;

  const values = [name, email, password, address, website, logo_url];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findCompanyByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM companies WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};
