const express = require("express");
const router = express.Router();

// Route handler for /item/:id
router.get("/", (req, res) => {
    res.render('signup');
});

module.exports = router;