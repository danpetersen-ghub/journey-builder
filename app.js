const express = require("express");
const app = express();
require("dotenv").config();

// Templates
const ejs = require("ejs");
app.set('view engine', 'ejs');

// Database
const mysql = require("mysql2/promise");
const DATABASE = require("./database/connection");

DATABASE.getConnection(function (err, a, b) {
  if (err) throw err;
  console.log("Connected!");
});

// API
const bodyParser = require("body-parser");
const router = express.Router();

// Server Port
const port = process.env.PORT || 3000;

//  Routes
const APIRoutes = require("./api/dataController");
const authRoutes = require("./api/login.js");
const itemRoutes = require("./routes/itemRoutes");
const signUpRoutes = require("./routes/signUpRoutes");
const homeRoutes = require("./routes/homeRoutes");


app.use("/api", APIRoutes);
app.use("/auth", authRoutes);
app.use("/item", itemRoutes);
app.use("/sign-up", signUpRoutes);
app.use("/home", homeRoutes);



// Route URL to index HTML in public folder
app.use("", express.static(__dirname + "/public"));

// Send Index HTML
app.get("/", function (req, res) {
  res.render("index");
});

// Go Live with Server
app.listen(port, function () {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});
