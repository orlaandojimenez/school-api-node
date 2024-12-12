const fs = require("fs");
const mysql = require("mysql2");
const config = require("./config");

const { host, user, password, database, port } = config.db;
const dbConfig = {
  host,
  user,
  password: password || undefined,
  database,
  port,
  multipleStatements: true,
};

const initScript = "./db/init.sql";

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    process.exit(1);
  }
  console.log("Successful connection to the database");

  const sql = fs.readFileSync(initScript, "utf8");
  connection.query(sql, (err) => {
    if (err) {
      console.error("Error executing SQL script:", err);
    } else {
      console.log("Error al ejecutar el script SQL:");
    }
    connection.end();
  });
});
