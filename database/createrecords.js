const mysql = require("mysql");
require("dotenv").config({ path: "../.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "NodeJS_Starter",
});

connection.connect(function (err, a, b) {
  if (err) throw err;
  console.log("Connected!");
});

var sql = `INSERT INTO items (column1, column2) VALUES ("abc", "cba")`;

connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});

let a = "qwerrtty1";
let b = "qwerrtty1";

var sql2 = `INSERT INTO items (column1, column2) VALUES ("${a}", "${b}")`;

connection.query(sql2, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
