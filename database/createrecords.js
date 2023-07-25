const mysql = require("mysql");
require("dotenv").config({ path: "../.env" });

const connection = mysql.createConnection({
  host: process.env.CLEARDB_DB_HOST,
  user: process.env.CLEARDB_DB_USER,
  password: process.env.CLEARDB_DB_PASS,
  database: process.env.CLEARDB_DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

let requestor_name = "John Doe";
let requestor_email = "john.doe@example.com";
let email_name = "Email Name";
let program_name = "Program Name";

var sql = `INSERT INTO items (requestor_name, requestor_email, email_name, program_name) VALUES (?, ?, ?, ?)`;

connection.query(sql, [requestor_name, requestor_email, email_name, program_name], function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
