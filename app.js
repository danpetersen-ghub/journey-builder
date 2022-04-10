//Install Express
const express = require("express");
const app = express();

require("dotenv").config();

//Templates
const ejs = require("ejs");

//Database
const mysql = require("mysql");

const DATABASE = require("./database/connection");

//API
const bodyParser = require("body-parser");
const router = express.Router();

//SERVER
const port = process.env.PORT || 3000;

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
