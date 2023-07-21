//Install Express
const express = require("express");
const app = express();


require("dotenv").config();

//Templates
const ejs = require("ejs");
app.set('view engine', 'ejs');

//Database
const mysql = require("mysql2/promise");

const DATABASE = require("./database/connection");

DATABASE.getConnection(function (err, a, b) {
  if (err) throw err;
  console.log("Connected!");
});

//API
const bodyParser = require("body-parser");
const router = express.Router();

//SERVER
const port = process.env.PORT;

//API Routes
const APIRoutes = require("./api/create_record");
// const APIRouteLogin = require("./api/login");
const authRoutes = require("./api/login.js");
const APIRouteDelete = require("./api/delete_record");

//route URL to index HTML in public folder
app.use("", express.static(__dirname + "/public"));

app.use("", APIRoutes);

// app.use("", APIRouteLogin);
app.use("/auth", authRoutes);

app.use("", APIRouteDelete);

//Send Index HTML
app.get("", function (req, res) {
  res.render("index");
});

//Go Live with Server
app.listen(port, function () {
  console.log(
    `running: http://127.0.0.1:3000/ or ${process.env.CYPRESS_BASE_URL}`
  );
});
