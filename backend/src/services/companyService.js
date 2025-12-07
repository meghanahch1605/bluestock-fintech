import pool from "../config/db.js";

export const updateCompanyProfile = async (id, data) => {
  const query = `
    UPDATE companies 
    SET 
      name = $1,
      address = $2,
      website = $3,
      logo_url = COALESCE($4, logo_url)
    WHERE id = $5
    RETURNING *;
  `;

  const values = [
    data.name,
    data.address,
    data.website,
    data.logo_url || null,
    id
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};
