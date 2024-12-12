const mysql = require("mysql2/promise");

const db = {
  host: "localhost",
  user: "root",
  password: "",
  database: "school_management",
  port: 3306,
};

const pool = mysql.createPool(db);

module.exports = {
  db,
  pool,
};
