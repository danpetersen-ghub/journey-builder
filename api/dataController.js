const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const database = require("./database");

// Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Logger middleware
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    //console.log(req.body);
    next();
});

// Endpoint: /api/data
// Purpose: GET, PUT, POST, DELETE with database
router.route("/data")
    .get((req, res) => {
        database.fetchAllRecords((err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: "Error fetching data from the database" });
            }
            res.json({ success: true, status: 200, data: result });
        });
    })
    .post((req, res) => {
        database.insertData(req.body, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: "Error inserting data into the database" });
            }
            console.log("1 record inserted");
            const insertedId = result.insertId;
            database.fetchRecordById(insertedId, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, error: "Error fetching data from the database" });
                }
                res.json({ success: true, status: 200, data: result[0] });
            });
        });
    });

// Endpoint: /api/data/:id
// Purpose: GET (fetch a specific record), PUT (update a record)
router.route("/data/:id")
    .get((req, res) => {
        const id = req.params.id;
        database.fetchRecordById(id, (err, result) => {
            if (err || !result[0]) {
                console.error(err);
                return res.status(404).json({ success: false, error: "Record not found" });
            }
            res.json({ success: true, status: 200, data: result[0] });
        });
    })
    .put((req, res) => {
        const id = req.params.id;
        database.updateRecordById(id, req.body, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: "Error updating data in the database" });
            }
            console.log("1 record updated");
            res.json({ success: true, status: 200 });
        });
    })
    .delete((req, res) => {
        const id = req.params.id;
        database.deleteRecord(id, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, error: "Error inserting data into the database" });
            }
            console.log("1 record Deleted");
            res.json({ success: true, status: 200, message: "Record deleted successfully" });
        })
    });


router.route("/item/:id").get((req, res) => {
    const id = req.params.id;
    database.fetchRecordById(id, (err, result) => {
        if (err || !result[0]) {
            console.error(err);
            res.render('noItem', {});
            // return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.render('item', result[0]);
    });

    // router.get('/item/:id', function (req, res) {
    //   console.log(req.params);

    //   let sql = `SELECT * FROM items WHERE id = ${req.params.id};`;

    //   DATABASE.query(sql, function (err, result) {
    //     if (err || !result[0]) {
    //       console.log(err);
    //       res.render('noItem', {});
    //     } else {
    //       console.log(result[0]);
    //       res.render('item', result[0]);
    //     }
    //   });
    // });
})


module.exports = router;
