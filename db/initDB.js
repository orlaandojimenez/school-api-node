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
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  }
  console.log("Conexión exitosa a la base de datos");

  const sql = fs.readFileSync(initScript, "utf8");
  connection.query(sql, (err) => {
    if (err) {
      console.error("Error al ejecutar el script SQL:", err);
    } else {
      console.log("Base de datos inicializada correctamente");
    }
    connection.end();
  });
});
