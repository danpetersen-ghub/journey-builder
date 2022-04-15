const mysql = require("mysql");

// const DATABASE = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: "NodeJS_Starter",
// });

const DATABASE = mysql.createConnection({
  host: process.env.CLEARDB_DB_HOST,
  user: process.env.CLEARDB_DB_USER,
  password: process.env.CLEARDB_DB_PASS,
  database: process.env.CLEARDB_DB_NAME,
});

module.exports = DATABASE;
