const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/api/login", function (req, res) {
  console.log(`Incoming request: `);
  console.log(req.body);

  if (req.body.username === "admin" && req.body.password === "123") {
    res.json({
      success: true,
      message: "welcome greatest avenger"
    });
  } else {
    res.json({ success: false, message: "incorrect details" });
  }
});

module.exports = router;
