const express = require("express");
const router = express.Router();
const DATABASE = require("../database/connection");

router.delete("/api/data/:id", function (req, res) {
  var sql = `DELETE FROM items WHERE id = ${req.params.id}`;

  DATABASE.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record deleted");
    res.json({ success: true, status: 200 });
  });
});

module.exports = router;
