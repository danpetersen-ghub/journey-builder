//https://codezup.com/create-separate-route-file-node-js-mean-stack/
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/api/create/record/v1", function (req, res) {
  console.log(`Incoming request: `);
  console.log(req.body);

  //SEND DATA TO DATABASE
  var sql = `INSERT INTO items (column1, column2) VALUES (${req.body[0]}, ${req.body[1]})`;

  insertToDB(sql);

  //server response to API call
  res.json({ success: true, status: 200 });
});

function insertToDB(sql) {
  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    console.log(result);
  });
}

console.log("api scripts loaded...");
console.log("Endpoint available: http://127.0.0.1:3000/api/login");

const data = require("../template.json");

//seed DATA
router.get("/json", function (req, res) {
  res.json(data);
});

module.exports = router;
