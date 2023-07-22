const express = require("express");
const router = express.Router();
// const databaseConnection = require("../database/connection");
const database = require("../api/database")

// Route handler for /item/:id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    database.fetchRecordById(id, (err, result) => {
        if (err || !result[0]) {
            console.error(err);
            res.render('noItem', {});
            // return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.render('item', result[0]);
    });
});

module.exports = router;
