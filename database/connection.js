const mysql = require("mysql");

const DATABASE = mysql.createConnection({
  host: process.env.DB_HOST || CLEARDB_DATABASE_URL,
  user: process.env.DB_USER || CLEARDB_DB_USER,
  password: process.env.DB_PASS || CLEARDB_DB_PASS,
  database: "NodeJS_Starter",
});

module.exports = DATABASE;
