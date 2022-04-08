//Install Express
const express = require("express");
const app = express();

require("dotenv").config();

//const test = require('./test').default

//Templates
const ejs = require("ejs");

//Data
const mysql = require("mysql");

const DATABASE = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "NodeJS_Starter",
});

//API
const bodyParser = require("body-parser");
const router = express.Router();

//SERVER
const port = process.env.PORT || 3000;

//make DB connection
DATABASE.connect(function (err) {
  //show errors
  if (err) throw err;
  console.log("Connected to MySQL DB");
});

function insertToDB(sql) {
  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
  });
}

//API Routes
let APIRoutes = require("./api/create_record");
let APIRouteLogin = require("./api/login");

//route URL to index HTML in public folder
app.use("", express.static(__dirname + "/public"));

app.use("", APIRoutes);

app.use("", APIRouteLogin);

//Send Index HTML
app.get("", function (req, res) {
  res.render("index");
});

//Go Live with Server
app.listen(port, function () {
  console.log("running: http://127.0.0.1:3000/ or http://localhost:3000/");
});
