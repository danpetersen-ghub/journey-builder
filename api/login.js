// const express = require("express");
// const router = express.Router();
// const bodyParser = require("body-parser");

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// router.post("/api/login", function (req, res) {
//   console.log(`Incoming request: `);
//   console.log(req.body);

//   if (req.body.username === "admin" && req.body.password === "123") {
//     res.json({
//       success: true,
//       message: "welcome greatest avenger"
//     });
//   } else {
//     res.json({ success: false, message: "incorrect details" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { firebase } = require(".././auth/firebase.js");
const {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword
} = require("firebase/auth");

// Login with email and password
router.post("/login", async (req, res) => {
  console.log("login attempted");
  try {
    const { email, password } = req.body;

    console.log("creds are: ", email, password);

    // Get Firebase Auth instance
    const auth = getAuth(firebase);

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userRecord = userCredential.user;
    console.log(userRecord);

    // Check if the login was successful
    if (userRecord) {
      res.status(200).json({ message: "Login successful", user: userRecord });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Failed to log in" });
  }
});

// Other authentication routes (e.g., logout, reset password, etc.) can be added here

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    res.status(201).json({ message: "User registered successfully", user: userRecord });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

module.exports = router;

