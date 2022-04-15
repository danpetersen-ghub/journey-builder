const mysql = require("mysql");

// const DATABASE = mysql.createConnection({
//   host: process.env.DB_HOST || CLEARDB_DB_HOST,
//   user: process.env.DB_USER || CLEARDB_DB_USER,
//   password: process.env.DB_PASS || CLEARDB_DB_PASS,
//   database: "NodeJS_Starter" || CLEARDB_DB_NAME,
// });

const DATABASE = mysql.createConnection({
  host: CLEARDB_DB_HOST,
  user: CLEARDB_DB_USER,
  password: CLEARDB_DB_PASS,
  database: CLEARDB_DB_NAME,
});

module.exports = DATABASE;
