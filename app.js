//Install Express
const express = require("express");
const app = express();

require("dotenv").config();

//const test = require('./test').default

//Templates
const ejs = require("ejs");

//Data
const mysql = require("mysql");

//API
const bodyParser = require("body-parser");
const router = express.Router();

//API Routes
const APIRoutes = require("./api/create_record");
const APIRouteLogin = require("./api/login");

//SERVER AND DB
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "NodeJS_Starter",
});

//make DB connection
connection.connect(function (err) {
  //show errors
  if (err) throw err;
  console.log("Connected to MySQL DB");
});

//route URL ro index HTML in public folder
app.use("", express.static(__dirname + "/public"));

app.use("", APIRoutes);
app.use("", APIRouteLogin);

app.get("", function (req, res) {
  res.render("index");
});

//Go Live with Server
app.listen(port, function () {
  console.log("running... http://127.0.0.1:3000/ or http://localhost:3000/");
  console.log(
    "Endpoint availiable: http://127.0.0.1:3000/api/create/record/v1"
  );
  console.log("Endpoint availiable: http://127.0.0.1:3000/api/login");
});
