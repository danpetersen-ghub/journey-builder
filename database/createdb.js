const mysql = require("mysql");
require("dotenv").config({ path: "../.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to MySQL DB");

  connection.query("CREATE DATABASE NodeJS_Starter", function (err, result) {
    if (err) {
      console.log("Database might already exist");
      console.log(err);
    } else {
      console.log("Database created");
    }
  });
});

console.log("Script Complete");
