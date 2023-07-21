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
  var sql = `INSERT INTO items (requestor_name, requestor_email, email_name, program_name) VALUES ("${req.body.requestor_name}", "${req.body.requestor_email}", "${req.body.email_name}", "${req.body.program_name}")`;

  //DB query
  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");

    // Get the ID of the newly inserted record
    var insertedId = result.insertId;

    // Fetch the newly inserted record from the database
    DATABASE.query(`SELECT * FROM items WHERE id = ${insertedId}`, function (err, result) {
      if (err) throw err;

      // Return the newly inserted record in the response
      res.json({ success: true, status: 200, data: result[0] });
    });
  });
});


console.log("API Endpoint Available: http://127.0.0.1:3000/api/data");


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

router.get('/item/:id', function (req, res) {
  console.log(req.params);

  let sql = `SELECT * FROM items WHERE id = ${req.params.id};`;

  DATABASE.query(sql, function (err, result) {
    if (err || !result[0]) {
      console.log(err);
      res.render('noItem', {});
    } else {
      console.log(result[0]);
      res.render('item', result[0]);
    }
  });
});

/*
Add a new route for handling the PUT request. 
This route should update the record in the database with the new values when updating an existing record
*/
router.put("/api/data/:id", function (req, res) {
  var sql = `UPDATE items SET column1 = "${req.body.column1}", column2 = "${req.body.column2}" WHERE id = ${req.params.id}`;

  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record updated");
    res.json({ success: true, status: 200 });
  });
});


module.exports = router;
