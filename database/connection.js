const mysql = require("mysql");

const DATABASE = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "NodeJS_Starter",
});

module.exports = DATABASE;
