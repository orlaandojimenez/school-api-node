const mysql = require("mysql2/promise");

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const pool = mysql.createPool(db);

module.exports = {
  db,
  pool,
};
