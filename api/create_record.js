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

 function dbRecord(req, res, next) {
  let sql = `SELECT * FROM items;`;
   DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

router.get('/item/:id', function(req, res) {
  console.log(req.params);

 let sql = `SELECT * FROM items WHERE id = ${req.params.id};`;

   DATABASE.query(sql, function (err, result) {
     if (err || !result[0]) {
        console.log(err);
        res.render('noItem',{});
     } else {
     console.log(result[0]);
     res.render('item', result[0] );
   }
   });


 });

//Add a new route for handling the PUT request. This route should update the record in the database with the new values when updating an existing record
router.put("/api/data/:id", function (req, res) {
  var sql = `UPDATE items SET column1 = "${req.body.column1}", column2 = "${req.body.column2}" WHERE id = ${req.params.id}`;

  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ success: true, status: 200 });
  });
});


module.exports = router;
