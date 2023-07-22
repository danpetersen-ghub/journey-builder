const bodyParser = require("body-parser");
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

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Login with email and password
router.post("/login", async (req, res) => {
  console.log("login attempted");
  try {
    console.log(req.body)
    const { email, password } = req.body;
    console.log("creds are: ", email, password);

    // Get Firebase Auth instance
    const auth = getAuth(firebase);

    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userRecord = userCredential.user;
    // console.log(userRecord);

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

// Register a new user
router.post("/register", async (req, res) => {
  console.log(req.body)
  try {
    const { email, password } = req.body;

    console.log("creds are: ", email, password);

    const auth = getAuth(firebase);

    const createUserCredential = await createUserWithEmailAndPassword(auth, email, password);

    const userRecord = createUserCredential.user; // Corrected variable name

    // Check if the registration was successful
    if (userRecord) {
      res.status(201).json({ message: "User registered successfully", user: userRecord });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


module.exports = router;

