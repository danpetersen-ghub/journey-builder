const mysql = require("mysql");

const DATABASE = mysql.createPool({
  connectionLimit: 10,
  host: process.env.CLEARDB_DB_HOST,
  user: process.env.CLEARDB_DB_USER,
  password: process.env.CLEARDB_DB_PASS,
  database: process.env.CLEARDB_DB_NAME,
});

module.exports = DATABASE;
