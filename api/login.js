//https://codezup.com/create-separate-route-file-node-js-mean-stack/
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const data = require("../template.json");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/api/login", function (req, res) {
  console.log(`Incoming request: `);
  console.log(req.body);

  if (req.body.username === "admin" && req.body.password === "123") {
    res.json({
      success: true,
      message: "welcome greatest avenger",
      data: data,
    });
  } else {
    res.json({ success: false, message: "incorrect details" });
  }
});
//console.log("login scripts loaded...");
console.log("API Endpoint Available: http://127.0.0.1:3000/api/login");

module.exports = router;
