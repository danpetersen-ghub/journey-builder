//https://codezup.com/create-separate-route-file-node-js-mean-stack/
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const DATABASE = require("../database/connection");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* 
@desc
Endpoint: /api/data
Purpose:  GET, PUT, POST, DELETE with database
*/
router.all("/api/data", function (req, res) {
  console.log(`Incoming request: `);
  console.log(req.body);

  //Sql
  var sql = `INSERT INTO items (column1, column2) VALUES ("${req.body.column1}", "${req.body.column2}")`;

  //DB query
  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  //server response to API call
  res.json({ success: true, status: 200 });
});

console.log("API Endpoint Available: http://127.0.0.1:3000/api/data");

const data = require("../template.json");

/* 
@desc
Endpoint: /json
Purpose:  seed DATA
*/
router.get("/json", function (req, res) {
  res.json(data);
});

/* 
@desc
Endpoint:/api/all/data/1
Purpose:  query the DB for specific records
*/
router.get(
  "/api/all/data/:id",
  function (req, res, next) {
    console.log(req.params);
    next();
  },
  dbRecord
);

async function dbRecord(req, res, next) {
  let sql = `SELECT * FROM items WHERE id = ${req.params.id} ;`;
  await DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

/* 
@desc
Endpoint:/api/all/data/1
Purpose:  query the DB for specific records
*/
router.get(
  "/api/all/data",
  function (req, res, next) {
    console.log(req.params);
    next();
  },
  dbRecord
);

async function dbRecord(req, res, next) {
  let sql = `SELECT * FROM items;`;
  await DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}
module.exports = router;
