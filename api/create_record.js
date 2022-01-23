//https://codezup.com/create-separate-route-file-node-js-mean-stack/
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

console.log("api scripts loaded...");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/api/create/record/v1", function (req, res) {
  console.log(`Incoming request: `);
  console.log(req.body);

  //SEND DATA TO DATABASE
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO items (column1, column1) VALUES (${req.body[0]}, ${req.body[1]})`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.json({ success: true });
});

const data = require("../template.json");

//seed DATA
router.get("/json", function (req, res) {
  res.json(data);
});

module.exports = router;
