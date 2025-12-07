import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

console.log("ENV CHECK → DB_USER:", process.env.DB_USER);
console.log("ENV CHECK → DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("ENV CHECK → DB_HOST:", process.env.DB_HOST);
console.log("ENV CHECK → DB_PORT:", process.env.DB_PORT);
console.log("ENV CHECK → DB_NAME:", process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log("PostgreSQL Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

export default pool;
