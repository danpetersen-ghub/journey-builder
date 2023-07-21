const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

const connection = mysql.createConnection({
  host: process.env.CLEARDB_DB_HOST,
  user: process.env.CLEARDB_DB_USER,
  password: process.env.CLEARDB_DB_PASS,
  database: process.env.CLEARDB_DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to MySQL DB");

  let SQLTable = `
  CREATE TABLE items (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    column1 VARCHAR(255),
    column2 VARCHAR(255),
    requestor_name VARCHAR(255) NULL,
    requestor_email VARCHAR(255) NULL,
    email_name VARCHAR(255) NULL,
    program_name VARCHAR(255) NULL,
    createdDate TIMESTAMP NULL DEFAULT NOW()
);
  `;

  connection.query(SQLTable, function (err, result) {
    if (err) {
      console.log("Table might already exist");
      console.log(err);
    } else {
      console.log("Table created");
    }
  });
});

console.log("Script Complete");
