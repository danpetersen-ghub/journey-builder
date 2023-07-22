const express = require("express");
const router = express.Router();

router.get(["/:token", ""], (req, res) => {
    // Check if the user token exists in the session or cookie
    const userToken = req.params.token; // Replace `userToken` with the name you used to store the token
    //console.log(req);
    if (userToken) {
        // If the user is logged in (token exists), render the home page
        res.render("home", { userToken }); // Replace "home" with the name of your EJS template for the home page
    } else {
        // If the user is not logged in (token doesn't exist), redirect to the root path ("/")
        res.render("noAccess");
    }
});

module.exports = router;